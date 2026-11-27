import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readAccountProfiles } from "./accountStorage";
import AccountContact from "./AccountContact";
import Companies from "./companies";
import Deals from "./Deals";
import Segments from "./Segments";
import AEO from "./AEO";
import MarketingEmails from "./Marketingemails";
import "./AccountsDashboard.css";

const START_GUIDES = [
  {
    id: "marketing",
    label: "Marketing Guide",
    title: "Your Marketing tools progress",
    baseProgress: 40,
    aiTip: "Connecting your sending domain boosts email open rates by up to 28%.",
    tasks: [
      {
        id: "mkt-1",
        title: "Connect your email sending domain",
        desc: "Authenticate your domain to improve deliverability and inbox placement",
        progress: 65,
        time: "About 6 minutes left",
      },
      {
        id: "mkt-2",
        title: "Create your first lead capture form",
        desc: "Embed a high-converting form on your website to auto-sync contacts",
        progress: 15,
        time: "About 4 minutes left",
      },
    ],
  },
  {
    id: "sales",
    label: "Sales Guide",
    title: "Your Sales tools progress",
    baseProgress: 25,
    aiTip: "Teams with customized deal stages close deals 18% faster on average.",
    tasks: [
      {
        id: "sls-1",
        title: "Customize your deal pipeline",
        desc: "Set up stages that match your sales process and forecast revenue",
        progress: 40,
        time: "About 8 minutes left",
      },
    ],
  },
  {
    id: "service",
    label: "Customer Service Guide",
    title: "Your Customer Service tools progress",
    baseProgress: 18,
    aiTip: "Import your existing contacts first so Breeze AI can auto-tag support tickets.",
    tasks: [
      {
        id: "srv-1",
        title: "Set up the basics",
        desc: "Import your contacts, invite teammates, and understand HubSpot properties",
        progress: 28,
        time: "About 11 minutes left",
      },
      {
        id: "srv-2",
        title: "Connect a shared support inbox",
        desc: "Route customer emails directly into your team ticketing queue",
        progress: 10,
        time: "About 5 minutes left",
      },
    ],
  },
  {
    id: "content",
    label: "Content Guide",
    title: "Your Content tools progress",
    baseProgress: 10,
    aiTip: "Start with a pre-built starter theme to publish your landing page in under 10 mins.",
    tasks: [
      {
        id: "cnt-1",
        title: "Create your first website page",
        desc: "Launch a responsive page using drag-and-drop themes and modules",
        progress: 15,
        time: "About 9 minutes left",
      },
    ],
  },
  {
    id: "revenue",
    label: "Revenue Guide",
    title: "Your Revenue tools progress",
    baseProgress: 0,
    aiTip: "Enable payment links to collect one-time or recurring payments without code.",
    tasks: [
      {
        id: "rev-1",
        title: "Configure billing and quotes",
        desc: "Set up recurring billing items and shareable payment links",
        progress: 0,
        time: "About 10 minutes left",
      },
    ],
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
    id: "revenue",
    label: "Revenue",
    items: [
      { label: "Invoices", pinned: false },
      { label: "Payment Links", pinned: false },
      { label: "Quotes", pinned: false },
    ],
  },
  {
    id: "service",
    label: "Service",
    items: [
      { label: "Help Desk", pinned: false },
      { label: "Tickets", pinned: false },
      { label: "Knowledge Base", pinned: false },
    ],
  },
  {
    id: "data",
    label: "Data Management",
    items: [
      { label: "Data Model", pinned: false },
      { label: "Integrations", pinned: false },
      { label: "Custom Events", pinned: false },
    ],
  },
  {
    id: "agents",
    label: "Agents",
    items: [
      { label: "Breeze Studio", pinned: false },
      { label: "Customer Agent", pinned: false },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    items: [
      { label: "Workflows", pinned: true },
      { label: "Chatflows", pinned: false },
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
  {
    id: "development",
    label: "Development",
    items: [
      { label: "Apps", pinned: false },
      { label: "Sandboxes", pinned: false },
    ],
  },
];

function NavIcon({ type }) {
  switch (type) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <path
            d="M3.5 10.5 12 3.5l8.5 7V19.5a1.5 1.5 0 0 1-1.5 1.5H14.5v-5.5h-5V21H5a1.5 1.5 0 0 1-1.5-1.5v-9Z"
            className="hs-ico-fill"
          />
          <path d="M3.5 10.5 12 3.5l8.5 7V19.5a1.5 1.5 0 0 1-1.5 1.5H14.5v-5.5h-5V21H5a1.5 1.5 0 0 1-1.5-1.5v-9Z" />
        </svg>
      );
    case "contacts":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="4" y="3" width="16" height="18" rx="3" className="hs-ico-fill" />
          <rect x="4" y="3" width="16" height="18" rx="3" />
          <circle cx="12" cy="9.2" r="2.6" />
          <path d="M7.8 17c.9-2.1 2.3-3.1 4.2-3.1s3.3 1 4.2 3.1" />
        </svg>
      );
    case "companies":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="3.5" y="3.5" width="10.5" height="17" rx="2" className="hs-ico-fill" />
          <rect x="3.5" y="3.5" width="10.5" height="17" rx="2" />
          <path d="M14 9.5h5a1.5 1.5 0 0 1 1.5 1.5v9.5H14M7.5 7.5h2.5M7.5 11.5h2.5M7.5 15.5h2.5" />
        </svg>
      );
    case "deals":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <circle cx="12" cy="12" r="8.5" className="hs-ico-fill" />
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v10M14.6 9.6c0-1.1-1.1-1.9-2.6-1.9s-2.6.8-2.6 1.9 1.1 1.6 2.6 2 2.6.9 2.6 2.1-1.1 1.9-2.6 1.9-2.6-.8-2.6-1.9" />
        </svg>
      );
    case "segments":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="4" y="4" width="16" height="16" rx="3" className="hs-ico-fill" />
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M8 8.8h8M8 12.2h5.5M8 15.6h3.5" />
          <circle cx="16.5" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "aeo":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <path d="M4.5 13.5V9.2l11-4.2v12.5l-11-4Z" className="hs-ico-fill" />
          <path d="M4.5 13.5V9.2l11-4.2v12.5l-11-4Z" />
          <path d="M18.2 8.5a4.2 4.2 0 0 1 0 5.5M7.2 14.6l1.4 4.6" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="3" y="5" width="18" height="14" rx="2.5" className="hs-ico-fill" />
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m3.8 6.8 8.2 5.8 8.2-5.8" />
        </svg>
      );
    case "forms":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="4.5" y="3" width="15" height="18" rx="2.5" className="hs-ico-fill" />
          <rect x="4.5" y="3" width="15" height="18" rx="2.5" />
          <path d="M8 8h8M8 12h8M8 16h4.5" />
          <circle cx="15.5" cy="16" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "campaigns":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <circle cx="12" cy="12" r="8.5" className="hs-ico-fill" />
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "pages":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="3" y="4" width="18" height="16" rx="2.5" className="hs-ico-fill" />
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M3 9h18M8.5 4v5" />
        </svg>
      );
    case "blog":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <path d="M5 4h10.5L19 7.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5.5A1.5 1.5 0 0 1 5 4Z" className="hs-ico-fill" />
          <path d="M5 4h10.5L19 7.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5.5A1.5 1.5 0 0 1 5 4Z" />
          <path d="M7.5 10h7.5M7.5 13.8h7.5M7.5 17.5h4.5" />
        </svg>
      );
    case "dashboards":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="3.5" y="3.5" width="7" height="8" rx="1.8" className="hs-ico-fill" />
          <rect x="3.5" y="3.5" width="7" height="8" rx="1.8" />
          <rect x="13.5" y="3.5" width="7" height="5" rx="1.8" />
          <rect x="13.5" y="11.5" width="7" height="9" rx="1.8" className="hs-ico-fill" />
          <rect x="13.5" y="11.5" width="7" height="9" rx="1.8" />
          <rect x="3.5" y="14.5" width="7" height="6" rx="1.8" />
        </svg>
      );
    case "workflows":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <rect x="8.8" y="3" width="6.4" height="4.4" rx="1.3" className="hs-ico-fill" />
          <rect x="8.8" y="3" width="6.4" height="4.4" rx="1.3" />
          <rect x="3" y="16.6" width="6.2" height="4.4" rx="1.3" />
          <rect x="14.8" y="16.6" width="6.2" height="4.4" rx="1.3" />
          <path d="M12 7.4v4.6M6.1 16.6v-2.6a2 2 0 0 1 2-2h7.8a2 2 0 0 1 2 2v2.6" />
        </svg>
      );
    case "plus":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <path d="M6.5 4h3.2l1.4 3.8-2.1 1.6a13.5 13.5 0 0 0 5.6 5.6l1.6-2.1L20 14.3v3.2a1.8 1.8 0 0 1-2 1.8A14.5 14.5 0 0 1 4.7 6 1.8 1.8 0 0 1 6.5 4Z" />
        </svg>
      );
    case "store":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <path d="M4 9.5 5.5 4.5h13L20 9.5a2.5 2.5 0 0 1-4 2 2.5 2.5 0 0 1-4 0 2.5 2.5 0 0 1-4 0 2.5 2.5 0 0 1-4-2Z" />
          <path d="M5.5 12v7.5h13V12M10 19.5v-4.5h4v4.5" />
        </svg>
      );
    case "help":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.8c0 1.7-2.4 2.1-2.4 3.6" />
          <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "settings":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h.1a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.5 1Z" />
        </svg>
      );
    case "bell":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <path d="M6.5 16.5h11l-1.2-2.2V10a4.3 4.3 0 1 0-8.6 0v4.3l-1.2 2.2Z" />
          <path d="M10 19a2.2 2.2 0 0 0 4 0" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <path
            d="M12 3.5 14 9l5.5 2-5.5 2-2 5.5-2-5.5L4.5 11 10 9l2-5.5Z"
            fill="currentColor"
            stroke="none"
          />
          <circle cx="18.5" cy="5.5" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico hs-ico-lg">
          <path
            d="M13.2 2.8 5.5 13.5h5.8l-1 7.7 8.2-10.7h-5.8l.5-7.7Z"
            fill="#ffb703"
            stroke="#e85d04"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <path
            d="M12 20.2s-7-4.4-8.8-8.8C1.9 8.2 4.2 5 7.5 5c1.9 0 3.5 1 4.5 2.4C13 6 14.6 5 16.5 5c3.3 0 5.6 3.2 4.3 6.4-1.8 4.4-8.8 8.8-8.8 8.8Z"
            fill="#ff6b57"
            stroke="#ff6b57"
          />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico">
          <circle cx="9.5" cy="8.5" r="3" />
          <path d="M4 18.5c.8-2.6 2.8-4 5.5-4s4.7 1.4 5.5 4" />
          <path d="M16.5 6.5a2.5 2.5 0 0 1 0 4.8M18.5 14.8c1.6.5 2.7 1.7 3.2 3.7" />
        </svg>
      );
    case "pin":
      return (
        <svg viewBox="0 0 24 24" className="hs-ico hs-ico-sm">
          <path
            d="M14.5 4.5 19.5 9.5l-2 2-1.8-.6-3.7 3.7.6 2.4-1.5 1.5-3.3-3.3-3.8 3.8-.8-.8 3.8-3.8-3.3-3.3 1.5-1.5 2.4.6 3.7-3.7-.6-1.8 2-2Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function WorkspaceDashboard() {
  const { accountNumber } = useParams();
  const [activeGuideId, setActiveGuideId] = useState("service");
  const [activeNav, setActiveNav] = useState("home");
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeMoreCat, setActiveMoreCat] = useState("crm");
  const [setupCollapsed, setSetupCollapsed] = useState(false);
  const [sidebarCompact, setSidebarCompact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [connectedApps, setConnectedApps] = useState({ gmail: true });
  const [breezeOpen, setBreezeOpen] = useState(false);

  const searchInputRef = useRef(null);
  const railScrollRef = useRef(null);
  const crmRef = useRef(null);
  const mktRef = useRef(null);
  const contentRef = useRef(null);
  const platformRef = useRef(null);

  const [scrollState, setScrollState] = useState({
    canScrollUp: false,
    canScrollDown: true,
    activeSection: "crm",
  });

  const profiles = readAccountProfiles();
  const matchedProfile = Object.values(profiles).find(
    (p) => String(p.accountNumber) === String(accountNumber)
  );
  const companyName =
    matchedProfile?.companyName ||
    localStorage.getItem("companyName") ||
    "Alchemize Technologies";

  const activeGuide =
    START_GUIDES.find((g) => g.id === activeGuideId) || START_GUIDES[2];

  const activeMoreCategory =
    MORE_MENU_CATEGORIES.find((c) => c.id === activeMoreCat) ||
    MORE_MENU_CATEGORIES[0];

  const currentGuideProgress = useMemo(() => {
    const total = activeGuide.tasks.length;
    if (!total) return activeGuide.baseProgress;
    const completedCount = activeGuide.tasks.filter(
      (t) => checkedTasks[t.id]
    ).length;
    if (completedCount === total) return 100;
    const gain = Math.round(
      ((100 - activeGuide.baseProgress) * completedCount) / total
    );
    return Math.min(100, activeGuide.baseProgress + gain);
  }, [activeGuide, checkedTasks]);

  const overallSetupPct = useMemo(() => {
    const allTasks = START_GUIDES.flatMap((g) => g.tasks);
    const done = allTasks.filter((t) => checkedTasks[t.id]).length;
    return Math.min(100, 22 + Math.round((done / allTasks.length) * 78));
  }, [checkedTasks]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const results = [];

    START_GUIDES.forEach((g) => {
      if (g.label.toLowerCase().includes(q)) {
        results.push({
          type: "Guide",
          label: g.label,
          action: () => setActiveGuideId(g.id),
        });
      }
      g.tasks.forEach((t) => {
        if (t.title.toLowerCase().includes(q)) {
          results.push({
            type: "Task",
            label: t.title,
            action: () => setActiveGuideId(g.id),
          });
        }
      });
    });

    MORE_MENU_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.label.toLowerCase().includes(q)) {
          results.push({
            type: cat.label,
            label: item.label,
            action: () => {
              setActiveNav(item.label.toLowerCase());
            },
          });
        }
      });
    });

    return results.slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape") {
        setSearchFocused(false);
        setBreezeOpen(false);
        setMoreOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleRailScroll = () => {
    const el = railScrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = Math.max(1, scrollHeight - clientHeight);
    const ratio = scrollTop / maxScroll;

    let section = "crm";
    if (ratio > 0.72) section = "platform";
    else if (ratio > 0.42) section = "content";
    else if (ratio > 0.16) section = "marketing";

    setScrollState({
      canScrollUp: scrollTop > 10,
      canScrollDown: scrollTop + clientHeight < scrollHeight - 10,
      activeSection: section,
    });
  };

  useEffect(() => {
    handleRailScroll();
  }, [setupCollapsed, sidebarCompact]);

  const scrollRailTo = (direction) => {
    const el = railScrollRef.current;
    if (!el) return;
    el.scrollTo({
      top: direction === "down" ? el.scrollHeight : 0,
      behavior: "smooth",
    });
  };

  const jumpToSection = (ref) => {
    const container = railScrollRef.current;
    const target = ref.current;
    if (!container || !target) return;
    container.scrollTo({
      top: target.offsetTop - 8,
      behavior: "smooth",
    });
  };

  const toggleTask = (taskId) => {
    setCheckedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const toggleAppConnect = (appKey) => {
    setConnectedApps((prev) => ({ ...prev, [appKey]: !prev[appKey] }));
  };

  if (activeNav === "contacts") {
  return <AccountContact onBack={() => setActiveNav("home")} />;
}
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

          <div className="hs-search-wrap">
            <div className={`hs-search-box ${searchFocused ? "is-focused" : ""}`}>
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Find in HubSpot"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 160)}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {!searchQuery && <kbd className="hs-kbd-hint">⌘K</kbd>}
              <svg viewBox="0 0 24 24" className="hs-search-lens" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4.5 4.5" />
              </svg>
            </div>

            {searchFocused && searchQuery.trim() && (
              <div className="hs-search-dropdown">
                {searchResults.length > 0 ? (
                  searchResults.map((item, idx) => (
                    <button
                      key={`${item.label}-${idx}`}
                      type="button"
                      className="hs-search-hit"
                      onMouseDown={() => {
                        item.action();
                        setSearchQuery("");
                        setSearchFocused(false);
                      }}
                    >
                      <span className="hs-hit-badge">{item.type}</span>
                      <span>{item.label}</span>
                    </button>
                  ))
                ) : (
                  <div className="hs-search-empty">No matches for "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="hs-top-action"
            onClick={() => setBreezeOpen(true)}
          >
            <span className="hs-sparkle">
              <NavIcon type="spark" />
            </span>
            <span>Breeze Assistant</span>
          </button>

          <button type="button" className="hs-top-action">
            <span className="hs-up-ring">↑</span>
            <span>Upgrade</span>
          </button>
        </div>

        <div className="hs-topbar-right">
          <button type="button" className="hs-top-icon" title="Create">
            <NavIcon type="plus" />
          </button>
          <button type="button" className="hs-top-icon" title="Calls">
            <NavIcon type="phone" />
          </button>
          <button type="button" className="hs-top-icon" title="Marketplace">
            <NavIcon type="store" />
          </button>
          <button type="button" className="hs-top-icon" title="Help">
            <NavIcon type="help" />
          </button>
          <button type="button" className="hs-top-icon" title="Settings">
            <NavIcon type="settings" />
          </button>
          <button type="button" className="hs-top-icon hs-has-dot" title="Notifications">
            <NavIcon type="bell" />
            <span className="hs-notif-dot" />
          </button>

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

      {/* Main Layout */}
      <div className="hs-shell">
        {/* Left Sidebar */}
        <aside className={`hs-rail ${sidebarCompact ? "is-compact" : ""}`}>
          <div className="hs-rail-viewport">
            <button
              type="button"
              className={`hs-scroll-arrow-btn is-up ${scrollState.canScrollUp ? "is-visible" : ""}`}
              onClick={() => scrollRailTo("up")}
              aria-label="Scroll sidebar up"
              title="Scroll up"
            >
              ⌃
            </button>

            {!sidebarCompact && (
              <div className="hs-rail-minimap" aria-label="Jump to section">
                {[
                  { id: "crm", label: "CRM", ref: crmRef },
                  { id: "marketing", label: "Marketing", ref: mktRef },
                  { id: "content", label: "Content", ref: contentRef },
                  { id: "platform", label: "Platform", ref: platformRef },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    className={`hs-minimap-dot ${scrollState.activeSection === sec.id ? "is-active" : ""}`}
                    onClick={() => jumpToSection(sec.ref)}
                    title={sec.label}
                  >
                    <span className="hs-minimap-tooltip">{sec.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div
              ref={railScrollRef}
              className="hs-rail-scroll-area"
              onScroll={handleRailScroll}
            >
              <div ref={crmRef} />
              <button
                type="button"
                className={`hs-rail-link ${activeNav === "home" ? "is-selected" : ""}`}
                onClick={() => setActiveNav("home")}
              >
                <span className="hs-ico-box">
                  <NavIcon type="home" />
                </span>
                <span>Home</span>
              </button>

              <div className="hs-rail-divider" />

              <button
  type="button"
  className={`hs-rail-link ${activeNav === "contacts" ? "is-selected" : ""}`}
  onClick={() => setActiveNav("contacts")}
>
  <span className="hs-ico-box">
    <NavIcon type="contacts" />
  </span>
  <span>Contacts</span>
</button>

              <button
                type="button"
                className={`hs-rail-link ${
                  activeNav === "companies" ? "is-selected" : ""
                }`}
                onClick={() => setActiveNav("companies")}
              >
                <span className="hs-ico-box">
                  <NavIcon type="companies" />
                </span>
                <span>Companies</span>
              </button>

              <button
                type="button"
                className={`hs-rail-link ${activeNav === "deals" ? "is-selected" : ""}`}
                onClick={() => setActiveNav("deals")}
              >
                <span className="hs-ico-box">
                  <NavIcon type="deals" />
                </span>
                <span>Deals</span>
              </button>

              <button
                type="button"
                className={`hs-rail-link ${activeNav === "segments" ? "is-selected" : ""}`}
                onClick={() => setActiveNav("segments")}
              >
                <span className="hs-ico-box">
                  <NavIcon type="segments" />
                </span>
                <span>Segments</span>
              </button>

              <div ref={mktRef} className="hs-rail-group">
                <span className="hs-chev">⌄</span>
                <span>Marketing</span>
              </div>

              <button
                type="button"
                className={`hs-rail-link ${activeNav === "aeo" ? "is-selected" : ""}`}
                onClick={() => setActiveNav("aeo")}
              >
                <span className="hs-ico-box">
                  <NavIcon type="aeo" />
                </span>
                <span>AEO</span>
              </button>

              <button
                type="button"
                className={`hs-rail-link ${activeNav === "emails" ? "is-selected" : ""}`}
                onClick={() => setActiveNav("emails")}
              >
                <span className="hs-ico-box">
                  <NavIcon type="email" />
                </span>
                <span>Marketing Emails</span>
              </button>

              <button
                type="button"
                className={`hs-rail-link ${activeNav === "forms" ? "is-selected" : ""}`}
                onClick={() => setActiveNav("forms")}
              >
                <span className="hs-ico-box">
                  <NavIcon type="forms" />
                </span>
                <span>Forms</span>
              </button>

              <button
                type="button"
                className={`hs-rail-link ${activeNav === "campaigns" ? "is-selected" : ""}`}
                onClick={() => setActiveNav("campaigns")}
              >
                <span className="hs-ico-box">
                  <NavIcon type="campaigns" />
                </span>
                <span>Campaigns</span>
                <span className="hs-rail-up-badge">↑</span>
              </button>

              <div ref={contentRef} className="hs-rail-group">
                <span className="hs-chev">⌄</span>
                <span>Content</span>
              </div>

              <button
                type="button"
                className={`hs-rail-link ${activeNav === "pages" ? "is-selected" : ""}`}
                onClick={() => setActiveNav("pages")}
              >
                <span className="hs-ico-box">
                  <NavIcon type="pages" />
                </span>
                <span>Website Pages</span>
              </button>

              <button
                type="button"
                className={`hs-rail-link ${activeNav === "blog" ? "is-selected" : ""}`}
                onClick={() => setActiveNav("blog")}
              >
                <span className="hs-ico-box">
                  <NavIcon type="blog" />
                </span>
                <span>Blog</span>
              </button>

              <div ref={platformRef} className="hs-rail-group">
                <span className="hs-chev">⌄</span>
                <span>Platform</span>
              </div>

              <button
                type="button"
                className={`hs-rail-link ${activeNav === "dashboards" ? "is-selected" : ""}`}
                onClick={() => setActiveNav("dashboards")}
              >
                <span className="hs-ico-box">
                  <NavIcon type="dashboards" />
                </span>
                <span>Dashboards</span>
              </button>

              <button
                type="button"
                className={`hs-rail-link ${activeNav === "workflows" ? "is-selected" : ""}`}
                onClick={() => setActiveNav("workflows")}
              >
                <span className="hs-ico-box">
                  <NavIcon type="workflows" />
                </span>
                <span>Workflows</span>
                <span className="hs-rail-up-badge">↑</span>
              </button>

              <button
                type="button"
                className={`hs-rail-link hs-more-trigger ${moreOpen ? "is-open" : ""}`}
                onClick={() => setMoreOpen((o) => !o)}
              >
                <span className="hs-ico-box">
                  <span className="hs-dots">•••</span>
                </span>
                <span>More</span>
                <span className="hs-right-chev">›</span>
              </button>

              <div className="hs-starter-box">
                <button type="button" className="hs-starter-btn">
                  Upgrade to Starter
                </button>
              </div>

              <div className="hs-rail-tools">
                <button type="button" title="Edit navigation">✎</button>
                <button
                  type="button"
                  title="Toggle sidebar width"
                  onClick={() => setSidebarCompact((c) => !c)}
                >
                  ◫
                </button>
              </div>
            </div>

            <button
              type="button"
              className={`hs-scroll-arrow-btn is-down ${scrollState.canScrollDown ? "is-visible" : ""}`}
              onClick={() => scrollRailTo("down")}
              aria-label="Scroll sidebar down"
              title="Scroll down"
            >
              ⌄
            </button>
          </div>

          <div className="hs-setup-dock">
            <button
              type="button"
              className="hs-setup-dock-btn"
              onClick={() => setSetupCollapsed((s) => !s)}
              aria-label="Toggle setup card"
            >
              {setupCollapsed ? `⌃ Setup ${overallSetupPct}%` : "⌄"}
            </button>
            {!setupCollapsed && (
              <div className="hs-setup-box">
                <div className="hs-setup-mini-head">
                  <span className="hs-setup-pill">{overallSetupPct}% Ready</span>
                </div>
                <p>Complete your setup and reach your goals faster.</p>
                <button
                  type="button"
                  className="hs-setup-go-btn"
                  onClick={() => setBreezeOpen(true)}
                >
                  <span className="hs-go-icon">◎</span>
                  <span>Continue</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Flyout Menu for "More" */}
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
                  {item.pinned && (
                    <span className="hs-pin-mark">
                      <NavIcon type="pin" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Light Sheet */}
        <main className="hs-sheet">
          {activeNav === "companies" ? (
            <Companies />
          ) : activeNav === "deals" ? (
            <Deals />
          ) : activeNav === "aeo" ? (
            <AEO />
          ) : activeNav === "emails" ? (
            <MarketingEmails />
          ) : activeNav === "segments" ? (
            <Segments />
          ) : (
            <>
          <div className="hs-sheet-banner">
            <div>
              <span className="hs-banner-eyebrow">WORKSPACE OVERVIEW</span>
              <h1 className="hs-banner-title">{companyName}</h1>
            </div>
            <div className="hs-banner-badges">
              {accountNumber && (
                <span className="hs-meta-chip">Account #{accountNumber}</span>
              )}
              <span className="hs-meta-chip is-accent">{activeGuide.label}</span>
            </div>
          </div>

          <div className="hs-sheet-grid">
            {/* Start Guides Sidebar Card */}
            <section className="hs-panel hs-guides-panel">
              <h2>Start Guides</h2>

              <div className="hs-guides-nav">
                {START_GUIDES.map((guide) => {
                  const isDone = guide.tasks.every((t) => checkedTasks[t.id]);
                  return (
                    <button
                      key={guide.id}
                      type="button"
                      className={`hs-guide-item ${activeGuideId === guide.id ? "is-active" : ""}`}
                      onClick={() => setActiveGuideId(guide.id)}
                    >
                      <span>{guide.label}</span>
                      {isDone && <span className="hs-guide-done-dot">✓</span>}
                    </button>
                  );
                })}
              </div>

              <hr className="hs-panel-hr" />

              <div className="hs-panel-actions">
                <button type="button" className="hs-panel-link">
                  <NavIcon type="dashboards" />
                  <span>View your plan</span>
                </button>
                <button type="button" className="hs-panel-link">
                  <NavIcon type="users" />
                  <span>Invite your team</span>
                  <span className="hs-info-circle">i</span>
                </button>
              </div>

              <div className="hs-connect-block">
                <h3>Ready to connect:</h3>
                <div className="hs-connect-row">
                  <button
                    type="button"
                    className={`hs-connect-btn ${connectedApps.gmail ? "is-connected" : ""}`}
                    title={connectedApps.gmail ? "Gmail Connected" : "Connect Gmail"}
                    onClick={() => toggleAppConnect("gmail")}
                  >
                    <svg viewBox="0 0 24 24" className="hs-brand-mini">
                      <path fill="#EA4335" d="M4 7.5 12 13l8-5.5V18a1 1 0 0 1-1 1h-2.5v-7.2L12 15l-4.5-3.2V19H5a1 1 0 0 1-1-1V7.5Z" />
                      <path fill="#C5221F" d="M4 7.5A1.5 1.5 0 0 1 6.4 6.3L12 10.2l5.6-3.9A1.5 1.5 0 0 1 20 7.5L12 13 4 7.5Z" />
                    </svg>
                    {connectedApps.gmail && <span className="hs-conn-badge">✓</span>}
                  </button>
                  <button
                    type="button"
                    className={`hs-connect-btn ${connectedApps.calendar ? "is-connected" : ""}`}
                    title={connectedApps.calendar ? "Calendar Connected" : "Connect Calendar"}
                    onClick={() => toggleAppConnect("calendar")}
                  >
                    <svg viewBox="0 0 24 24" className="hs-brand-mini">
                      <rect x="4" y="5" width="16" height="15" rx="2.5" fill="#E8F0FE" stroke="#1A73E8" strokeWidth="1.6" />
                      <path d="M4 9.5h16M8.5 3.5v3M15.5 3.5v3" stroke="#1A73E8" strokeWidth="1.6" strokeLinecap="round" />
                      <text x="12" y="16.8" textAnchor="middle" fill="#1A73E8" fontSize="7.5" fontWeight="800">31</text>
                    </svg>
                    {connectedApps.calendar && <span className="hs-conn-badge">✓</span>}
                  </button>
                  <button
                    type="button"
                    className={`hs-connect-btn ${connectedApps.outlook ? "is-connected" : ""}`}
                    title={connectedApps.outlook ? "Outlook Connected" : "Connect Outlook"}
                    onClick={() => toggleAppConnect("outlook")}
                  >
                    <svg viewBox="0 0 24 24" className="hs-brand-mini">
                      <rect x="4" y="5" width="16" height="14" rx="2.5" fill="#E6F2FB" stroke="#0078D4" strokeWidth="1.6" />
                      <circle cx="12" cy="12" r="3.4" fill="none" stroke="#0078D4" strokeWidth="1.8" />
                    </svg>
                    {connectedApps.outlook && <span className="hs-conn-badge">✓</span>}
                  </button>
                  <button type="button" className="hs-connect-btn" title="More integrations">
                    <NavIcon type="plus" />
                  </button>
                </div>
              </div>
            </section>

            {/* Right Stack */}
            <div className="hs-stack">
              {/* Progress Card */}
              <section className="hs-panel hs-progress-panel">
                <div className="hs-progress-head">
                  <NavIcon type="heart" />
                  <h3>{activeGuide.title}</h3>
                  {currentGuideProgress === 100 && (
                    <span className="hs-complete-pill">All tasks done!</span>
                  )}
                </div>
                <div className="hs-progress-meter">
                  <div className="hs-meter-track">
                    <div
                      className="hs-meter-fill"
                      style={{ width: `${currentGuideProgress}%` }}
                    />
                  </div>
                  <span className="hs-meter-label">{currentGuideProgress}%</span>
                </div>
              </section>

              {/* AI Setup Card */}
              <section className="hs-panel hs-assistant-panel">
                <div className="hs-assistant-art" aria-hidden="true">
                  <div className="hs-art-badge b1">
                    <Link to="/AccountContact">
                      <NavIcon type="contacts" />
                    </Link>
                  </div>
                  <div className="hs-art-badge b2">✓</div>
                  <div className="hs-art-badge b3">
                    <NavIcon type="deals" />
                  </div>
                  <div className="hs-art-badge b4">
                    <NavIcon type="workflows" />
                  </div>
                </div>
                <div className="hs-assistant-body">
                  <h3>Pick up where you left off</h3>
                  <p>{activeGuide.aiTip}</p>
                  <button
                    type="button"
                    className="hs-gradient-cta"
                    onClick={() => setBreezeOpen(true)}
                  >
                    <NavIcon type="spark" />
                    <span>Continue setup</span>
                  </button>
                </div>
              </section>

              {/* Recommended Card */}
              <section className="hs-panel hs-rec-panel">
                <div className="hs-rec-top">
                  <span className="hs-bolt-badge">
                    <NavIcon type="bolt" />
                  </span>
                  <h3>Recommended: All you need to get started</h3>
                </div>

                {activeGuide.tasks.map((task) => {
                  const done = Boolean(checkedTasks[task.id]);
                  const pct = done ? 100 : task.progress;

                  return (
                    <div
                      key={task.id}
                      className={`hs-step-row ${done ? "is-done" : ""}`}
                      onClick={() => toggleTask(task.id)}
                    >
                      <div className="hs-step-main">
                        <span className={`hs-step-check ${done ? "is-checked" : ""}`}>
                          {done ? "✓" : ""}
                        </span>
                        <div>
                          <h4>{task.title}</h4>
                          <p>{task.desc}</p>
                        </div>
                      </div>

                      <div className="hs-step-meta">
                        <div className="hs-step-bar-wrap">
                          <div className="hs-step-bar">
                            <div
                              className="hs-step-bar-fill"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span>{pct}%</span>
                        </div>
                        <small>{done ? "Completed" : task.time}</small>
                      </div>
                    </div>
                  );
                })}
              </section>
            </div>
          </div>
            </>
          )}
        </main>

        {/* Breeze AI Setup Slide-Over Drawer */}
        {breezeOpen && (
          <aside className="hs-breeze-drawer" aria-label="Breeze AI Assistant">
            <div className="hs-breeze-head">
              <div>
                <span className="hs-sparkle">
                  <NavIcon type="spark" />
                </span>
                <strong>Breeze Setup Copilot</strong>
              </div>
              <button
                type="button"
                className="hs-breeze-close"
                onClick={() => setBreezeOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="hs-breeze-body">
              <div className="hs-breeze-card">
                <small>ACTIVE FOCUS • {activeGuide.label.toUpperCase()}</small>
                <h4>{activeGuide.title}</h4>
                <p>{activeGuide.aiTip}</p>
              </div>
              <div className="hs-breeze-actions">
                {activeGuide.tasks.map((task) => {
                  const done = Boolean(checkedTasks[task.id]);
                  return (
                    <button
                      key={task.id}
                      type="button"
                      className={`hs-breeze-task-btn ${done ? "is-done" : ""}`}
                      onClick={() => toggleTask(task.id)}
                    >
                      <span>{done ? "✓ Completed:" : "→ Complete:"}</span>
                      <strong>{task.title}</strong>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}