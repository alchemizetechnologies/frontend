import { Link, Navigate, useParams } from "react-router-dom";
import { AccountsHeader } from "./AccountsShell";
import { isAccountCreated, readAccountProfiles } from "./accountStorage";
import "./AccountDetails.css";

function Detail({ label, value }) {
  return (
    <div className="account-detail">
      <dt>{label}</dt>
      <dd>{value || "Not added yet"}</dd>
    </div>
  );
}

export default function AccountDetails() {
  const { accountId } = useParams();
  const user = readAccountProfiles()[accountId];
  if (!isAccountCreated(user)) return <Navigate to="/account" replace />;
  const isCurrentAccount = localStorage.getItem("currentAccountId") === accountId;

  const details = [
    ["Name", user.name],
    ["Email", user.email],
    ["Company name", user.companyName || (isCurrentAccount ? localStorage.getItem("companyName") : "")],
    ["Company email", user.companyEmail || (isCurrentAccount ? localStorage.getItem("companyEmail") : "")],
    ["Company website", user.companyWebsite || (isCurrentAccount ? localStorage.getItem("companyWebsite") : "")],
    ["Role", user.role || (isCurrentAccount ? localStorage.getItem("userRole") : "")],
    ["Account ID", user.accountNumber],
  ];

  return (
    <>
      <AccountsHeader />
      <main className="account-page">
        <div className="account-page-inner">
          <Link className="account-back" to="/account">← Back to accounts</Link>
          <h1>{user.companyName || "Account details"}</h1>
          <p className="account-intro">View your account and company details.</p>
          <section className="account-card" aria-label="Account details">
            <div className="account-profile">
              {user.picture
                ? <img src={user.picture} alt="" className="account-avatar" />
                : <span className="account-avatar account-avatar-placeholder" aria-hidden="true">{user.name?.charAt(0) || "A"}</span>}
              <div>
                <h2>{user.name || "Your account"}</h2>
                <p>{user.email}</p>
              </div>
            </div>
            <dl className="account-detail-list">
              {details.map(([label, value]) => <Detail key={label} label={label} value={value} />)}
            </dl>
          </section>
        </div>
      </main>
    </>
  );
}
