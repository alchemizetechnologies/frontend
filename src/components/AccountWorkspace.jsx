import { Link, Navigate, useParams } from "react-router-dom";
import { readAccountProfiles } from "./accountStorage";
import "./AccountWorkspace.css";

const navigation = [
  { label: "Overview", to: null },
  { label: "Accounts", to: "/account" },
  { label: "Products", to: "/pricing" },
  { label: "Workspace setup", to: "/onboarding/ai-assist" },
];

export default function AccountWorkspace() {
  const { accountNumber } = useParams();
  const accountEntry = Object.entries(readAccountProfiles())
    .find(([, profile]) => profile.accountNumber === accountNumber && profile.accountCreated);
  if (!accountEntry) return <Navigate to="/account" replace />;
  const [accountId, account] = accountEntry;

  const steps = [
    Boolean(account.name && account.email),
    Boolean(account.role),
    Boolean(account.companyName && account.companyWebsite),
    account.workspaceSetupConfirmed === true
      || (localStorage.getItem("currentAccountId") === accountId && localStorage.getItem("workspaceSetupConfirmed") === "true"),
  ];
  const progress = Math.round((steps.filter(Boolean).length / steps.length) * 100);
  const companyName = account.companyName || account.name || "your account";

  return (
    <div className="workspace-layout">
      <aside className="workspace-sidebar">
        <Link className="workspace-brand" to="/account" aria-label="Accounts">
          <span className="workspace-brand-mark" aria-hidden="true">A</span>
          <span>Workspace</span>
        </Link>
        <nav className="workspace-navigation" aria-label="Workspace navigation">
          {navigation.map((item) => item.to
            ? <Link key={item.label} to={item.to}>{item.label}</Link>
            : <span className="active" key={item.label} aria-current="page">{item.label}</span>)}
        </nav>
        <div className="workspace-sidebar-note">
          <strong>Need a hand?</strong>
          <span>Continue setting up your workspace at your own pace.</span>
          <Link to="/onboarding/ai-assist">Continue setup</Link>
        </div>
      </aside>

      <div className="workspace-main">
        <header className="workspace-topbar">
          <label className="workspace-search">
            <span className="visually-hidden">Search workspace</span>
            <input type="search" placeholder="Search workspace" />
          </label>
          <span className="workspace-assistant">Workspace assistant</span>
          <Link className="workspace-account-name" to={`/account/${encodeURIComponent(accountId)}`}>
            {companyName}
          </Link>
        </header>

        <main className="workspace-content">
          <section className="workspace-progress" aria-labelledby="workspace-progress-title">
            <div className="workspace-progress-heading">
              <h1 id="workspace-progress-title">Your workspace setup</h1>
              <strong>{progress}%</strong>
            </div>
            <div
              className="workspace-progress-track"
              role="progressbar"
              aria-label="Workspace setup progress"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progress}
            >
              <span style={{ width: `${progress}%` }} />
            </div>
          </section>

          <div className="workspace-panels">
            <aside className="workspace-guides">
              <h2>Setup guides</h2>
              <Link to="/onboarding/ai-assist">Marketing setup</Link>
              <Link to="/onboarding/ai-assist">Sales setup</Link>
              <Link to="/onboarding/ai-assist">Customer service setup</Link>
              <Link to="/onboarding/ai-tools">Connect your tools</Link>
              <hr />
              <Link to="/account">View your accounts</Link>
              <Link to={`/account/${encodeURIComponent(accountId)}`}>Account details</Link>
            </aside>

            <div className="workspace-recommendations">
              <section className="workspace-resume">
                <div className="workspace-resume-icon" aria-hidden="true">✦</div>
                <div>
                  <h2>Continue setting up {companyName}</h2>
                  <p>Your setup assistant can help you finish configuring your workspace.</p>
                  <Link className="workspace-primary-action" to="/onboarding/ai-assist">Continue setup</Link>
                </div>
              </section>

              <section className="workspace-next-steps">
                <h2>Recommended next steps</h2>
                <div className="workspace-task">
                  <span className="workspace-task-check" aria-hidden="true" />
                  <div>
                    <Link to="/account">Review your account details</Link>
                    <p>Check that your company and profile information are up to date.</p>
                  </div>
                </div>
                <div className="workspace-task">
                  <span className="workspace-task-check" aria-hidden="true" />
                  <div>
                    <Link to="/onboarding/ai-tools">Connect a tool</Link>
                    <p>Choose the tools you want to use with your workspace.</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
