import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OnboardingRole.css";

const roles = ["Owner", "Manager", "Employee", "Student, Freelancer, or Intern"];

function AlchemizeLogo() {
  return (
    <div className="onboarding-brand" aria-label="Alchemize Technologies">
      <span className="onboarding-brand-mark" aria-hidden="true">A</span>
      <span className="onboarding-brand-name">
        <strong>Alchemize</strong>
        <small>Technologies</small>
      </span>
    </div>
  );
}

export default function OnboardingRole() {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  function continueOnboarding() {
    localStorage.setItem("userRole", selectedRole);
    navigate("/onboarding/company-website");
  }

  return (
    <main className="onboarding-page">
      <AlchemizeLogo />
      <section className="role-step" aria-labelledby="role-title">
        <h1 id="role-title">What&apos;s your role?</h1>
        <p>This helps set you up to achieve your goals faster.</p>
        <div className="role-options">
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              className={selectedRole === role ? "selected" : ""}
              aria-pressed={selectedRole === role}
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </button>
          ))}
        </div>
        {selectedRole && (
          <button className="role-continue" type="button" onClick={continueOnboarding}>
            Continue
          </button>
        )}
      </section>
      <footer className="onboarding-footer">
        <a href="#cookies">Manage Cookies</a>
      </footer>
    </main>
  );
}
