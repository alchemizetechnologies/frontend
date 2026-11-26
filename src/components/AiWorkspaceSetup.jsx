import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AiWorkspaceSetup.css";

function readGoogleUser() {
  try {
    return JSON.parse(localStorage.getItem("googleUser")) || {};
  } catch {
    return {};
  }
}

function readSelectedToolNames() {
  const toolNames = {
    zapier: "Zapier",
    "meta-ads": "Meta Ads",
    "google-ads": "Google Ads",
    zoom: "Zoom",
    "linkedin-ads": "LinkedIn Ads",
    gmail: "Gmail",
    "google-calendar": "Google Calendar",
    outlook: "Outlook",
    wordpress: "WordPress",
    "linkedin-sales-navigator": "LinkedIn Sales Navigator",
    "chatgpt-connector": "HubSpot connector for ChatGPT",
  };

  try {
    const savedTools = JSON.parse(localStorage.getItem("selectedTools"));
    return Array.isArray(savedTools)
      ? savedTools.map((toolId) => toolNames[toolId] || toolId)
      : [];
  } catch {
    return [];
  }
}

function readContextValue(key) {
  return localStorage.getItem(key)?.trim() || "";
}

export default function AiWorkspaceSetup({
  conversation,
  isSending,
  assistantError,
  onSendMessage,
}) {
  const sectionRef = useRef(null);
  const imageUrlsRef = useRef([]);
  const [draft, setDraft] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [imageAttempts, setImageAttempts] = useState([]);
  const navigate = useNavigate();
  const user = readGoogleUser();
  const companyName = readContextValue("companyName");
  const companySize = readContextValue("companySize");
  const industry = readContextValue("companyIndustry");
  const goal = readContextValue("aiAssistGoal");
  const selectedTools = readSelectedToolNames();
  const visibleConversation = conversation.filter((message) => !message.internal);
  const latestMessage = visibleConversation[visibleConversation.length - 1];
  const canRespond = !isSending && latestMessage?.role === "assistant";
  const firstName = user.name?.trim().split(/\s+/)[0] || "";
  const contextItems = [
    companyName && { label: "Business", value: companyName },
    industry && { label: "Industry", value: industry },
    companySize && { label: "Team size", value: companySize },
    goal && { label: "Goal", value: goal },
  ].filter(Boolean);
  const toolContext = selectedTools.length ? selectedTools.join(", ") : "my team's tools";
  const suggestions = [
    {
      title: "Plan a workflow",
      description: selectedTools.length
        ? `Build a practical flow around ${selectedTools.slice(0, 2).join(" and ")}.`
        : "Get a useful first workflow for your team.",
      prompt: `Suggest a simple workflow using ${toolContext}${goal ? ` that supports my goal of ${goal}` : ""}.`,
    },
    {
      title: "Improve my setup",
      description: "Get a focused recommendation for your workspace.",
      prompt: "Review my workspace setup and suggest the most useful next improvement.",
    },
    {
      title: "Create campaign artwork",
      description: industry ? `Generate an image for ${industry}.` : "Generate an image for your business.",
      prompt: `Create a polished campaign image${industry ? ` for ${industry}` : " for my business"}.`,
    },
  ];

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => () => {
    imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  function confirmSetup() {
    localStorage.setItem("workspaceSetupConfirmed", "true");
    setIsConfirmed(true);
    onSendMessage("Yes, looks good.");
  }

  function requestChanges() {
    onSendMessage("I'd like to make changes. Please ask what I want to adjust.");
  }

  async function sendReply(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || isSending) return;
    setDraft("");
    setShowSuggestions(false);
    await onSendMessage(text);
  }

  async function generateImage() {
    const prompt = draft.trim();
    if (!prompt || isSending || isGeneratingImage) return;

    setShowSuggestions(false);
    const attemptId = `${Date.now()}-${imageAttempts.length}`;
    setImageAttempts((currentAttempts) => [
      ...currentAttempts,
      { id: attemptId, prompt, status: "loading", url: "" },
    ]);
    setDraft("");
    setIsGeneratingImage(true);

    try {
      const response = await fetch("/api/images/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        let result;
        try {
          result = await response.json();
        } catch {
          throw new Error("Image generation returned an invalid response.");
        }
        throw new Error(result.error || "Couldn't generate the image.");
      }

      const imageBlob = await response.blob();
      if (!imageBlob.type.startsWith("image/")) {
        throw new Error("The image service returned an unsupported file.");
      }

      const imageUrl = URL.createObjectURL(imageBlob);
      imageUrlsRef.current.push(imageUrl);
      setImageAttempts((currentAttempts) => currentAttempts.map((attempt) => (
        attempt.id === attemptId ? { ...attempt, status: "done", url: imageUrl } : attempt
      )));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Couldn't generate the image.";
      setImageAttempts((currentAttempts) => currentAttempts.map((attempt) => (
        attempt.id === attemptId ? { ...attempt, status: "error", error: message } : attempt
      )));
    } finally {
      setIsGeneratingImage(false);
    }
  }

  return (
    <section ref={sectionRef} className="ai-workspace-content" aria-label="Workspace setup">
      <header className="ai-workspace-welcome">
        <div>
          <p className="ai-workspace-eyebrow">Workspace assistant · Step 3 of 4</p>
          <h1>Welcome{firstName ? `, ${firstName}` : ""}</h1>
          <p className="ai-workspace-welcome-copy">
            {companyName
              ? `Let’s shape a workspace that works for ${companyName}.`
              : "Let’s shape a workspace around your team’s needs."}
          </p>
        </div>
        {contextItems.length > 0 && (
          <div className="ai-workspace-context" aria-label="Workspace context">
            {contextItems.map(({ label, value }) => (
              <span className="ai-workspace-context-item" key={label}>
                <strong>{label}</strong>
                {value}
              </span>
            ))}
          </div>
        )}
      </header>

      {selectedTools.length > 0 && (
        <section className="ai-workspace-tools" aria-label="Selected tools">
          <div>
            <h2>Your selected tools</h2>
            <p>These are your setup choices; each app needs separate authorization to connect.</p>
          </div>
          <div className="ai-workspace-tool-list">
            {selectedTools.map((tool) => (
              <span className="ai-workspace-tool-chip" key={tool}>{tool}</span>
            ))}
          </div>
        </section>
      )}

      {showSuggestions && (
        <section className="ai-workspace-suggestions" aria-label="Suggested prompts">
          <div className="ai-workspace-suggestions-heading">
            <h2>What would you like to do next?</h2>
            <p>Choose an idea to add it to your message.</p>
          </div>
          <div className="ai-workspace-suggestion-grid">
            {suggestions.map((suggestion) => (
              <button
                type="button"
                className="ai-workspace-suggestion"
                key={suggestion.title}
                onClick={() => setDraft(suggestion.prompt)}
              >
                <strong>{suggestion.title}</strong>
                <span>{suggestion.description}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="ai-workspace-messages" aria-live="polite">
        {visibleConversation.map((message, index) => (
          <p
            className={`ai-workspace-chat-message ${message.role}`}
            key={`${message.role}-${index}`}
          >
            {message.text}
          </p>
        ))}
        {isSending && <p className="ai-workspace-thinking">Assistant is thinking…</p>}
        {imageAttempts.map((attempt) => (
          <div className="ai-workspace-image-attempt" key={attempt.id}>
            <p className="ai-workspace-chat-message user">Generate image: {attempt.prompt}</p>
            {attempt.status === "loading" && (
              <p className="ai-workspace-thinking">Generating image…</p>
            )}
            {attempt.status === "error" && (
              <p className="ai-workspace-error" role="alert">{attempt.error}</p>
            )}
            {attempt.status === "done" && (
              <div className="ai-workspace-generated-image">
                <img src={attempt.url} alt={attempt.prompt} />
                <a href={attempt.url} download="alchemize-generated-image.png">
                  Download image
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {assistantError && <p className="ai-workspace-error" role="alert">{assistantError}</p>}

      {canRespond && !isConfirmed && (
        <div className="ai-workspace-actions">
          <button type="button" className="ai-workspace-confirm" onClick={confirmSetup}>
            Yes, looks good
          </button>
          <button type="button" className="ai-workspace-edit" onClick={requestChanges}>
            I&apos;d like to make changes
          </button>
        </div>
      )}

      {isConfirmed && (
        <button
          type="button"
          className="ai-workspace-confirm"
          onClick={() => navigate("/dashboard")}
        >
          Continue to workspace
        </button>
      )}

      <div className="ai-workspace-composer">
        <form onSubmit={sendReply}>
          <label className="ai-workspace-sr-only" htmlFor="ai-workspace-reply">
            Message the assistant
          </label>
          <input
            id="ai-workspace-reply"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Reply..."
            disabled={isSending || isGeneratingImage}
          />
          <button
            type="button"
            className="ai-workspace-generate-image"
            onClick={generateImage}
            disabled={!draft.trim() || isSending || isGeneratingImage}
          >
            Generate image
          </button>
          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim() || isSending || isGeneratingImage}
          >
            ↑
          </button>
        </form>
        <p>
          AI responses may not always be accurate. Image generation uses 2.5 Stability credits
          per successful image.
        </p>
      </div>
    </section>
  );
}
