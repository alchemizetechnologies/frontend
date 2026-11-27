import { useState } from "react";
import { Link } from "react-router-dom";
import { readCurrentAccount } from "./accountStorage";
import "./AccountsShell.css";

export function AccountsHeader() {
  const user = readCurrentAccount();
  const accountId = localStorage.getItem("currentAccountId");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="accounts-header">
      <div className="accounts-header-inner">
        <Link className="accounts-brand" to="/dashboard" aria-label="HubSpot home">
          <svg className="accounts-brand-mark" viewBox="0 0 34 38" aria-hidden="true">
            <circle cx="22" cy="23" r="6" />
            <path d="M22 17V8M17 19 9 13M16 27 9 32" />
            <circle cx="22" cy="5" r="3" />
            <circle cx="6" cy="11" r="3" />
            <circle cx="6" cy="33" r="3" />
          </svg>
        </Link>
        <div className="accounts-user-menu">
          <button
            className="accounts-user-button"
            type="button"
            aria-label="Open account menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="accounts-user-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
            </svg>
            <svg className="accounts-chevron" viewBox="0 0 12 8" aria-hidden="true">
              <path d="m1 1 5 5 5-5" />
            </svg>
          </button>
          {menuOpen && (
            <div className="accounts-user-dropdown">
              {user && <span className="accounts-user-label">{user.name || user.email}</span>}
              <Link to={accountId ? `/account/${encodeURIComponent(accountId)}` : "/login"} onClick={() => setMenuOpen(false)}>
                {user ? "My account" : "Log in"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
