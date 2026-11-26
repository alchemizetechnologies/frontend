import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OnboardingRole.css";
import "./AiToolsSetup.css";
import AiWorkspaceSetup from "./AiWorkspaceSetup";

const toolCatalog = [
  { id: "zapier", name: "Zapier", mark: "Z", tone: "orange", description: "Automate handoffs between your apps." },
  { id: "meta-ads", name: "Meta Ads", mark: "f", tone: "blue", description: "Reach audiences on Facebook and Instagram." },
  { id: "google-ads", name: "Google Ads", mark: "G", tone: "yellow", description: "Plan and manage search campaigns." },
  { id: "zoom", name: "Zoom", mark: "Z", tone: "cyan", description: "Bring people together for meetings and classes." },
  { id: "linkedin-ads", name: "LinkedIn Ads", mark: "in", tone: "navy", description: "Reach professional audiences." },
  { id: "google-calendar", name: "Google Calendar", mark: "31", tone: "blue", description: "Coordinate schedules and events." },
  { id: "wordpress", name: "WordPress", mark: "W", tone: "slate", description: "Publish and manage website content." },
  { id: "gmail", name: "Gmail", mark: "M", tone: "red", description: "Keep team email workflows organized." },
  { id: "outlook", name: "Outlook", mark: "O", tone: "cyan", description: "Coordinate email and team schedules." },
  { id: "linkedin-sales-navigator", name: "LinkedIn Sales Navigator", mark: "in", tone: "navy", description: "Find and organize sales prospects." },
  { id: "chatgpt-connector", name: "HubSpot connector for ChatGPT", mark: "✦", tone: "green", description: "Use your workspace context in ChatGPT." },
];

const suggestedToolSets = {
  education: ["zapier", "zoom", "google-calendar", "wordpress", "chatgpt-connector", "google-ads"],
  marketing: ["zapier", "meta-ads", "google-ads", "zoom", "linkedin-ads", "chatgpt-connector"],
  sales: ["zapier", "linkedin-ads", "google-ads", "zoom", "gmail", "chatgpt-connector"],
  support: ["zapier", "zoom", "gmail", "outlook", "google-calendar", "chatgpt-connector"],
  general: ["zapier", "meta-ads", "google-ads", "zoom", "linkedin-ads", "chatgpt-connector"],
};

function getSuggestedTools(goal, industry) {
  const context = `${goal} ${industry}`.toLowerCase();
  const category = /student|education|course|enroll|tuition|learner|school/.test(context)
    ? "education"
    : /support|service|help|ticket|customer care/.test(context)
      ? "support"
      : /sales|pipeline|deal|revenue/.test(context)
        ? "sales"
        : /market|lead|campaign|advert|brand|promot/.test(context)
          ? "marketing"
          : "general";
  const suggestedIds = new Set(suggestedToolSets[category]);
  return toolCatalog.filter((tool) => suggestedIds.has(tool.id));
}

function getToolName(toolId) {
  return toolCatalog.find((tool) => tool.id === toolId)?.name || toolId;
}

function getUser() {
  const savedUser = localStorage.getItem("googleUser");
  return savedUser ? JSON.parse(savedUser) : {};
}

async function requestAssistant(messages, context) {
  const response = await fetch("/api/assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages.map(({ role, text: content }) => ({ role, content })),
      context,
    }),
  });
  let result;
  try {
    result = await response.json();
  } catch {
    if (response.status === 502) {
      throw new Error("The AI API server isn't running. Start it with `npm run api` in a separate terminal, then try again.");
    }
    throw new Error("The AI API returned an invalid response. Please try again.");
  }

  if (!response.ok) {
    throw new Error(result.error || "The assistant couldn't answer right now.");
  }
  if (typeof result.reply !== "string" || !result.reply.trim()) {
    throw new Error("The assistant returned an empty response. Please try again.");
  }

  return result.reply.trim();
}

export default function AiToolsSetup({ embedded = false } = {}) {
  const selectedGoal = localStorage.getItem("aiAssistGoal")?.trim() || "";
  const industry = localStorage.getItem("companyIndustry")?.trim() || "";
  const suggestedTools = getSuggestedTools(selectedGoal, industry);
  const [selectedTools, setSelectedTools] = useState(() => suggestedTools.map((tool) => tool.id));
  const [customTools, setCustomTools] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [draft, setDraft] = useState("");
  const [isMissingToolMode, setIsMissingToolMode] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [assistantError, setAssistantError] = useState("");
  const [isWorkspaceStep, setIsWorkspaceStep] = useState(false);
  const navigate = useNavigate();
  const companyName = localStorage.getItem("companyName")?.trim() || "";
  const user = getUser();
  const userName = user.name?.trim() || "";
  const companySize = localStorage.getItem("companySize")?.trim() || "";
  const PageWrapper = embedded ? "section" : "main";
  const recommendationBasis = [
    selectedGoal && `your goal “${selectedGoal}”`,
    industry && `the ${industry} industry`,
  ].filter(Boolean).join(" and ");
  const selectedToolCount = selectedTools.length;

  function toggleTool(toolId) {
    setSelectedTools((currentTools) => (
      currentTools.includes(toolId)
        ? currentTools.filter((id) => id !== toolId)
        : [...currentTools, toolId]
    ));
  }

  function askForMissingTools() {
    if (isMissingToolMode) return;
    setIsMissingToolMode(true);
    setAssistantError("");
    setConversation((currentMessages) => [
      ...currentMessages,
      { role: "user", text: "I'm missing some tools." },
      {
        role: "assistant",
        text: "Tell me the names of the tools you'd like to add, and I'll include them in your selection.",
      },
    ]);
  }

  function parseToolNames(text) {
    return text
      .trim()
      .replace(/^(please\s+)?(i(?:'d| would) like to add|add|include|connect)\s+/i, "")
      .split(/[,;\n]|\s+and\s+/i)
      .map((name) => name.trim().replace(/[.!?]+$/, ""))
      .filter(Boolean);
  }

  async function sendMessage(text) {
    if (!text || isSending) return;

    const updatedMessages = [...conversation, { role: "user", text }].slice(-30);
    setConversation(updatedMessages);
    setDraft("");
    setAssistantError("");

    if (isMissingToolMode) {
      const newTools = parseToolNames(text);
      if (newTools.length === 0) {
        setAssistantError("Enter at least one tool name to add.");
        return;
      }

      const uniqueTools = newTools.filter((tool) => (
        !customTools.some((existingTool) => existingTool.toLowerCase() === tool.toLowerCase()) &&
        !suggestedTools.some((suggestedTool) => suggestedTool.name.toLowerCase() === tool.toLowerCase())
      ));

      setCustomTools((currentTools) => [...currentTools, ...uniqueTools]);
      setSelectedTools((currentTools) => [...new Set([...currentTools, ...uniqueTools])]);
      setConversation((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          text: uniqueTools.length
            ? `Added ${uniqueTools.join(", ")} to your tool selections. These still need separate authorization to connect.`
            : "Those tools are already in your selection list.",
        },
      ]);
      setIsMissingToolMode(false);
      return;
    }

    setIsSending(true);
    try {
      const reply = await requestAssistant(updatedMessages, {
        task: isWorkspaceStep ? "workspace-setup" : "tool-selection",
        companyName,
        companySize,
        industry,
        goal: selectedGoal,
        selectedTools: selectedTools
          .map((toolId) => suggestedTools.find((tool) => tool.id === toolId)?.name || toolId)
          .join(", "),
      });

      setConversation((currentMessages) => [
        ...currentMessages,
        { role: "assistant", text: reply },
      ]);
      if (isWorkspaceStep) {
        localStorage.setItem("workspaceSetupResponse", reply);
      }
    } catch (error) {
      setAssistantError(
        error instanceof Error ? error.message : "The assistant couldn't answer right now."
      );
    } finally {
      setIsSending(false);
    }
  }

  async function finishToolSelection() {
    localStorage.setItem("selectedTools", JSON.stringify(selectedTools));
    localStorage.setItem("customTools", JSON.stringify(customTools));
    setIsWorkspaceStep(true);
    setAssistantError("");

    const selectedToolNames = selectedTools.map(getToolName);
    const businessContext = [
      companyName && `Business: ${companyName}`,
      industry && `Industry: ${industry}`,
      companySize && `Company size: ${companySize}`,
      selectedGoal && `Goal: ${selectedGoal}`,
    ].filter(Boolean);
    const prompt = [
      `I finished selecting these tools: ${selectedToolNames.join(", ") || "none"}.`,
      ...businessContext,
      "Recommend a workspace setup using only the context provided. Suggest relevant CRM properties and a few useful next steps. Do not invent missing business details, and do not claim any tools are connected.",
    ].join(" ");
    const initialMessages = [
      ...conversation,
      { role: "user", text: prompt, internal: true },
    ].slice(-30);

    setConversation(initialMessages);
    setIsSending(true);
    try {
      const reply = await requestAssistant(initialMessages, {
        task: "workspace-setup",
        companyName,
        companySize,
        industry,
        goal: selectedGoal,
        selectedTools: selectedToolNames.join(", "),
      });
      setConversation((currentMessages) => [
        ...currentMessages,
        { role: "assistant", text: reply },
      ]);
      localStorage.setItem("workspaceSetupResponse", reply);
    } catch (error) {
      setAssistantError(
        error instanceof Error ? error.message : "The assistant couldn't answer right now."
      );
    } finally {
      setIsSending(false);
    }
  }

  async function sendReply(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || isSending) return;
    setDraft("");
    await sendMessage(text);
  }

  return (
    <PageWrapper className={`ai-tools-page${embedded ? " ai-tools-page-embedded" : ""}`}>
      {!embedded && (
        <header className="ai-tools-header">
          <div className="onboarding-brand" aria-label="Alchemize Technologies">
            <span className="onboarding-brand-mark" aria-hidden="true">A</span>
            <span className="onboarding-brand-name">
              <strong>Alchemize</strong>
              <small>Technologies</small>
            </span>
          </div>
          <button type="button" className="ai-tools-manual" onClick={() => navigate("/dashboard")}>
            Set up manually
          </button>
        </header>
      )}

      <section className="ai-tools-content" aria-label="Tool connection setup">
        {selectedGoal && <div className="ai-tools-goal-bubble">{selectedGoal}</div>}
        <div className="ai-tools-stepper" aria-label="Step 2 of 4">
          <span />
          <strong>Step 2 of 4</strong>
          <span />
        </div>

        <div className="ai-tools-assistant-copy">
          <h1>Connect the tools you use</h1>
          <p>Choose the tools your team relies on. You can uncheck anything you don&apos;t use.</p>
        </div>

        <div className="ai-tools-recommendation">
          <span>Based on your choices</span>
          <p>
            We&apos;ve streamlined your setup from 5 steps to 4.
            {recommendationBasis
              ? ` These suggestions consider ${recommendationBasis}.`
              : " These suggestions are a starting point for your workflow."}
          </p>
        </div>

        {(userName || user.email || companyName || companySize || industry) && (
          <div className="ai-tools-profile">
            {userName && <strong>{userName}</strong>}
            {user.email && <span>{user.email}</span>}
            {companyName && <span>{companyName}</span>}
            {companySize && <span><b>Company size</b>{companySize}</span>}
            {industry && <span><b>Industry</b>{industry}</span>}
          </div>
        )}

        <section className="ai-tools-panel" aria-labelledby="ai-tools-title">
          <div className="ai-tools-list-heading">
            <div>
              <h2 id="ai-tools-title">Tools you use</h2>
              <p>Select the tools you want to connect</p>
            </div>
            <span className="ai-tools-selected-count">{selectedToolCount} selected</span>
          </div>
          <div className="ai-tools-grid">
            {suggestedTools.map((tool) => (
              <label
                className={`ai-tool-card${selectedTools.includes(tool.id) ? " selected" : ""}`}
                key={tool.id}
              >
                <span className={`ai-tool-mark ${tool.tone}`} aria-hidden="true">{tool.mark}</span>
                <span className="ai-tool-info">
                  <span className="ai-tool-name">{tool.name}</span>
                  <span className="ai-tool-description">{tool.description}</span>
                </span>
                <input
                  type="checkbox"
                  checked={selectedTools.includes(tool.id)}
                  onChange={() => toggleTool(tool.id)}
                  aria-label={`Select ${tool.name}`}
                />
              </label>
            ))}
            {customTools.map((tool) => (
              <label
                className={`ai-tool-card${selectedTools.includes(tool) ? " selected" : ""}`}
                key={tool}
              >
                <span className="ai-tool-mark custom" aria-hidden="true">{tool.charAt(0).toUpperCase()}</span>
                <span className="ai-tool-info">
                  <span className="ai-tool-name">{tool}</span>
                  <span className="ai-tool-description">Added to your selections</span>
                </span>
                <input
                  type="checkbox"
                  checked={selectedTools.includes(tool)}
                  onChange={() => toggleTool(tool)}
                  aria-label={`Select ${tool}`}
                />
              </label>
            ))}
          </div>
          <p className="ai-tools-note">
            These are setup preferences; each app needs separate authorization before it can connect.
          </p>
        </section>

        {!isWorkspaceStep && (
          <div className="ai-tools-actions">
            <button type="button" className="ai-tools-done" onClick={finishToolSelection}>
              I&apos;m done selecting my tools
            </button>
            <button
              type="button"
              className="ai-tools-missing"
              onClick={askForMissingTools}
              disabled={isMissingToolMode}
            >
              I&apos;m missing some tools
            </button>
          </div>
        )}

        {!isWorkspaceStep && conversation.length > 0 && (
          <div className="ai-tools-conversation" aria-live="polite">
            {conversation.map((message, index) => (
              <div className={`ai-tools-message ${message.role}`} key={`${message.role}-${index}`}>
                {message.text}
              </div>
            ))}
            {isSending && <p className="ai-tools-thinking">Alchemize assistant is thinking…</p>}
          </div>
        )}
        {assistantError && <p className="ai-tools-error" role="alert">{assistantError}</p>}

        {!isWorkspaceStep && (
          <div className="ai-tools-composer">
            <form onSubmit={sendReply}>
              <label className="ai-tools-sr-only" htmlFor="ai-tools-reply">Message the assistant</label>
              <input
                id="ai-tools-reply"
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={isMissingToolMode ? "Enter the tool names..." : "Ask the assistant..."}
                disabled={isSending}
              />
              <button type="submit" aria-label="Send message" disabled={!draft.trim() || isSending}>
                ↑
              </button>
            </form>
          </div>
        )}
      </section>
      {isWorkspaceStep && (
        <AiWorkspaceSetup
          conversation={conversation}
          isSending={isSending}
          assistantError={assistantError}
          onSendMessage={sendMessage}
        />
      )}
    </PageWrapper>
  );
}
