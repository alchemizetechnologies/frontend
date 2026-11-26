import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./OnboardingRole.css";
import "./CompanyWebsite.css";
import "./AccountReview.css";

function getCompanyDomain() {
  const website = localStorage.getItem("companyWebsite") || "";
  if (!website) return "";

  const url = new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`);
  return url.hostname.replace(/^www\./i, "");
}

function getCompanyName(domain) {
  const personalEmailDomains = [
    "gmail.com",
    "outlook.com",
    "hotmail.com",
    "yahoo.com",
    "icloud.com",
    "live.com",
  ];
  if (!domain || domain.includes("alchemize") || personalEmailDomains.includes(domain.toLowerCase())) {
    return "Alchemize Technologies";
  }

  const baseName = domain.split(".")[0];
  return baseName
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getGoogleUser() {
  const storedUser = localStorage.getItem("googleUser");
  return storedUser ? JSON.parse(storedUser) : {};
}

function CompanyIcon() {
  return (
    <svg className="review-company-icon" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M5 27V5h13v22M18 13h9v14M10 10h3M10 15h3M10 20h3M22 18h2M22 22h2M11 27v-3h3v3" />
    </svg>
  );
}

export default function AccountReview() {
  const domain = getCompanyDomain();
  const [companyName, setCompanyName] = useState(() => getCompanyName(domain));
  const [companyEmail, setCompanyEmail] = useState(() => domain ? `info@${domain}` : "");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const googleUser = getGoogleUser();
  const firstName = googleUser.name?.trim().split(/\s+/)[0];

  function createAccount() {
    localStorage.setItem("companyName", companyName.trim());
    localStorage.setItem("companyEmail", companyEmail.trim());
    navigate("/onboarding/welcome");
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
        <Link className="onboarding-back" to="/onboarding/company-website">
          <span aria-hidden="true">‹</span> Back
        </Link>
      </div>

      <section className="review-step" aria-labelledby="review-title">
        <h1 id="review-title">
          Does this look right{firstName ? `, ${firstName}` : ""}?
        </h1>
        <p>Review your company details before creating your account.</p>

        <div className="review-card">
          <div className="review-card-heading">
            <CompanyIcon />
            <button type="button" className="review-edit" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Done" : "Edit"}
            </button>
          </div>
          {isEditing ? (
            <div className="review-fields">
              <label>
                Company name
                <input value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
              </label>
              <label>
                Company email
                <input
                  type="email"
                  value={companyEmail}
                  onChange={(event) => setCompanyEmail(event.target.value)}
                />
              </label>
            </div>
          ) : (
            <div className="review-company-details">
              <strong>{companyName}</strong>
              <span>{companyEmail}</span>
            </div>
          )}
        </div>

        <button className="review-create" type="button" onClick={createAccount}>
          Create my account
        </button>
        <p className="review-terms">
          By creating an account, you agree to the{" "}
          <a href="#terms">Alchemize Technologies Terms of Service</a>.
        </p>
      </section>

      <footer className="onboarding-footer">
        <a href="#cookies">Manage Cookies</a>
      </footer>
    </main>
  );
}
