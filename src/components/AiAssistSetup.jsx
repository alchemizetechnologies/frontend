import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OnboardingRole.css";
import "./AiAssistSetup.css";
import AiToolsSetup from "./AiToolsSetup";

const suggestedGoals = [
  "Track student admissions",
  "Send enrollment reminders",
  "Enroll new students",
  "Help learners",
  "Build course pages",
  "Collect tuition payments",
];

const manualGoals = [
  "Automate marketing",
  "Generate leads",
  "Grow sales pipeline",
  "Scale customer support",
  "Build a website",
  "Send bills and collect payments",
];

function AssistantMark() {
  return (
    <svg className="ai-assist-avatar" viewBox="0 0 56 56" role="img" aria-label="Alchemize assistant">
      <circle cx="28" cy="28" r="25" fill="#fff" stroke="#f05a91" strokeWidth="1.5" />
      <path d="M28 10 32.2 23.8 46 28l-13.8 4.2L28 46l-4.2-13.8L10 28l13.8-4.2L28 10Z" fill="#ff5c8a" />
      <circle cx="28" cy="28" r="4" fill="#fff" />
    </svg>
  );
}

function readGoogleUser() {
  const savedUser = localStorage.getItem("googleUser");
  return savedUser ? JSON.parse(savedUser) : {};
}

function getNameFromEmail(email) {
  const localPart = email.split("@")[0] || "";
  return localPart
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function AiAssistSetup() {
  const toolsStepRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [assistantError, setAssistantError] = useState("");
  const [goal, setGoal] = useState(() => localStorage.getItem("aiAssistGoal") || "");
  const [isToolsStep, setIsToolsStep] = useState(false);
  const [isManualDialogOpen, setIsManualDialogOpen] = useState(false);
  const [manualGoal, setManualGoal] = useState("");
  const navigate = useNavigate();
  const googleUser = readGoogleUser();
  const userEmail = googleUser.email || "";
  const fullName = googleUser.name?.trim() || getNameFromEmail(userEmail);
  const firstName = fullName.split(/\s+/)[0] || "";
  const companyName = localStorage.getItem("companyName")?.trim() || "";
  const companySize = localStorage.getItem("companySize")?.trim() || "";
  const industry = localStorage.getItem("companyIndustry")?.trim() || "";

  useEffect(() => {
    if (!isManualDialogOpen) return undefined;

    function closeOnEscape(event) {
      if (event.key === "Escape") setIsManualDialogOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isManualDialogOpen]);

  useEffect(() => {
    if (isToolsStep) {
      toolsStepRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isToolsStep]);

  async function sendGoal(text) {
    const nextGoal = text.trim();
    if (!nextGoal || isThinking) return;

    if (!goal) {
      setGoal(nextGoal);
      localStorage.setItem("aiAssistGoal", nextGoal);
    }

    const updatedMessages = [...messages, { role: "user", text: nextGoal }].slice(-30);
    setMessages(updatedMessages);
    setDraft("");
    setAssistantError("");
    setIsThinking(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, text: content }) => ({ role, content })),
          context: {
            task: "goal-assistance",
            companyName,
            companySize,
            industry,
            goal: goal || nextGoal,
          },
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

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", text: result.reply.trim() },
      ]);
    } catch (error) {
      setAssistantError(
        error instanceof Error ? error.message : "The assistant couldn't answer right now."
      );
    } finally {
      setIsThinking(false);
    }
  }

  function continueSetup() {
    if (!goal) return;
    setIsToolsStep(true);
  }

  function skipAiSetup() {
    if (!manualGoal) return;
    localStorage.setItem("aiAssistGoal", manualGoal);
    navigate("/dashboard");
  }

  return (
    <main className="ai-assist-page">
      <header className="ai-assist-header">
        <div className="onboarding-brand" aria-label="Alchemize Technologies">
          <span className="onboarding-brand-mark" aria-hidden="true">A</span>
          <span className="onboarding-brand-name">
            <strong>Alchemize</strong>
            <small>Technologies</small>
          </span>
        </div>
        <button className="ai-assist-manual" type="button" onClick={() => setIsManualDialogOpen(true)}>
          Set up manually
        </button>
      </header>

      <div className="ai-assist-stepper" aria-label="Step 1 of 4">
        <span />
        <strong>Step 1 of 4</strong>
        <span />
      </div>

      <section className="ai-assist-content" aria-labelledby="ai-assist-title">
        <div className="ai-assist-intro">
          <AssistantMark />
          <p className="ai-assist-greeting">👋 Hi{firstName ? `, ${firstName}` : ""}!</p>
          <p>
            I&apos;m your Alchemize setup assistant. I&apos;ll help configure your workspace
            around your organization so your team can get started with confidence.
          </p>
          <p>
            Guided setup takes about 3 minutes. A few quick questions will help us tailor the
            experience to your goals.
          </p>
        </div>

        <h1 id="ai-assist-title">Set your first goal</h1>
        {(fullName || userEmail || companyName || companySize || industry) && (
          <div className="ai-assist-profile" aria-label="Account details">
            {fullName && <strong>{fullName}</strong>}
            {userEmail && <span>{userEmail}</span>}
            {companyName && <span>{companyName}</span>}
            {companySize && <span><b>Company size</b>{companySize}</span>}
            {industry && <span><b>Industry</b>{industry}</span>}
          </div>
        )}

        <div className="ai-assist-prompt">
          <strong>
            {messages.length
              ? `What else should we know about ${companyName || "your business"}?`
              : `What is the main goal for your ${industry ? `${industry.toLowerCase()} ` : ""}business?`}
          </strong>
          <p>Choose a suggestion or describe your goal in your own words.</p>
        </div>

        {messages.length === 0 && (
          <div className="ai-assist-suggestions" aria-label="Suggested goals">
            {suggestedGoals.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                disabled={isThinking}
                onClick={() => sendGoal(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="ai-assist-conversation" aria-live="polite">
          {messages.map((message, index) => (
            <div className={`ai-assist-message ${message.role}`} key={`${message.role}-${index}`}>
              {message.text}
            </div>
          ))}
          {isThinking && <p className="ai-assist-thinking">Alchemize assistant is thinking…</p>}
        </div>
        {assistantError && <p className="ai-assist-error" role="alert">{assistantError}</p>}

        {goal && !isThinking && !isToolsStep && (
          <button className="ai-assist-continue" type="button" onClick={continueSetup}>
            Continue setup
          </button>
        )}
      </section>

      {isToolsStep ? (
        <div ref={toolsStepRef} className="ai-assist-next-step">
          <AiToolsSetup embedded />
        </div>
      ) : (
        <div className="ai-assist-composer">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendGoal(draft);
            }}
          >
            <span className="ai-assist-privacy-mark" aria-hidden="true">◇</span>
            <label className="ai-assist-sr-only" htmlFor="ai-assist-reply">Reply to the assistant</label>
            <input
              id="ai-assist-reply"
              type="text"
              placeholder="Reply..."
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              disabled={isThinking}
            />
            <button type="submit" aria-label="Send reply" disabled={!draft.trim() || isThinking}>
              ↑
            </button>
          </form>
          <p>Replies are AI-generated and may be inaccurate. Avoid sharing sensitive information.</p>
        </div>
      )}
      {isManualDialogOpen && (
        <div
          className="manual-setup-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsManualDialogOpen(false);
          }}
        >
          <section
            className="manual-setup-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="manual-setup-title"
          >
            <header className="manual-setup-header">
              <h2 id="manual-setup-title">Skip AI-assisted setup?</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsManualDialogOpen(false)}
              >
                ×
              </button>
            </header>
            <div className="manual-setup-body">
              <p>You can set up your workspace manually. It may take a little longer.</p>
              <p className="manual-setup-question">
                Before you start, what&apos;s your main goal with Alchemize?
              </p>
              <div className="manual-setup-options">
                {manualGoals.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="manual-goal"
                      value={option}
                      checked={manualGoal === option}
                      onChange={() => setManualGoal(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <div className="manual-setup-actions">
                <button
                  type="button"
                  className="manual-setup-skip"
                  disabled={!manualGoal}
                  onClick={skipAiSetup}
                >
                  Skip and set up manually
                </button>
                <button
                  type="button"
                  className="manual-setup-continue"
                  onClick={() => setIsManualDialogOpen(false)}
                >
                  Continue with AI
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
