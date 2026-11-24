import { useEffect, useRef, useState } from "react";


import "./dashboard.css";

import card1 from "/images/card1.jpg";
import card2 from "/images/card2.jpg";
import card3 from "/images/card3.jpg";

const menus = {
  Products: ["Marketing Hub", "Sales Hub", "Service Hub", "Content Hub", "Data Hub", "Revenue Hub", "Smart CRM", "Agent Hub"],
  Solutions: ["Marketing teams", "Sales teams", "Service teams", "Small business", "Startups"],
  Resources: ["Blog", "Case studies", "Free tools", "Customer Support", "Local user groups"],
  About: ["About Us", "Careers", "Management Team", "Investor Relations", "Contact Us"],
  English: ["English", "Deutsch", "Español", "Français", "日本語", "Português"],
};
const pills = [
  "Market, sell, and serve with data behind every ask.",
  "Work where you want. HubSpot takes it from there.",
  "Stay in control. Get results you can trust.",
];
const brands = [
  { n: "DoorDash", c: "b-dd" },
  { n: "reddit", c: "b-reddit" },
  { n: "Tripadvisor", c: "b-ta" },
  { n: "eventbrite", c: "b-eb" },
  { n: "ElevenLabs", c: "b-el" },
  { n: "Legora", c: "b-lg" },
  { n: "eBay", c: "b-ebay" },
];

const productIcons = [
  "M13 2L4 14h7l-1 8 9-12h-7z",
  "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
  "M4 5h16v11H11l-5 4v-4H4z",
  "M6 3h9l4 4v14H6zM15 3v4h4",
  "M3 17l6-6 4 4 8-8M15 7h6v6",
  "M5 19l9-9M9 5h10v10M12 12l7-7",
  "M12 4a8 8 0 1 0 8 8M19 5h.01",
  "M12 3l9 9-9 9-9-9zM12 8l4 4-4 4-4-4z",
  "M4 8l8-5 8 5v8l-8 5-8-5zM4 8l8 5 8-5M12 13v8",
  "M5 11a6 6 0 1 0 12 0 6 6 0 1 0-12 0M20 20l-4-4",
];

function BrandName({ b }) {
  if (b.c === "b-ebay")
    return <><span style={{color:"#e53238"}}>e</span><span style={{color:"#0064d2"}}>b</span><span style={{color:"#f5af02"}}>a</span><span style={{color:"#86b817"}}>y</span></>;
  if (b.c === "b-el") return <><span className="bars">||</span>ElevenLabs</>;
  return b.n;
}

function Icon({ d }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ff4800" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
  );
}

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#ff4800" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 8.5l3.5 3.5L13.5 4.5" /></svg>
);
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5" /></svg>
);

function ProductName({ name }) {
  const m = name.match(/^(.*?)([®™])?$/);
  return <>{m[1]}{m[2] && <sup>{m[2]}</sup>}</>;
}


const mockRows = [
  ["Customers gone quiet", "312 accounts"],
  ["Biggest group", "Mid-market"],
  ["Win-back campaign", "Ready to review"],
];

// Card photos live in src/assets (card2 and card3 are low-res; swap in the originals if you have them)
const showcase = [
  { id: "one", img: card1, text: ["Market, sell, and serve with data behind every ask."], mock: true },
  { id: "two", img: card2, text: ["Work where you want.", "HubSpot takes it from there."], desc: "Work in HubSpot or in tools like Claude and ChatGPT. Your customer data comes with you, and your work syncs back." },
  { id: "three", img: card3, text: ["Stay in control.", "Get results you can trust."], desc: "Marketing, sales, and service share one set of customer data, so your teams and AI always know what customers need." },
];

const Sprocket = () => (
  <svg width="32" height="36" viewBox="0 0 34 38" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" aria-label="HubSpot">
    <circle cx="22" cy="23" r="6.4" />
    <path d="M22 16.5V8M17 19L8.5 12.5M16.5 27L8.5 32" />
    <circle cx="22" cy="5" r="3" fill="currentColor" stroke="none" />
    <circle cx="6" cy="11" r="3" fill="currentColor" stroke="none" />
    <circle cx="6" cy="33.5" r="3" fill="currentColor" stroke="none" />
  </svg>
);

const products = [
  ["Marketing Hub®", "Attract and convert the right leads.", "Run campaigns, personalize content, and track it all."],
  ["Sales Hub®", "Generate quality leads and close deals, faster.", "Automate prospecting, manage pipeline, and accelerate revenue growth."],
  ["Service Hub®", "Streamline and scale support to serve customers faster.", "Drive retention with actionable insights, customer health scores, and real-time usage data."],
  ["Content Hub™", "Create content that clicks with your audience.", "Build pages, publish content across channels, and stay on brand."],
  ["Data Hub™", "Turn scattered data into unified intelligence.", "Combine, clean, and activate your customer data across every team and tool."],
  ["Revenue Hub™", "Make it easy for customers to pay you.", "Send quotes, collect payments, and manage subscriptions."],
  ["Smart CRM™", "All your customer data in one place.", "Keep your data clean, connected, and actionable."],
  ["Agent Hub™", "Deploy and manage AI agents across the platform.", "Build new agents tailored to your business, powered by your data."],
  ["Small Business Bundle", "The Starter edition of each product, at one low price.", "Everything a growing team needs to get started."],
  ["AEO (Beta)", "See where your brand shows up in AI results.", "Get recommendations to improve your visibility."],
];


const agentCards = [
  {
    id: "prospecting",
    name: "Prospecting Agent",
    text: "Spot buying signals, source contacts, and launch personalized outreach instantly.",
    type: "prospecting"
  },
  {
    id: "data",
    name: "Data Agent",
    text: "Know which accounts are ready to buy and discover important insights.",
    type: "data"
  },
  {
    id: "customer",
    name: "Customer Agent",
    text: "Resolve customer inquiries and provide personalized customer support.",
    type: "customer"
  },
  {
    id: "sales",
    name: "Sales Agent",
    text: "Automate sales workflows and help your team close more deals.",
    type: "data"
  },
  {
    id: "marketing",
    name: "Marketing Agent",
    text: "Create campaigns, identify audiences and generate better leads.",
    type: "prospecting"
  },
  {
    id: "content",
    name: "Content Agent",
    text: "Create engaging content and manage your brand communication.",
    type: "customer"
  },
  {
    id: "support",
    name: "Support Agent",
    text: "Answer customer questions and resolve support requests faster.",
    type: "customer"
  },
  {
    id: "commerce",
    name: "Commerce Agent",
    text: "Improve customer buying experiences and grow your business.",
    type: "data"
  }
];


const apps = ["Gmail", "Shopify", "Mailchimp", "Zapier", "Google Ads", "Slack"];


const stories = {
  Enterprise: {
    quote:
      "HubSpot took the time to understand our business needs fully. Their pre-sales and subsequent support really stood out from the start. They committed to engage with us deeply and work side-by-side with us on the implementation. They’ve since more than met this commitment.",
    who: "Adam Jones",
    role: "Director of Business Development, Unipart",
    stats: [
      ["12", "months for the pipeline to grow from millions to billions"],
      ["5", "point increase in net promoter score (NPS)"],
    ],
  },

  "Mid-Sized Business": {
    quote:
      "HubSpot helps businesses grow with connected customer data.",
    who: "Customer Success Story",
    role: "Mid-Sized Business",
    stats: [
      ["40%", "improvement in business growth"],
      ["30%", "increase in team productivity"],
    ],
  },

  "Small Business": {
    quote:
      "HubSpot makes it easier to manage customers and grow your business.",
    who: "Customer Success Story",
    role: "Small Business",
    stats: [
      ["2x", "faster business growth"],
      ["50%", "more efficient customer management"],
    ],
  },
};


const g2 = [
  "Grid Leader (Small Business)",
  "Most Implementable",
  "Best Relationship (Small Business)",
  "Easiest Admin (Enterprise)",
  "Best Results (Mid-Market)",
  "Best Usability (Enterprise)",
];

const footerCols = [
  {
    title: "Popular Features",
    links: [
      "All Products and Features", "HubSpot AEO", "Free Meeting Scheduler App", "Email Tracking Software",
      "AI Content Writer", "AI Website Generator", "Email Marketing Software", "Lead Management Software",
      "AI Prospecting Agent", "Free Website Builder", "Free Landing Page Builder", "Free Online Form Builder",
      "Free Chatbot Builder", "Free Live Chat Software", "Marketing Analytics", "Breeze Assistant", "Free Web Hosting",
    ],
  },
  {
    title: "Free Tools",
    links: [
      "See All Free Business Tools", "AEO Grader", "AI Search Sensor", "Make My Persona",
      "Email Signature Generator", "Free Business Templates", "Software Comparisons Library",
      "Website Templates", "Connector for Claude",
    ],
  },
  {
    title: "Company",
    links: [
      "About Us", "Careers", "Management Team", "Board of Directors", "Investor Relations",
      "Blog", "Sustainability", "AI Instructions", "Contact Us",
    ],
  },
];
const customers = ["Customer Support", "Join a Local User Group"];
const partners = [
  "All Partner Programs", "Solutions Partner Program", "Technology Partner Program",
  "HubSpot for Startups", "Affiliate Program",
];
const legal = ["Legal Center", "Privacy Policy", "Security", "Website Accessibility", "Manage Cookies"];

const mockSegs = [
  "Build a campaign to win back customers",
  ...mockRows.flat(),
  "Ask Breeze anything ...",
];

function useTyping(segments, active, { idleFull = false, speed = 22 } = {}) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const done = { i: segments.length, n: 0 };
  const empty = { i: 0, n: 0 };
  const [pos, setPos] = useState(idleFull ? done : empty);

  useEffect(() => {
    if (reduce) { setPos(active || idleFull ? done : empty); return; }
    if (!active) { setPos(idleFull ? done : empty); return; }
    setPos(empty);
    const id = setInterval(() => {
      setPos((p) => {
        if (p.i >= segments.length) { clearInterval(id); return p; }
        if (p.n >= segments[p.i].length + 6) return { i: p.i + 1, n: 0 };
        return { i: p.i, n: p.n + 1 };
      });
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const out = segments.map((s, k) => (k < pos.i ? s : k === pos.i ? s.slice(0, pos.n) : ""));
  return { out, cur: active && pos.i < segments.length ? pos.i : -1 };
}

function ShowCard({ s }) {
  const [hover, setHover] = useState(false);
  const { out, cur } = useTyping(s.mock ? mockSegs : [s.desc], hover, { idleFull: false });
  const caret = (k) => (cur === k ? <span className="caret" /> : null);

  return (
    <article
      className={"sc sc-" + s.id + (hover ? " is-hover" : "")}
      tabIndex={0}
      style={s.img ? { backgroundImage: `url(${s.img})` } : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      {s.mock && (
        <div className="mock">
          <div className="bubble">{out[0]}{caret(0)}</div>
          <div className="results">
            {mockRows.map(([t], k) => (
              <div className="row" key={t}>
                <span>{out[1 + 2 * k]}{caret(1 + 2 * k)}</span>
                <span className="pill">{out[2 + 2 * k]}{caret(2 + 2 * k)}</span>
              </div>
            ))}
          </div>
          <div className="ask">
            <span>{out[7]}{caret(7)}</span>
            <button aria-label="Send">↑</button>
          </div>
        </div>
      )}
      {s.text && (
        <div className="sc-body">
          <p className="sc-text">{s.text.join(" ")}</p>
          {s.desc && <p className="sc-desc">{out[0]}{caret(0)}</p>}
        </div>
      )}
    </article>
  );
}

const I = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p} />
);
const GlobeIcon = () => <I><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></I>;
const SupportIcon = () => <I><path d="M4 5h16v11H11l-5 4v-4H4z" /></I>;
const PersonIcon = () => <I><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-4 3-6 7-6s7 2 7 6" /></I>;
const SearchIcon = () => <I width="20" height="20"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></I>;

function Dropdown({ name, icon, open, setOpen, align }) {
  const isOpen = open === name;
  return (
    <div className="dd">
      <button
        className="dd-btn"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setOpen(isOpen ? null : name)}
      >
        {icon}
        {name}
        <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {isOpen && (
        <ul className={"dd-menu" + (align === "right" ? " right" : "")}>
          {menus[name].map((i) => <li key={i}><a href="#">{i}</a></li>)}
        </ul>
      )}
    </div>
  );
}

const Spark = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#e8356d" aria-hidden="true"><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z" /></svg>
);

function AgentMock({ id }) {
  if (id === "customer")
    return (
      <div className="pin">
        <div className="bot">
          <span className="av"><Spark /></span>
          <div><b>HubBot</b><p>Hello! I’m HubBot, an AI customer agent. How can I help you today?</p></div>
        </div>
        <svg className="cursor" width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3l16 7-7 2-2 7z" fill="#4a4a4a" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" /></svg>
        <div className="who">
          <span className="photo">JD</span>
          <div><b>Jane Doe</b><div className="field" /></div>
        </div>
      </div>
    );
  if (id === "prospecting")
    return (
      <div className="pin">
        <div className="white">
          <span className="av big"><Spark size={26} /></span>
          <h4>Hi, I’m your prospecting agent</h4>
          <p>I’m here to help put your prospecting efforts on auto-pilot and find buyers faster.</p>
        </div>
      </div>
    );
  return (
    <div className="pin">
      <div className="box">
        <b>Create a Smart Property</b>
        <div className="ta">Does this company sell Marketing software? I want this to be a yes or no answer.</div>
      </div>
    </div>
  );
}




function AgentCards() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => {
    setActive((prev) => (prev + 1) % agentCards.length);
  };

  const prev = () => {
    setActive((prev) =>
      (prev - 1 + agentCards.length) % agentCards.length
    );
  };

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % agentCards.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="agent-presentation"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      <button
        className="presentation-arrow prev"
        onClick={prev}
        aria-label="Previous slide"
      >
        &#8249;
      </button>

      <div className="presentation-stage">

        {agentCards.map((agent, index) => {

          let offset = index - active;

          if (offset > agentCards.length / 2) {
            offset -= agentCards.length;
          }

          if (offset < -agentCards.length / 2) {
            offset += agentCards.length;
          }

          return (
            <div
              key={agent.id}
              className={`presentation-card ${
                offset === 0 ? "selected" : ""
              }`}
              style={{
                "--offset": offset,
                zIndex: 10 - Math.abs(offset),
              }}
              onClick={() => setActive(index)}
            >

              <div className="presentation-card-inner">

                <div className="presentation-visual">
                  <AgentMock id={agent.type} />
                </div>

                <div className="presentation-content">

                  <span className="agent-number">
                    AI AGENT {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{agent.name}</h3>

                  <p>{agent.text}</p>

                  <a
                    href="#"
                    className="agent-learn"
                    onClick={(e) => e.preventDefault()}
                  >
                    Learn more →
                  </a>

                </div>

              </div>
            </div>
          );
        })}

      </div>

      <button
        className="presentation-arrow next"
        onClick={next}
        aria-label="Next slide"
      >
        &#8250;
      </button>

      <div className="presentation-dots">
        {agentCards.map((agent, index) => (
          <button
            key={agent.id}
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}

function Cta({ big }) {
  return (
    <div className={"ctas" + (big ? " big" : "")}>
      <a className="btn" href="#">Get a demo</a>
      <a className="btn ghost" href="#">Get started free</a>
    </div>
  );
}

function LinkList({ items }) {
  return (
    <ul>
      {items.map((l) => (
        <li key={l}><a href="#">{l}</a></li>
      ))}
    </ul>
  );
}

export default function App() {
  const [tab, setTab] = useState("Enterprise");
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(null);
  const [highContrast, setHighContrast] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [paused, setPaused] = useState(false);

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
    const close = (e) => {
      if (e.key === "Escape") { setOpen(null); setChatOpen(false); }
      if (e.type === "click" && !e.target.closest(".dd")) setOpen(null);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("click", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("click", close);
    };
  }, []);
  const story = stories[tab];

  return (
    <>
      <div className="util">
        <div className="wrap">
          <div className="util-left">
            <Dropdown name="English" icon={<GlobeIcon />} open={open} setOpen={setOpen} />
            <label className="hc-toggle">
              <input type="checkbox" role="switch" checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} />
              <span className="switch" aria-hidden="true" />
              High Contrast
            </label>
            <a className="util-link" href="#"><SupportIcon />Customer Support</a>
            <a className="util-link" href="#"><PersonIcon />Contact Sales</a>
          </div>
          <div className="util-right">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen((s) => !s)}><SearchIcon /></button>
            <a href="#">Log in</a>
            <Dropdown name="About" open={open} setOpen={setOpen} align="right" />
          </div>
        </div>
        {searchOpen && (
          <div className="wrap search-row">
            <input type="search" placeholder="Search HubSpot" aria-label="Search HubSpot" autoFocus />
          </div>
        )}
      </div>

      <header className="nav">
        <div className="wrap">
          <a className={"logo" + (scrolled ? " mark" : "")} href="#" aria-label="HubSpot">{scrolled ? <Sprocket /> : <>Hub<b>Spot</b></>}</a>
          <nav className={"nav-links" + (menuOpen ? " open" : "")} aria-label="Main">
            <Dropdown name="Products" open={open} setOpen={setOpen} />
            <Dropdown name="Solutions" open={open} setOpen={setOpen} />
            <a className="plain" href="#">Pricing</a>
            <Dropdown name="Resources" open={open} setOpen={setOpen} />
          </nav>
          <div className="nav-cta">
            <a className="btn" href="#">Get a demo</a>
            <a className="btn ghost" href="#">Get started free</a>
          </div>
          <button
            className="menu-btn"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap">
            <div className="tag">HubSpot Agentic Customer Platform</div>
            <h1>Build demand, win deals, and delight customers — all on one platform<span className="dot">.</span></h1>
            <p>HubSpot aligns marketing, sales, and service around your customer data, so your teams and AI always know what customers need.</p>
            <Cta big />
            <div className="pills">
              {pills.map((p) => <span key={p}>{p}</span>)}
            </div>
          </div>
        </section>

        <section className="showcase" aria-label="Platform highlights">
          {showcase.map((s) => <ShowCard key={s.id} s={s} />)}
        </section>

        <section className="what">
          <div className="wrap">
            <div className="what-grid">
              <h2>What is HubSpot?</h2>
              <p>HubSpot connects your teams, tools, and data on the same platform, so every customer interaction drives growth. Whether you work in HubSpot or tools like Claude and ChatGPT, your customer data comes with you, and your work syncs back. Marketing generates better leads. Sales wins more deals. Customers stick around.</p>
            </div>
            <div className="trust-row">
              <div className="trust">TRUSTED BY 311,000+ CUSTOMERS WORLDWIDE</div>
              <div className="marquee">
                <div className={"track" + (paused ? " paused" : "")}>
                  {[...brands, ...brands].map((b, i) => (
                    <span className={"brand " + b.c} key={i} aria-hidden={i >= brands.length}><BrandName b={b} /></span>
                  ))}
                </div>
                <button className="pause" aria-label={paused ? "Play logo scroll" : "Pause logo scroll"} onClick={() => setPaused((p) => !p)}>
                  {paused
                    ? <svg width="12" height="14" viewBox="0 0 12 14"><path d="M2 1l9 6-9 6z" fill="currentColor" /></svg>
                    : <svg width="12" height="14" viewBox="0 0 12 14"><path d="M2 1h3v12H2zM7 1h3v12H7z" fill="currentColor" /></svg>}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="block products">
          <div className="wrap prod-grid">
            <div className="prod-intro">
              <div className="ai-badge">
                <span className="tag">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff4800" aria-hidden="true"><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z" /></svg>
                  Powered by AI
                </span>
                <i className="dash" />
              </div>
              <h2>Growing a business is hard. HubSpot makes it easier.</h2>
              <p>Disconnected tools and data slow you down. HubSpot connects everything — and everyone — in one place to make growing a business easier than you think.</p>
              <Cta />
            </div>
            <div className="prod-cards">
              {products.map(([name, sub, text], i) => (
                <article className="pcard" key={name}>
                  <div className="pc-head">
                    <Icon d={productIcons[i]} />
                    <h3><ProductName name={name} /></h3>
                  </div>
                  <ul className="pc-list">
                    <li><Check />{sub}</li>
                    <li><Check />{text}</li>
                  </ul>
                  <a className="pc-more" href="#">Learn more <Arrow /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="agents-sec">
          <div className="wrap">
            <div className="ag-top">
              <span className="ag-icon">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#ff4800" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 9-9 9-9-9z" /><circle cx="15.5" cy="7.5" r="1.4" fill="#ff4800" stroke="none" /></svg>
              </span>
              <i className="dash" />
              <a className="ag-btn" href="#">Explore Agent Hub</a>
            </div>
            <div className="ag-head">
              <h2>Built-in AI agents that work for you 24/7.</h2>
              <p>AI agents are your always-on teammates. They can resolve over 65% of customer inquiries, accelerate your sales pipeline, and flag accounts showing interest.</p>
            </div>
            <AgentCards />
          </div>
        </section>




<section className="integ">
  <div className="integration-banner">

    <div className="integration-content">
      <h2>
        Works with the tools you already use.
        <br />
        2,000+ integrations.
      </h2>

      <a href="#" className="integration-link">
        See all app integrations
      </a>
    </div>

    <div className="integration-logos">

      <span className="app-logo slack">✣</span>
      <span className="app-logo zapier">Zapier</span>
      <span className="app-logo google">G</span>
      <span className="app-logo mailchimp">♟</span>
      <span className="app-logo salesforce">☁</span>
      <span className="app-logo hub">H</span>
      <span className="app-logo slack second">✣</span>
      <span className="app-logo zapier second">Zapier</span>
      <span className="app-logo google second">G</span>

    </div>

  </div>
</section>


<section className="case-studies">
  <div className="wrap">

    {/* Heading */}
    <div className="case-heading">
      <h2>
        Remarkable results for every
        <br />
        size business.
      </h2>

      <p>
        Scale your business with HubSpot. The proof is in our
        customers’ success.
      </p>
    </div>

    {/* Category Tabs */}
    <div className="case-tabs">
      {Object.keys(stories).map((t) => (
        <button
          key={t}
          className={tab === t ? "active" : ""}
          onClick={() => setTab(t)}
        >
          {t}
        </button>
      ))}
    </div>

    

<div className="testimonial-card">

  <div className="testimonial-top">

    {/* LEFT IMAGE */}
    <div className="testimonial-image">
      <img
        src="/images/Unipart-1.webp"
        alt="Unipart customer story"
      />
    </div>

    {/* RIGHT CONTENT */}
    <div className="testimonial-content">

      {story && (
        <>
          <blockquote>
            “{story.quote}”
          </blockquote>

          <div className="testimonial-author">
            <h4>{story.who}</h4>
            <p>{story.role}</p>
          </div>

          <a href="#" className="testimonial-link">
            Read full case study
          </a>
        </>
      )}

    </div>

  </div>

  {/* STATISTICS */}
  <div className="testimonial-stats">

    {story?.stats?.map(([number, label], index) => (
      <div className="stat-item" key={index}>
        <h2>{number}</h2>
        <p>{label}</p>
      </div>
    ))}

</div>
  </div>

</div>
</section>


        <section className="g2">
          <div className="wrap">
            <h2>Voted #1 in 526 G2 Reports</h2>
            <div className="badges">
              {g2.map((b) => <span key={b}>{b}</span>)}
            </div>
          </div>
        </section>

        <section className="final">
          <div className="wrap">
            <h2>Make impossible growth feel impossibly easy, with HubSpot</h2>
            <Cta />
          </div>
        </section>
      </main>

      <footer/>
      <div className="chat">
        {chatOpen && (
          <div className="chat-panel" role="dialog" aria-label="Chat">
            <strong>Hi there 👋</strong>
            <p>How can we help you today?</p>
            <a className="btn" href="#">Talk to sales</a>
          </div>
        )}
        <button className="chat-btn" aria-label="Open chat" onClick={() => setChatOpen((c) => !c)}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"><path d="M4 5h16v11H11l-5 4v-4H4z" /><path d="M8 10h8" strokeLinecap="round" /></svg>
        </button>
      </div>
    </>
  );
}
