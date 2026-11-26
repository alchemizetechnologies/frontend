import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./OnboardingRole.css";
import "./CompanyWebsite.css";

function isValidWebsite(value) {
  const website = value.trim();
  if (!website) return false;

  try {
    const url = new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`);
    return url.hostname.includes(".") && !url.hostname.startsWith(".");
  } catch {
    return false;
  }
}

export default function CompanyWebsite() {
  const [website, setWebsite] = useState(() => localStorage.getItem("companyWebsite") || "");
  const navigate = useNavigate();
  const validWebsite = isValidWebsite(website);

  function continueOnboarding(event) {
    event.preventDefault();
    if (!validWebsite) return;

    localStorage.setItem("companyWebsite", website.trim());
    navigate("/onboarding/review");
  }

  return (
    <main className="onboarding-page">
      <div className="company-topbar">
        <div className="onboarding-brand" aria-label="Alchemize Technologies">
          <span className="onboarding-brand-mark" aria-hidden="true">A</span>
          <span className="onboarding-brand-name">
            <strong>Alchemize</strong>
            <small>Technologies</small>
          </span>
        </div>
        <Link className="onboarding-back" to="/onboarding/role">
          <span aria-hidden="true">‹</span> Back
        </Link>
      </div>

      <section className="company-step" aria-labelledby="company-title">
        <h1 id="company-title">Company website</h1>
        <p>We&apos;ll analyze your website to speed up your sign-up.</p>
        <form onSubmit={continueOnboarding}>
          <label className="company-website-label" htmlFor="company-website">
            Company website
          </label>
          <input
            id="company-website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="www.website.com"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
          <button type="submit" disabled={!validWebsite}>Next</button>
        </form>
      </section>

      <footer className="onboarding-footer">
        <a href="#cookies">Manage Cookies</a>
      </footer>
    </main>
  );
}
