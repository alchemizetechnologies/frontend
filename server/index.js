import { createServer } from "node:http";

const port = Number(process.env.API_PORT || 3001);
const maxBodyBytes = 64 * 1024;
const allowedRoles = new Set(["user", "assistant"]);
const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request) {
  const chunks = [];
  let bytes = 0;

  for await (const chunk of request) {
    bytes += chunk.length;
    if (bytes > maxBodyBytes) {
      const error = new Error("Request body is too large.");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("Request body must be valid JSON.");
    error.status = 400;
    throw error;
  }
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length < 1 || messages.length > 30) return false;

  return messages.every((message) => (
    message &&
    allowedRoles.has(message.role) &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= 4000
  )) && messages[messages.length - 1].role === "user";
}

function safeContext(context = {}) {
  const fieldLimits = {
    companyName: 200,
    companySize: 50,
    industry: 120,
    goal: 250,
    task: 50,
    selectedTools: 1000,
  };
  return Object.entries(fieldLimits).reduce((result, [field, maxLength]) => {
    if (typeof context[field] === "string") {
      result[field] = context[field].trim().slice(0, maxLength);
    }
    return result;
  }, {});
}

function buildSystemPrompt(context) {
  return [
    "You are the Alchemize Technologies workspace onboarding assistant.",
    "Answer the user's questions conversationally and helpfully, including questions beyond onboarding.",
    "Use the supplied business context when relevant, but never invent business facts.",
    "Ask a concise clarifying question when the request is unclear.",
    "Do not claim to connect apps, access email/calendar data, or perform account changes; explain when an action needs an integration.",
    "When the task is tool-selection, help the user decide which tools to include, but make clear that the app only saves selections and does not connect those services.",
    "When the task is goal-assistance, answer the user's selected goal and include a few relevant next-step or related-goal suggestions as short bullets in the same reply. Tailor them to the business context.",
    "When the task is workspace-setup, generate recommendations from the supplied business context and conversation. Do not rely on a fixed property template; explain suggestions briefly, add a few relevant next-step ideas as short bullets, and ask what the user wants to change or confirm.",
    "Keep replies focused and readable.",
    `Business context: ${JSON.stringify(context)}`,
  ].join("\n");
}

async function generateImage(request, response) {
  const apiKey = process.env.STABILITY_API_KEY;
  if (!apiKey) {
    sendJson(response, 503, {
      error: "Image generation isn't configured. Add STABILITY_API_KEY to .env, then restart npm run api.",
    });
    return;
  }

  let body;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    sendJson(response, error.status || 400, { error: error.message });
    return;
  }

  const prompt = body?.prompt;
  if (typeof prompt !== "string" || !prompt.trim() || prompt.trim().length > 2000) {
    sendJson(response, 400, { error: "Enter an image prompt between 1 and 2,000 characters." });
    return;
  }

  const formData = new FormData();
  formData.set("prompt", prompt.trim());
  formData.set("model", "sd3.5-flash");
  formData.set("output_format", "png");

  try {
    const providerResponse = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "image/*",
        },
        body: formData,
        signal: AbortSignal.timeout(90000),
      },
    );

    if (!providerResponse.ok) {
      console.error(`Stability image request failed with status ${providerResponse.status}.`);
      const errorMessage = providerResponse.status === 401 || providerResponse.status === 403
        ? "Stability AI rejected the API key. Check STABILITY_API_KEY in .env."
        : providerResponse.status === 402
          ? "No Stability credits are available. Add credits only if you choose to; this app won't purchase them."
          : providerResponse.status === 429
            ? "Stability AI's rate limit was reached. Wait a little, then try again."
            : "Stability AI couldn't generate the image. Check the prompt and account status.";
      sendJson(response, 502, { error: errorMessage });
      return;
    }

    const contentType = providerResponse.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      sendJson(response, 502, { error: "Stability AI returned an unexpected image response." });
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    });
    response.end(Buffer.from(await providerResponse.arrayBuffer()));
  } catch (error) {
    console.error("Stability image request failed.", error);
    sendJson(response, 502, {
      error: "Couldn't reach Stability AI. Check your network and try again.",
    });
  }
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url || "/", "http://localhost");

  if (request.method === "GET" && requestUrl.pathname === "/api/health") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === "POST" && requestUrl.pathname === "/api/images/generate") {
    await generateImage(request, response);
    return;
  }

  if (request.method !== "POST" || requestUrl.pathname !== "/api/assistant") {
    sendJson(response, 404, { error: "API route not found." });
    return;
  }

  if (provider !== "gemini" && provider !== "openai") {
    sendJson(response, 500, { error: "AI_PROVIDER must be set to gemini or openai." });
    return;
  }

  const apiKey = provider === "gemini"
    ? process.env.GEMINI_API_KEY
    : process.env.OPENAI_API_KEY;
  if (!apiKey) {
    sendJson(response, 503, {
      error: provider === "gemini"
        ? "Gemini isn't configured. Create a key in Google AI Studio, add GEMINI_API_KEY to .env, then restart npm run api."
        : "OpenAI isn't configured. Add OPENAI_API_KEY to .env, then restart npm run api.",
    });
    return;
  }

  let body;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    sendJson(response, error.status || 400, { error: error.message });
    return;
  }

  if (!body || typeof body !== "object" || !validateMessages(body.messages)) {
    sendJson(response, 400, {
      error: "Send 1–30 user/assistant messages, ending with a user message (up to 4,000 characters each).",
    });
    return;
  }

  const context = safeContext(body.context);

  try {
    const providerResponse = provider === "gemini"
      ? await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || "gemini-3.5-flash-lite"}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: buildSystemPrompt(context) }] },
            contents: body.messages.map((message) => ({
              role: message.role === "assistant" ? "model" : "user",
              parts: [{ text: message.content }],
            })),
            generationConfig: { maxOutputTokens: 800 },
          }),
          signal: AbortSignal.timeout(30000),
        },
      )
      : await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            { role: "system", content: buildSystemPrompt(context) },
            ...body.messages,
          ],
          max_completion_tokens: 800,
        }),
        signal: AbortSignal.timeout(30000),
      });

    const result = await providerResponse.json();
    if (!providerResponse.ok) {
      console.error(`${provider} request failed with status ${providerResponse.status}.`);
      const errorMessage = provider === "gemini"
        ? providerResponse.status === 401 || providerResponse.status === 403
          ? "Gemini rejected the API key or project access. Check the key in Google AI Studio."
          : providerResponse.status === 429
            ? "The Gemini free-tier quota or rate limit was reached. Try again later or check AI Studio usage."
            : providerResponse.status === 400 || providerResponse.status === 404
              ? "The Gemini model or request isn't available. Check GEMINI_MODEL and free-tier access."
              : "Gemini couldn't complete the request. Check the key and network, then try again."
        : providerResponse.status === 401 || providerResponse.status === 403
          ? "OpenAI rejected the API key or project permissions. Create a fresh API key and check its access."
          : providerResponse.status === 429
            ? "OpenAI usage is unavailable or over its current limit. Check API billing and usage limits."
            : providerResponse.status === 404
              ? "The configured OpenAI model isn't available. Check OPENAI_MODEL in .env."
              : "The AI provider couldn't complete the request. Check the API key, model, and billing setup.";
      sendJson(response, 502, {
        error: errorMessage,
      });
      return;
    }

    const reply = provider === "gemini"
      ? result.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim()
      : result.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      sendJson(response, 502, { error: "The AI provider returned an empty response. Please try again." });
      return;
    }

    sendJson(response, 200, { reply });
  } catch (error) {
    console.error(`${provider} request failed.`, error);
    sendJson(response, 502, {
      error: "Couldn't reach the AI provider. Check your network and try again.",
    });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`AI API listening on http://127.0.0.1:${port}`);
});
