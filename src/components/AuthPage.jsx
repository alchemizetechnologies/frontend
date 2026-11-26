import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPage.css";

function AlchemizeMark({ login = false }) {
  return (
    <div className={"auth-alchemize-logo" + (login ? " auth-alchemize-logo-login" : "")} aria-label="Alchemize Technologies">
      <span className="auth-alchemize-mark" aria-hidden="true">A</span>
      <span className="auth-alchemize-name">
        <strong>Alchemize</strong>
        <small>Technologies</small>
      </span>
    </div>
  );
}

function saveAccountProfile(user) {
  const email = user.email?.trim().toLowerCase() || "";
  const accountId = email || user.sub || user.uid;
  if (!accountId) {
    throw new Error("The sign-in provider did not return an account identifier.");
  }

  const storedAccounts = localStorage.getItem("accountProfiles") || localStorage.getItem("googleAccounts");
  const accounts = storedAccounts ? JSON.parse(storedAccounts) : {};
  if (!accounts || Array.isArray(accounts) || typeof accounts !== "object") {
    throw new Error("Saved account data is invalid. Clear this browser's saved accounts and try again.");
  }

  const existingAccount = accounts[accountId]
    || Object.values(accounts).find((account) => (
      account && typeof account.email === "string" && account.email.trim().toLowerCase() === email
    ))
    || {};
  const timestamp = new Date().toISOString();
  const profile = {
    sub: user.sub || user.uid || existingAccount.sub || accountId,
    name: user.name?.trim() || user.displayName?.trim() || existingAccount.name || email.split("@")[0],
    email: email || existingAccount.email || "",
    picture: user.picture || user.photoURL || existingAccount.picture || "",
    createdAt: existingAccount.createdAt || timestamp,
    updatedAt: timestamp,
  };

  localStorage.setItem("accountProfiles", JSON.stringify({
    ...accounts,
    [accountId]: profile,
  }));
  localStorage.setItem("googleUser", JSON.stringify(profile));
  return profile;
}

function GoogleSignInButton({ width = 364, onSuccess }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || !buttonRef.current) return;

    const renderButton = () => {
      if (!window.google?.accounts?.id || !buttonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          try {
            const base64 = response.credential.split(".")[1]
              .replace(/-/g, "+")
              .replace(/_/g, "/");
            const binary = atob(base64);
            const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
            const payload = JSON.parse(new TextDecoder().decode(bytes));

            onSuccess(payload);
          } catch {
            localStorage.removeItem("googleUser");
          }
        },
      });

      buttonRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "continue_with",
        width,
      });
    };

    if (window.google?.accounts?.id) {
      renderButton();
      return;
    }

    const existingScript = document.querySelector('script[data-google-identity]');
    if (existingScript) {
      existingScript.addEventListener("load", renderButton, { once: true });
      return () => existingScript.removeEventListener("load", renderButton);
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = "true";
    script.addEventListener("load", renderButton, { once: true });
    document.head.appendChild(script);

    return () => script.removeEventListener("load", renderButton);
  }, [onSuccess, width]);

  return <div className="google-signin-host" ref={buttonRef} aria-label="Continue with Google" />;
}

export default function AuthPage({ mode = "signup" }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const isLocalDevEmailTestMode = import.meta.env.DEV
    && ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  const [welcomeUser, setWelcomeUser] = useState(null);
  const [isTestLogin, setIsTestLogin] = useState(false);
  const [authError, setAuthError] = useState("");
  const [email, setEmail] = useState("");
  const handleEmailSubmit = useCallback((event) => {
    event.preventDefault();
    const emailAddress = email.trim().toLowerCase();
    if (!emailAddress) {
      setAuthError("Enter your email address.");
      return;
    }

    setAuthError("");

    if (isLocalDevEmailTestMode) {
      if (isSignup) {
        navigate("/onboarding/role");
      } else {
        setIsTestLogin(true);
        setWelcomeUser({
          email: emailAddress,
          name: emailAddress.split("@")[0],
        });
      }
      return;
    }

    setAuthError("Email sign-in will be available when backend authentication is connected.");
  }, [email, isLocalDevEmailTestMode, isSignup, navigate]);

  const handleGoogleSuccess = useCallback((user) => {
    let account;
    try {
      account = saveAccountProfile(user);
      setAuthError("");
      setIsTestLogin(false);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Could not save this account in the browser.");
      return;
    }

    if (isSignup) {
      navigate("/onboarding/role");
      return;
    }

    setWelcomeUser(account);
  }, [isSignup, navigate]);

  return (
    <main className={"auth-page " + mode}>
      <div className="auth-main">
        {welcomeUser ? (
          <section className="welcome-card" aria-label="Sign-in successful">
            <AlchemizeMark login />
            <p className="auth-success-label" role="status">
              {isTestLogin ? "Test login successful — email not verified" : "Login successful"}
            </p>
            <h1>Welcome to Alchemize Technologies</h1>
            <p>{welcomeUser.name ? `Welcome, ${welcomeUser.name}.` : "You have signed in successfully."}</p>
            <Link className="welcome-continue" to="/onboarding/role">Continue</Link>
          </section>
        ) : isSignup ? (
          <section className="signup-card" aria-label="Create account">
            <AlchemizeMark />
            <h1>Create your account</h1>
            <p className="auth-subtitle">100% free. No credit card needed.</p>

            <div className="social-buttons">
              <GoogleSignInButton width={410} onSuccess={handleGoogleSuccess} />
            </div>
            <div className="auth-divider"><span>OR</span></div>
            {isLocalDevEmailTestMode && (
              <p className="auth-test-note" role="note">Local test mode only: email is not verified or saved as an account.</p>
            )}
            <form className="email-auth-form" onSubmit={handleEmailSubmit}>
              <label htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button type="submit">Continue with email</button>
            </form>
            {authError && <p className="auth-error" role="alert">{authError}</p>}
            <p className="auth-note">
              {isLocalDevEmailTestMode
                ? "Test only: no email is sent or verified."
                : "Email sign-in requires backend authentication."}
            </p>

            <p className="auth-terms">
              By continuing, you acknowledge Alchemize Technologies&apos; <a href="#privacy">Privacy<br className="term-break" /> Policy</a> and agree to get occasional product updates and<br className="desktop-break" /> promotional emails.
            </p>
            <p className="auth-switch">Have an account? <Link to="/login">Sign in</Link></p>
          </section>
        ) : (
          <section className="login-card" aria-label="Sign in">
            <AlchemizeMark login />
            <h1>Sign in</h1>
            <p className="login-create">or <Link to="/signup">create an account</Link></p>
            <GoogleSignInButton width={364} onSuccess={handleGoogleSuccess} />
            <div className="login-divider"><span>OR</span></div>
            {isLocalDevEmailTestMode && (
              <p className="auth-test-note" role="note">Local test mode only: email is not verified or saved as an account.</p>
            )}
            <form className="email-auth-form" onSubmit={handleEmailSubmit}>
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button type="submit">Continue with email</button>
            </form>
            {authError && <p className="auth-error" role="alert">{authError}</p>}
            <p className="auth-note">
              {isLocalDevEmailTestMode
                ? "Test only: no email is sent or verified."
                : "Email sign-in requires backend authentication."}
            </p>
            <div className="login-demo">
              <span>See how Alchemize Technologies can help you achieve your growth goals.</span>
              <Link to="/contact">Get a demo</Link>
            </div>
          </section>
        )}
      </div>
      <footer className="auth-footer">
        <span>&copy;2026 Alchemize Technologies. All Rights Reserved.</span>
        <a href="#privacy">Privacy Policy</a>
        <a href="#cookies">Manage Cookies</a>
      </footer>
    </main>
  );
}
