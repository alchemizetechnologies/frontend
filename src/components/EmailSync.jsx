import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmailSync.css";

function loadGoogleIdentity() {
  if (window.google?.accounts?.oauth2) return Promise.resolve();

  return new Promise((resolve, reject) => {
    let script = document.querySelector('script[data-google-identity]');
    const timeout = window.setTimeout(() => {
      reject(new Error("Google sign-in did not load in time."));
    }, 10000);

    function handleLoad() {
      window.clearTimeout(timeout);
      if (window.google?.accounts?.oauth2) {
        resolve();
      } else {
        reject(new Error("Google sign-in is unavailable."));
      }
    }

    function handleError() {
      window.clearTimeout(timeout);
      reject(new Error("Google sign-in could not be loaded."));
    }

    if (!script) {
      script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.dataset.googleIdentity = "true";
    }

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    if (!script.isConnected) document.head.appendChild(script);
  });
}

function GoogleMark() {
  return (
    <svg className="email-sync-google-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.5-.2-2.2H12v4.2h5.4a4.6 4.6 0 0 1-2 3v2.7h3.5c2-1.9 3.1-4.6 3.1-7.7z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.5-2.7c-.9.6-2.1 1-3.1 1-2.6 0-4.8-1.8-5.6-4.1H2.8v2.8A10 10 0 0 0 12 22z" />
      <path fill="#FBBC05" d="M6.4 13.8A6 6 0 0 1 6.1 12c0-.6.1-1.2.3-1.8V7.4H2.8A10 10 0 0 0 2 12c0 1.6.4 3.2 1 4.6l3.4-2.8z" />
      <path fill="#EA4335" d="M12 6.1c1.6 0 3 .5 4.1 1.6l3.1-3.1A10 10 0 0 0 12 2a10 10 0 0 0-9.2 5.4l3.6 2.8C7.2 7.9 9.4 6.1 12 6.1z" />
    </svg>
  );
}

function SyncPreview() {
  return (
    <div className="sync-preview" aria-hidden="true">
      <div className="sync-preview-pill">
        <span>✉</span>
        <strong>Connect your email + contacts</strong>
      </div>
      <div className="sync-preview-line"><span>↻</span></div>
      <div className="sync-contacts">
        <strong className="sync-contacts-title">Contacts</strong>
        {[1, 2, 3].map((row) => (
          <div className="sync-contact-row" key={row}>
            <span className="sync-checkbox" />
            <span className="sync-avatar">{row === 1 ? "A" : row === 2 ? "J" : "M"}</span>
            <span className={`sync-skeleton sync-skeleton-${row}`} />
            <span className={`sync-skeleton sync-skeleton-short sync-skeleton-${row}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EmailSync() {
  const [message, setMessage] = useState("");
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [syncOptions, setSyncOptions] = useState({ email: true, calendar: true });
  const navigate = useNavigate();
  const selectAll = syncOptions.email && syncOptions.calendar;

  useEffect(() => {
    if (!isConsentOpen) return undefined;

    function closeOnEscape(event) {
      if (event.key === "Escape") setIsConsentOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isConsentOpen]);

  function connectGoogle() {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setIsConsentOpen(false);
      setMessage("Google sign-in is not configured. Add VITE_GOOGLE_CLIENT_ID to the app environment.");
      return;
    }

    loadGoogleIdentity()
      .then(() => {
        const codeClient = window.google.accounts.oauth2.initCodeClient({
          client_id: clientId,
          scope: "openid email profile",
          ux_mode: "popup",
          select_account: true,
          callback: (response) => {
            if (response.error) {
              setMessage(`Google sign-in could not continue: ${response.error}`);
              return;
            }

            setMessage("Google account selected. Email and calendar syncing still requires a secure server integration; no email or calendar data was accessed.");
          },
          error_callback: (error) => {
            setMessage(`Google sign-in could not open: ${error.type}.`);
          },
        });

        setIsConsentOpen(false);
        codeClient.requestCode();
      })
      .catch((error) => {
        setIsConsentOpen(false);
        setMessage(error.message);
      });
  }

  return (
    <main className="email-sync-page">
      <aside className="email-sync-rail" aria-label="Alchemize Technologies">
        <span className="email-sync-brand-mark">A</span>
      </aside>
      <section className="email-sync-main">
        <div className="email-sync-copy">
          <h1>Connect your email to sync all your contacts and conversations in one place</h1>
          <p>
            Connecting your email can help organize communication history and enrich profiles
            with accurate job titles, locations, and more.
          </p>
          <button
            className="email-sync-google-button"
            type="button"
            onClick={() => {
              setMessage("");
              setIsConsentOpen(true);
            }}
          >
            <GoogleMark />
            Continue with Google
          </button>
          {message && <p className="email-sync-message" role="status">{message}</p>}
        </div>
        <div className="email-sync-skip-row">
          <button type="button" onClick={() => navigate("/onboarding/ai-loading")}>
            Skip, for now
          </button>
        </div>
      </section>
      <aside className="email-sync-aside">
        <SyncPreview />
        <div className="email-sync-benefits">
          <h2>Connecting with Google</h2>
          <ul>
            <li>Every interaction is categorized and organized</li>
            <li>Contacts and companies can be added to your workspace</li>
            <li>Your data stays private and secure</li>
          </ul>
        </div>
      </aside>
      {isConsentOpen && (
        <div
          className="sync-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsConsentOpen(false);
          }}
        >
          <section
            className="sync-consent-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sync-consent-title"
          >
            <header className="sync-consent-header">
              <h2 id="sync-consent-title">Choose what to sync from Google to Alchemize Technologies</h2>
              <button
                type="button"
                className="sync-modal-close"
                aria-label="Close"
                onClick={() => setIsConsentOpen(false)}
              >
                ×
              </button>
            </header>
            <label className="sync-select-all">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setSyncOptions({ email: checked, calendar: checked });
                }}
              />
              <span>Select all (recommended)</span>
            </label>
            <div className="sync-consent-options">
              <label className="sync-consent-option">
                <span className="sync-option-icon" aria-hidden="true">✉</span>
                <span className="sync-option-copy">
                  <strong>Email history and contacts</strong>
                  <small>Log conversations automatically and import contacts</small>
                </span>
                <input
                  type="checkbox"
                  checked={syncOptions.email}
                  onChange={(event) => setSyncOptions((options) => ({
                    ...options,
                    email: event.target.checked,
                  }))}
                  aria-label="Sync email history and contacts"
                />
              </label>
              <label className="sync-consent-option">
                <span className="sync-option-icon" aria-hidden="true">▣</span>
                <span className="sync-option-copy">
                  <strong>Calendar and contacts</strong>
                  <small>Log meetings automatically and create contacts from attendees</small>
                </span>
                <input
                  type="checkbox"
                  checked={syncOptions.calendar}
                  onChange={(event) => setSyncOptions((options) => ({
                    ...options,
                    calendar: event.target.checked,
                  }))}
                  aria-label="Sync calendar and contacts"
                />
              </label>
            </div>
            <div className="sync-security-note">
              <strong>Google account access</strong>
              <p>
                You&apos;ll choose a Google account to continue. Email and calendar permissions
                will only be requested after secure sync integration is configured.
              </p>
            </div>
            <footer className="sync-consent-footer">
              <button
                type="button"
                className="sync-connect-button"
                disabled={!syncOptions.email && !syncOptions.calendar}
                onClick={connectGoogle}
              >
                <GoogleMark />
                Connect Google
              </button>
            </footer>
          </section>
        </div>
      )}
    </main>
  );
}
