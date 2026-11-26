import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./dashboard.css";

const menus = {
  Products: ["Marketing Hub", "Sales Hub", "Service Hub", "Content Hub", "Data Hub", "Revenue Hub", "Smart CRM", "Agent Hub"],
  Solutions: ["Marketing teams", "Sales teams", "Service teams", "Small business", "Startups"],
  Resources: ["Blog", "Case studies", "Free tools", "Customer Support", "Local user groups"],
  About: ["About Us", "Careers", "Management Team", "Investor Relations", "Contact Us"],
  English: ["English", "Deutsch", "Español", "Français", "日本語", "Português"],
};

const I = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} />
);
const GlobeIcon = () => <I><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></I>;
const SupportIcon = () => <I><path d="M4 5h16v11H11l-5 4v-4H4z" /></I>;
const PersonIcon = () => <I><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-4 3-6 7-6s7 2 7 6" /></I>;
const SearchIcon = () => <I width="20" height="20"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></I>;

function Dropdown({ name, icon, open, setOpen, align }) {
  const isOpen = open === name;
  const toSlug = (item) => `/${item.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  const linkFor = (item) => {
    if (item === "About Us") return "/About";
    if (item === "Contact Us") return "/contact";
    if (item === "Customer Support") return "/customer-support";
    if (item === "Pricing") return "/pricing";
    return toSlug(item);
  };
  return (
    <div className="dd">
      <button className="dd-btn" aria-expanded={isOpen} aria-haspopup="true" onClick={() => setOpen(isOpen ? null : name)}>
        {icon}
        {name}
        <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {isOpen && (
        <ul className={"dd-menu" + (align === "right" ? " right" : "")}>
          {menus[name].map((item) => (
            <li key={item}>
              <Link to={linkFor(item)} onClick={() => setOpen(null)}>{item}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const Sprocket = () => (
  <svg width="32" height="36" viewBox="0 0 34 38" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" aria-label="HubSpot">
    <circle cx="22" cy="23" r="6.4" />
    <path d="M22 16.5V8M17 19L8.5 12.5M16.5 27L8.5 32" />
    <circle cx="22" cy="5" r="3" fill="currentColor" stroke="none" />
    <circle cx="6" cy="11" r="3" fill="currentColor" stroke="none" />
    <circle cx="6" cy="33.5" r="3" fill="currentColor" stroke="none" />
  </svg>
);

export default function Navbar({ hideOnScroll = false, hideUtility = false, compact = false }) {
  const [open, setOpen] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 110);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("hc", highContrast);
  }, [highContrast]);

  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") setOpen(null);
      if (event.type === "click" && !event.target.closest(".dd")) setOpen(null);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("click", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("click", close);
    };
  }, []);

  return (
    <>
      {!hideUtility && <div className="util">
        <div className="wrap">
          <div className="util-left">
            <Dropdown name="English" icon={<GlobeIcon />} open={open} setOpen={setOpen} />
            <label className="hc-toggle">
              <input type="checkbox" role="switch" checked={highContrast} onChange={(event) => setHighContrast(event.target.checked)} />
              <span className="switch" aria-hidden="true" />
              High Contrast
            </label>
            <Link className="util-link" to="/customer-support"><SupportIcon />Customer Support</Link>
            <Link className="util-link" to="/contact"><PersonIcon />Contact Sales</Link>
          </div>
          <div className="util-right">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen((value) => !value)}><SearchIcon /></button>
            <Link to="/login">Log in</Link>
            <Dropdown name="About" open={open} setOpen={setOpen} align="right" />
          </div>
        </div>
        {searchOpen && (
          <div className="wrap search-row">
            <input type="search" placeholder="Search HubSpot" aria-label="Search HubSpot" autoFocus />
          </div>
        )}
      </div>}

      <header className={`nav${hideOnScroll && scrolled ? " nav-hidden" : ""}${compact ? " nav-compact" : ""}`}>
        <div className="wrap">
          <Link className={"logo" + (scrolled ? " mark" : "")} to="/dashboard" aria-label="HubSpot">
            {scrolled ? <Sprocket /> : <>Hub<b>Spot</b></>}
          </Link>
          <nav className={"nav-links" + (menuOpen ? " open" : "")} aria-label="Main">
            <Dropdown name="Products" open={open} setOpen={setOpen} />
            <Dropdown name="Solutions" open={open} setOpen={setOpen} />
            <Link className="plain" to="/pricing">Pricing</Link>
            <Dropdown name="Resources" open={open} setOpen={setOpen} />
          </nav>
          <div className="nav-cta">
            {!compact && <Link className="btn" to="/contact">Get a demo</Link>}
            <Link className="btn ghost" to="/signup">{compact ? "Get started" : "Get started free"}</Link>
          </div>
          <button className="menu-btn" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>
    </>
  );
}
