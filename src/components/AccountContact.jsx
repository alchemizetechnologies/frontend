import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readAccountProfiles } from "./accountStorage";
import "./AccountContact.css";

const INITIAL_CONTACTS = [
  {
    id: "c-1",
    name: "Brian Halligan (Sa...",
    fullName: "Brian Halligan",
    email: "bh@hubspot.com",
    phone: "--",
    owner: "No owner",
    company: "HubSpot",
    lastActivity: "Yesterday at 12:22 PM GMT+...",
    leadStatus: "--",
    createDate: "Yesterday at 12:22 PM GMT+...",
    assignedToMe: false,
  },
  {
    id: "c-2",
    name: "Maria Johnson (Sa...",
    fullName: "Maria Johnson",
    email: "emailmaria@hubspot.co...",
    phone: "--",
    owner: "No owner",
    company: "HubSpot",
    lastActivity: "Yesterday at 2:22 PM GMT+5:...",
    leadStatus: "--",
    createDate: "Yesterday at 12:22 PM GMT+...",
    assignedToMe: true,
  },
];

const MORE_MENU_CATEGORIES = [
  {
    id: "crm",
    label: "CRM",
    items: [
      { label: "Contacts", pinned: true },
      { label: "Companies", pinned: true },
      { label: "Deals", pinned: true },
      { label: "Tickets", pinned: false },
      { label: "Products", pinned: false },
      { label: "Orders", pinned: false },
      { label: "Segments", pinned: true },
      { label: "Inbox", pinned: false },
      { label: "Calls", pinned: false },
      { label: "Meetings", pinned: false },
      { label: "Tasks", pinned: false },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    items: [
      { label: "AEO", pinned: true },
      { label: "Marketing Emails", pinned: true },
      { label: "Forms", pinned: true },
      { label: "Campaigns", pinned: true },
      { label: "Ads", pinned: false },
      { label: "Social", pinned: false },
    ],
  },
  {
    id: "content",
    label: "Content",
    items: [
      { label: "Website Pages", pinned: true },
      { label: "Blog", pinned: true },
      { label: "Landing Pages", pinned: false },
      { label: "SEO", pinned: false },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    items: [
      { label: "Deals", pinned: true },
      { label: "Forecast", pinned: false },
      { label: "Sequences", pinned: false },
      { label: "Documents", pinned: false },
    ],
  },
  {
    id: "reporting",
    label: "Reporting",
    items: [
      { label: "Dashboards", pinned: true },
      { label: "Reports", pinned: false },
    ],
  },
];

function NavIcon({ type }) {
  switch (type) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <path d="M3.5 10.5 12 3.5l8.5 7V19.5a1.5 1.5 0 0 1-1.5 1.5H14.5v-5.5h-5V21H5a1.5 1.5 0 0 1-1.5-1.5v-9Z" />
        </svg>
      );
    case "contacts":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="4" y="3" width="16" height="18" rx="3" />
          <circle cx="12" cy="9.2" r="2.6" />
          <path d="M7.8 17c.9-2.1 2.3-3.1 4.2-3.1s3.3 1 4.2 3.1" />
        </svg>
      );
    case "companies":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="3.5" y="3.5" width="10.5" height="17" rx="2" />
          <path d="M14 9.5h5a1.5 1.5 0 0 1 1.5 1.5v9.5H14M7.5 7.5h2.5M7.5 11.5h2.5M7.5 15.5h2.5" />
        </svg>
      );
    case "deals":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v10M14.6 9.6c0-1.1-1.1-1.9-2.6-1.9s-2.6.8-2.6 1.9 1.1 1.6 2.6 2 2.6.9 2.6 2.1-1.1 1.9-2.6 1.9-2.6-.8-2.6-1.9" />
        </svg>
      );
    case "segments":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M8 8.8h8M8 12.2h5.5M8 15.6h3.5" />
        </svg>
      );
    case "aeo":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <path d="M4.5 13.5V9.2l11-4.2v12.5l-11-4Z" />
          <path d="M18.2 8.5a4.2 4.2 0 0 1 0 5.5M7.2 14.6l1.4 4.6" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m3.8 6.8 8.2 5.8 8.2-5.8" />
        </svg>
      );
    case "forms":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="4.5" y="3" width="15" height="18" rx="2.5" />
          <path d="M8 8h8M8 12h8M8 16h4.5" />
        </svg>
      );
    case "campaigns":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "pages":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M3 9h18M8.5 4v5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function WorkspaceDashboard() {
  const { accountNumber } = useParams();
  const [activeNav, setActiveNav] = useState("contacts");
  const [activeTab, setActiveTab] = useState("all"); // all | mine | unassigned
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [selectedIds, setSelectedIds] = useState([]);
  const [tableSearch, setTableSearch] = useState("");
  const [topSearch, setTopSearch] = useState("");
  const [emailBannerDismissed, setEmailBannerDismissed] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [setupCollapsed, setSetupCollapsed] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeMoreCat, setActiveMoreCat] = useState("crm");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCompany, setNewCompany] = useState("HubSpot");
  const [toastMsg, setToastMsg] = useState("");

  const tableSearchRef = useRef(null);

  const profiles = readAccountProfiles();
  const matchedProfile = Object.values(profiles).find(
    (p) => String(p.accountNumber) === String(accountNumber)
  );
  const companyName =
    matchedProfile?.companyName ||
    localStorage.getItem("companyName") ||
    "Alchemize Technologies";

  const activeMoreCategory =
    MORE_MENU_CATEGORIES.find((c) => c.id === activeMoreCat) ||
    MORE_MENU_CATEGORIES[0];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        tableSearchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2400);
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((item) => {
      if (activeTab === "mine" && !item.assignedToMe) return false;
      if (activeTab === "unassigned" && item.owner !== "No owner") return false;
      const q = tableSearch.trim().toLowerCase();
      if (!q) return true;
      return (
        item.fullName.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q)
      );
    });
  }, [contacts, activeTab, tableSearch]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredContacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContacts.map((c) => c.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    const created = {
      id: `c-${Date.now()}`,
      name: newName.trim().length > 20 ? `${newName.trim().slice(0, 19)}...` : newName.trim(),
      fullName: newName.trim(),
      email: newEmail.trim(),
      phone: "--",
      owner: "No owner",
      company: newCompany.trim() || "HubSpot",
      lastActivity: "Just now",
      leadStatus: "New",
      createDate: "Just now",
      assignedToMe: true,
    };
    setContacts((prev) => [created, ...prev]);
    setNewName("");
    setNewEmail("");
    setAddModalOpen(false);
    showToast(`Added ${created.fullName} to Contacts`);
  };

  const handleExport = () => {
    const csvRows = [
      ["Name", "Email", "Phone Number", "Contact owner", "Primary company", "Lead Status"],
      ...filteredContacts.map((c) => [
        c.fullName,
        c.email,
        c.phone,
        c.owner,
        c.company,
        c.leadStatus,
      ]),
    ];
    const blob = new Blob([csvRows.map((r) => r.join(",")).join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hubspot-contacts.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported contacts CSV");
  };

  const handleClone = () => {
    const source =
      contacts.find((c) => selectedIds.includes(c.id)) || filteredContacts[0];
    if (!source) return;
    const cloned = {
      ...source,
      id: `c-clone-${Date.now()}`,
      fullName: `${source.fullName} (Copy)`,
      name: `${source.fullName.slice(0, 13)}...`,
    };
    setContacts((prev) => [cloned, ...prev]);
    showToast(`Cloned ${source.fullName}`);
  };

  return (
    <div className="hs-page">
      {/* Top Bar */}
      <header className="hs-topbar">
        <div className="hs-topbar-left">
          <Link to="/" className="hs-brand-btn" title="Back to HubSpot Accounts">
            <svg className="hs-hubspot-mark" viewBox="0 0 28 28" aria-hidden="true">
              <path
                fill="#ff7a59"
                d="M20.8 9.6V6.3a2.4 2.4 0 0 0 1.4-2.2 2.4 2.4 0 1 0-4.8 0c0 1 .6 1.8 1.4 2.2v3.3a6.5 6.5 0 0 0-3.2 1.5l-8.4-6.5a2.8 2.8 0 0 0 .1-.8 2.8 2.8 0 1 0-2.8 2.8c.6 0 1.1-.2 1.6-.5l8.2 6.4a6.5 6.5 0 0 0-.1 6.2l-2.6 2.6a2.3 2.3 0 0 0-.7-.1 2.4 2.4 0 1 0 2.4 2.4c0-.3-.1-.5-.1-.7l2.5-2.5a6.5 6.5 0 1 0 5.1-10.8Zm-1.1 9.6a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Z"
              />
            </svg>
          </Link>

          <div className="hs-search-box">
            <input
              type="search"
              placeholder="Find in HubSpot"
              value={topSearch}
              onChange={(e) => setTopSearch(e.target.value)}
            />
            <span className="hs-search-lens">⌕</span>
          </div>

          <button type="button" className="hs-top-action">
            <span className="hs-sparkle">✦</span>
            <span>Breeze Assistant</span>
          </button>

          <button type="button" className="hs-top-action">
            <span className="hs-up-ring">↑</span>
            <span>Upgrade</span>
          </button>
        </div>

        <div className="hs-topbar-right">
          <button
            type="button"
            className="hs-top-icon"
            title="Create Contact"
            onClick={() => setAddModalOpen(true)}
          >
            +
          </button>
          <button type="button" className="hs-top-icon" title="Calls">📞</button>
          <button type="button" className="hs-top-icon" title="Marketplace">🏪</button>
          <button type="button" className="hs-top-icon" title="Help">?</button>
          <button type="button" className="hs-top-icon" title="Settings">⚙</button>
          <button type="button" className="hs-top-icon" title="Notifications">🔔</button>
          <button type="button" className="hs-top-icon" title="Assistant">◎</button>

          <span className="hs-top-sep" />

          <Link to="/" className="hs-account-pill" title="Switch HubSpot Account">
            <span className="hs-account-avatar">
              {companyName.charAt(0).toUpperCase()}
            </span>
            <span className="hs-account-name">{companyName}</span>
            <span className="hs-account-caret">▾</span>
          </Link>
        </div>
      </header>

      {/* Main Shell */}
      <div className="hs-shell">
        {/* Dark Left Sidebar */}
        <aside className="hs-rail">
          <div className="hs-rail-scroll">
            <button
              type="button"
              className={`hs-rail-link ${activeNav === "home" ? "is-selected" : ""}`}
              onClick={() => setActiveNav("home")}
            >
              <NavIcon type="home" />
              <span>Home</span>
            </button>

            <div className="hs-rail-divider" />

            <button
              type="button"
              className={`hs-rail-link ${activeNav === "contacts" ? "is-selected" : ""}`}
              onClick={() => setActiveNav("contacts")}
            >
              <NavIcon type="contacts" />
              <span>Contacts</span>
            </button>

            <button
              type="button"
              className={`hs-rail-link ${activeNav === "companies" ? "is-selected" : ""}`}
              onClick={() => setActiveNav("companies")}
            >
              <NavIcon type="companies" />
              <span>Companies</span>
            </button>

            <button
              type="button"
              className={`hs-rail-link ${activeNav === "deals" ? "is-selected" : ""}`}
              onClick={() => setActiveNav("deals")}
            >
              <NavIcon type="deals" />
              <span>Deals</span>
            </button>

            <button
              type="button"
              className={`hs-rail-link ${activeNav === "segments" ? "is-selected" : ""}`}
              onClick={() => setActiveNav("segments")}
            >
              <NavIcon type="segments" />
              <span>Segments</span>
            </button>

            <div className="hs-rail-group">
              <span>⌄</span>
              <span>Marketing</span>
            </div>

            <button
              type="button"
              className={`hs-rail-link ${activeNav === "aeo" ? "is-selected" : ""}`}
              onClick={() => setActiveNav("aeo")}
            >
              <NavIcon type="aeo" />
              <span>AEO</span>
            </button>

            <button
              type="button"
              className={`hs-rail-link ${activeNav === "emails" ? "is-selected" : ""}`}
              onClick={() => setActiveNav("emails")}
            >
              <NavIcon type="email" />
              <span>Marketing Emails</span>
            </button>

            <button
              type="button"
              className={`hs-rail-link ${activeNav === "forms" ? "is-selected" : ""}`}
              onClick={() => setActiveNav("forms")}
            >
              <NavIcon type="forms" />
              <span>Forms</span>
            </button>

            <button
              type="button"
              className={`hs-rail-link ${activeNav === "campaigns" ? "is-selected" : ""}`}
              onClick={() => setActiveNav("campaigns")}
            >
              <NavIcon type="campaigns" />
              <span>Campaigns</span>
              <span className="hs-rail-up-badge">↑</span>
            </button>

            <div className="hs-rail-group">
              <span>⌄</span>
              <span>Content</span>
            </div>

            <button
              type="button"
              className={`hs-rail-link ${activeNav === "pages" ? "is-selected" : ""}`}
              onClick={() => setActiveNav("pages")}
            >
              <NavIcon type="pages" />
              <span>Website Pages</span>
            </button>

            <button
              type="button"
              className={`hs-rail-link ${activeNav === "more" ? "is-selected" : ""}`}
              onClick={() => setMoreOpen((o) => !o)}
            >
              <span className="hs-dots">•••</span>
              <span>More</span>
            </button>
          </div>

          <div className="hs-setup-dock">
            <button
              type="button"
              className="hs-setup-dock-btn"
              onClick={() => setSetupCollapsed((s) => !s)}
              aria-label="Toggle setup card"
            >
              {setupCollapsed ? "⌃" : "⌄"}
            </button>
            {!setupCollapsed && (
              <div className="hs-setup-box">
                <p>Complete your setup and reach your goals faster.</p>
                <button type="button" className="hs-setup-go-btn">
                  <span>◎</span>
                  <span>Continue</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* More Flyout */}
        {moreOpen && (
          <div className="hs-flyout" onMouseLeave={() => setMoreOpen(false)}>
            <div className="hs-flyout-cats">
              {MORE_MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`hs-flyout-cat ${activeMoreCat === cat.id ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveMoreCat(cat.id)}
                  onClick={() => setActiveMoreCat(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span>›</span>
                </button>
              ))}
            </div>
            <div className="hs-flyout-items">
              {activeMoreCategory.items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="hs-flyout-item"
                  onClick={() => {
                    setActiveNav(item.label.toLowerCase());
                    setMoreOpen(false);
                  }}
                >
                  <span>{item.label}</span>
                  {item.pinned && <span>📌</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Contacts Sheet */}
        <main className="hs-contacts-sheet">
          {/* Top Email Sync Banner */}
          {!emailBannerDismissed && (
            <section className="hs-email-banner">
              <div className="hs-email-banner-copy">
                <h2>Connect your email to sync all your contacts and conversations in one place</h2>
                <p>
                  HubSpot uses this connection to organize communication history and enrich profiles with accurate job titles, locations, and more.
                </p>
                <button
                  type="button"
                  className={`hs-gmail-btn ${gmailConnected ? "is-connected" : ""}`}
                  onClick={() => {
                    setGmailConnected((v) => !v);
                    showToast(!gmailConnected ? "Gmail synced with Contacts" : "Gmail disconnected");
                  }}
                >
                  <span className="hs-gmail-m">M</span>
                  <span>{gmailConnected ? "Gmail Connected ✓" : "Connect Gmail"}</span>
                </button>
              </div>
              <button
                type="button"
                className="hs-banner-close"
                aria-label="Dismiss banner"
                onClick={() => setEmailBannerDismissed(true)}
              >
                ✕
              </button>
            </section>
          )}

          {/* Main Contacts Card Container */}
          <section className="hs-contacts-card">
            {/* Title + Actions Header */}
            <div className="hs-contacts-head">
              <div className="hs-contacts-title-wrap">
                <h1>Contacts</h1>
                <span className="hs-title-caret">⌄</span>
              </div>

              <div className="hs-contacts-head-actions">
                <button
                  type="button"
                  className="hs-circle-tool-btn"
                  title="More options"
                  onClick={() => showToast("Table actions ready")}
                >
                  ⋮
                </button>
                <button
                  type="button"
                  className="hs-circle-tool-btn"
                  title="Import / Integrations"
                  onClick={() => showToast("Import wizard opened")}
                >
                  ⑂
                </button>
                <button
                  type="button"
                  className="hs-primary-teal-btn"
                  onClick={() => setAddModalOpen(true)}
                >
                  <span>Add contacts</span>
                  <span>▾</span>
                </button>
              </div>
            </div>

            {/* View Tabs */}
            <div className="hs-view-tabs">
              <button
                type="button"
                className={`hs-view-tab ${activeTab === "all" ? "is-active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                <span>⊞</span>
                <span>All contacts</span>
              </button>
              <button
                type="button"
                className={`hs-view-tab ${activeTab === "mine" ? "is-active" : ""}`}
                onClick={() => setActiveTab("mine")}
              >
                <span>⊞</span>
                <span>My contacts</span>
              </button>
              <button
                type="button"
                className={`hs-view-tab ${activeTab === "unassigned" ? "is-active" : ""}`}
                onClick={() => setActiveTab("unassigned")}
              >
                <span>⊞</span>
                <span>Unassigned contacts</span>
              </button>
              <button
                type="button"
                className="hs-tab-plus"
                title="New saved view"
                onClick={() => showToast("Saved view created")}
              >
                +
              </button>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="hs-filter-toolbar">
              <div className="hs-filter-left">
                <div className="hs-table-search">
                  <span>⌕</span>
                  <input
                    ref={tableSearchRef}
                    type="text"
                    placeholder="Search ( / )"
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="hs-chip-btn is-mint"
                  onClick={() => showToast("Quick filters active")}
                >
                  <span>≡</span>
                  <span>Filter</span>
                </button>

                <button
                  type="button"
                  className="hs-chip-btn"
                  onClick={() => {
                    setContacts((prev) => [...prev].reverse());
                    showToast("Sorted contacts");
                  }}
                >
                  <span>⇅</span>
                  <span>Sort by</span>
                </button>
              </div>

              <div className="hs-filter-right">
                <div className="hs-view-toggle-pair">
                  <button type="button" className="is-active" title="List view">◫</button>
                  <button type="button" title="Board view">▤</button>
                </div>
                <button type="button" className="hs-square-btn" title="Column settings">⚙</button>
                <button type="button" className="hs-square-btn" title="Collapse toolbar">⌃</button>
              </div>
            </div>

            {/* Quick Property Filter Strip */}
            <div className="hs-prop-strip">
              <button type="button" className="hs-prop-item">
                <span>Contact owner</span>
                <span>▾</span>
              </button>
              <button type="button" className="hs-prop-item">
                <span>Create date</span>
                <span>▾</span>
              </button>
              <button type="button" className="hs-prop-item">
                <span>Last activity date</span>
                <span>▾</span>
              </button>
              <button type="button" className="hs-prop-item">
                <span>Lead status</span>
                <span>▾</span>
              </button>

              <span className="hs-prop-divider" />

              <button type="button" className="hs-prop-icon-btn" title="Add filter">+</button>
              <button type="button" className="hs-prop-icon-btn" title="Edit properties">✎</button>

              <button type="button" className="hs-prop-item is-adv">
                <span>≡</span>
                <span>Advanced filters</span>
              </button>
            </div>

            {/* Horizontally Scrollable Data Grid */}
            <div className="hs-grid-wrap">
              <table className="hs-contacts-table">
                <thead>
                  <tr>
                    <th className="hs-col-check">
                      <input
                        type="checkbox"
                        checked={
                          filteredContacts.length > 0 &&
                          selectedIds.length === filteredContacts.length
                        }
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Contact owner</th>
                    <th>Primary company</th>
                    <th>Last Activity Date</th>
                    <th>Lead Status</th>
                    <th>Create Date ↓</th>
                    <th className="hs-col-plus">+</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((person) => {
                    const checked = selectedIds.includes(person.id);
                    return (
                      <tr
                        key={person.id}
                        className={checked ? "is-selected" : ""}
                      >
                        <td className="hs-col-check">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleSelectRow(person.id)}
                          />
                        </td>
                        <td className="hs-cell-name">
                          <span className="hs-row-chev">›</span>
                          <span className="hs-mini-hs">❂</span>
                          <span className="hs-link-text">{person.name}</span>
                        </td>
                        <td>
                          <span className="hs-link-text">
                            {person.email} <small>↗</small>
                          </span>
                        </td>
                        <td>{person.phone}</td>
                        <td>{person.owner}</td>
                        <td>
                          <span className="hs-company-cell">
                            <span className="hs-mini-hs">❂</span>
                            <span className="hs-link-text">{person.company}</span>
                          </span>
                        </td>
                        <td>{person.lastActivity}</td>
                        <td>{person.leadStatus}</td>
                        <td>{person.createDate}</td>
                        <td />
                      </tr>
                    );
                  })}
                  {filteredContacts.length === 0 && (
                    <tr>
                      <td colSpan={10} className="hs-empty-row">
                        No contacts match your current filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Summary & Action Bar */}
            <div className="hs-bottom-bar">
              <div className="hs-count-pill">
                {filteredContacts.length}{" "}
                {filteredContacts.length === 1 ? "contact" : "contacts"}
              </div>

              <div className="hs-bottom-actions">
                <button
                  type="button"
                  className="hs-ghost-pill"
                  title="Refresh list"
                  onClick={() => showToast("Contacts refreshed")}
                >
                  ↻
                </button>
                <button
                  type="button"
                  className="hs-outline-pill"
                  onClick={handleExport}
                >
                  <span>⤓</span>
                  <span>Export</span>
                </button>
                <button
                  type="button"
                  className="hs-outline-pill"
                  onClick={handleClone}
                >
                  <span>❐</span>
                  <span>Clone</span>
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Add Contact Modal */}
        {addModalOpen && (
          <div className="hs-modal-backdrop" onClick={() => setAddModalOpen(false)}>
            <form
              className="hs-modal-card"
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleAddContact}
            >
              <div className="hs-modal-head">
                <h3>Create contact</h3>
                <button type="button" onClick={() => setAddModalOpen(false)}>
                  ✕
                </button>
              </div>
              <label className="hs-field">
                <span>Full Name</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </label>
              <label className="hs-field">
                <span>Email</span>
                <input
                  type="email"
                  required
                  placeholder="aarav@company.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </label>
              <label className="hs-field">
                <span>Primary Company</span>
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                />
              </label>
              <div className="hs-modal-foot">
                <button
                  type="button"
                  className="hs-outline-pill"
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="hs-primary-teal-btn">
                  Create contact
                </button>
              </div>
            </form>
          </div>
        )}

        {toastMsg && <div className="hs-toast">{toastMsg}</div>}
      </div>
    </div>
  );
}