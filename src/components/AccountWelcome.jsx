import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OnboardingRole.css";
import "./AccountWelcome.css";
import { readCurrentAccount } from "./accountStorage";

function getFirstName() {
  const user = readCurrentAccount() || {};
  return user.name?.trim().split(/\s+/)[0] || "";
}

function WelcomeGauge() {
  return (
    <svg className="welcome-gauge" viewBox="0 0 160 150" aria-hidden="true">
      <path d="M40 77a40 40 0 0 1 80 0" fill="none" stroke="#ff5c35" strokeWidth="2" />
      <path d="M80 47v30l-8 13" fill="none" stroke="#ff5c35" strokeWidth="2" />
      <circle cx="80" cy="77" r="3" fill="#fff" stroke="#00504f" strokeWidth="2" />
      <path d="M80 15v10M62 19l3 9M46 29l6 8M33 44l9 5M27 63l10 2M98 19l-3 9M114 29l-6 8M127 44l-9 5M133 63l-10 2" stroke="#ff5c35" strokeWidth="2" />
      <path d="M35 105l-9 5M52 121l-5 9M80 127v10M108 121l5 9M125 105l9 5" stroke="#00504f" strokeWidth="2" />
    </svg>
  );
}

export default function AccountWelcome() {
  const navigate = useNavigate();
  const firstName = getFirstName();

  useEffect(() => {
    const timer = window.setTimeout(() => navigate("/onboarding/email-sync"), 3000);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="onboarding-page">
      <div className="onboarding-brand" aria-label="Alchemize Technologies">
        <span className="onboarding-brand-mark" aria-hidden="true">A</span>
        <span className="onboarding-brand-name">
          <strong>Alchemize</strong>
          <small>Technologies</small>
        </span>
      </div>
      <section className="welcome-step" aria-live="polite">
        <WelcomeGauge />
        <h1>We&apos;re glad you&apos;re here{firstName ? `, ${firstName}` : ""}</h1>
        <p>Next, let&apos;s tailor your experience.</p>
        <span className="welcome-spinner" role="status" aria-label="Loading" />
      </section>
      <footer className="onboarding-footer">
        <a href="#cookies">Manage Cookies</a>
      </footer>
    </main>
  );
}

export function OnboardingLoading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => navigate("/onboarding/ai-assist"), 1800);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="onboarding-page">
      <div className="onboarding-brand" aria-label="Alchemize Technologies">
        <span className="onboarding-brand-mark" aria-hidden="true">A</span>
        <span className="onboarding-brand-name">
          <strong>Alchemize</strong>
          <small>Technologies</small>
        </span>
      </div>
      <section className="welcome-step assistant-loading-step" aria-live="polite">
        <span className="welcome-spinner" role="status" aria-label="Loading" />
        <h1>Loading your onboarding assistant</h1>
        <p>Continuing your easy and intelligent setup</p>
      </section>
    </main>
  );
}
