import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Pricing.css";

const sideSections = [
  ["Platform Solutions", ["Customer Platform", "Free Tools", "Create a Bundle", "HubSpot for Marketers"]],
  ["Products", ["Smart CRM", "Marketing", "Sales", "Service", "Content", "Data", "Revenue", "Commerce Hub", "Operations Hub", "Breeze", "App Marketplace"]],
];

const plans = [
  {
    name: "Free",
    description: "Foundational tools to get you started",
    price: "₹0",
    period: "/mo",
    button: "Get started free",
    user: "Free for up to 2 users. No credit card required.",
    includes: ["Free Marketing tools", "Free Sales tools", "Free Service tools", "Free Content tools", "Free Data tools", "Free Revenue tools"],
  },
  {
    name: "Starter",
    description: "Essential marketing, sales, service, content, and data management software",
    price: "₹585",
    period: "/mo/seat",
    old: "₹1,670/mo/seat",
    button: "Buy now",
    secondary: "Talk to Sales",
    billingToggle: true,
    credits: "500 HubSpot Credits",
    includesTitle: "Free tools, plus:",
    features: [
      { name: "Marketing Hub Starter", detail: "Includes 1,000 marketing contacts" },
      { name: "Sales Hub Starter" },
      { name: "Service Hub Starter" },
      { name: "Content Hub Starter" },
      { name: "Data Hub Starter" },
    ],
    note: "Discounts available for new customers only.",
  },
];

const tableSections = [
  {
    title: "Marketing Hub",
    rows: [
      ["Agent Hub", "-", "check"],
      ["Agent Builder", "-", "Build and deploy custom agents with simple automation tailored to your business."],
      ["Prospecting agent", "-", "check"],
      ["Nurture Agent (Beta)", "-", "-"],
      ["Content Agent (Beta)", "-", "-"],
      ["Customer agent", "-", "-"],
      ["AEO (Beta)", "-", "-"],
      ["SEO recommendations & optimizations", "Basic recommendations.", "Basic recommendations."],
    ],
  },
  {
    title: "Ad Management",
    rows: [
      ["Ad management", "3 connected accounts.", "3 connected accounts."],
      ["Ad retargeting", "All available ad types. 2 audiences.", "All available ad types. 2 audiences."],
      ["Simple ad automation", "-", "1 simple workflow per form."],
      ["Ad conversion events", "Up to 50 synced events.", "Up to 50 synced events."],
      ["CRM segments", "check", "-"],
      ["Social media", "-", "-"],
    ],
  },
  {
    title: "Automate Marketing",
    rows: [
      ["Email marketing", "2,000 email sends per calendar month.", "5x marketing contact tier email send limit."],
      ["Email automation", "1 automated action.", "Up to 10 automated actions."],
      ["Email health reporting", "Limited features.", "Limited features."],
      ["Messaging insights (Beta)", "-", "check"],
      ["A/B testing", "-", "-"],
      ["Smart content for marketing email", "-", "-"],
    ],
  },
  {
    title: "Analyze",
    rows: [
      ["Reporting dashboard", "10 dashboards, 50 reports.", "30 dashboards, 50 reports."],
      ["Website traffic analytics", "Standard web analytics.", "Standard web analytics."],
      ["Custom reporting", "-", "-"],
      ["SEO analytics", "-", "-"],
      ["Google Search Console integration", "-", "-"],
      ["Multi-touch revenue attribution", "-", "-"],
    ],
  },
];

const faqs = [
  "What is Marketing Hub?",
  "What are marketing contacts, and how does contact pricing work?",
  "How many marketing contacts can I have with a Marketing Hub plan?",
  "How many emails can I send with a paid Marketing Hub plan?",
  "How many users do I get with my Marketing Hub plan?",
  "How many HubSpot Credits do I get with my Marketing Hub plan?",
  "Do I need to buy onboarding for Marketing Hub?",
  "What type of support does HubSpot offer?",
  "Does HubSpot offer discount pricing for startups and nonprofits?",
];

const currencies = [
  ["GBP", "£"],
  ["EUR", "€"],
  ["USD", "$"],
  ["AUD", "AU$"],
  ["SGD", "S$"],
  ["CAD", "CA$"],
  ["JPY", "¥"],
  ["COP", "COP"],
  ["INR", "Rs"],
];

function Check() {
  return <span className="pricing-check" aria-label="Included">✓</span>;
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [pageScrolled, setPageScrolled] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [currencySearch, setCurrencySearch] = useState("");
  const filteredCurrencies = currencies.filter(([code]) =>
    code.toLowerCase().includes(currencySearch.trim().toLowerCase())
  );

  useEffect(() => {
    const updateScrollState = () => setPageScrolled(window.scrollY > 110);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <>
      <Navbar hideOnScroll />
      <main className={`pricing-page${pageScrolled ? " is-scrolled" : ""}`}>
        <div className="pricing-sidebar">
          {sideSections.map(([title, links]) => (
            <section key={title}>
              <h3>{title}</h3>
              {links.map((link) => (
                link === "Create a Bundle" ? (
                  <Link to="/pricing/bundle" key={link}>{link}</Link>
                ) : link === "Smart CRM" ? (
                  <Link to="/pricing/smart-crm" key={link}>{link}</Link>
                ) : link === "HubSpot for Marketers" ? (
                  <Link to="/pricing/marketing-plus" key={link}>{link}</Link>
                ) : link === "Sales" ? (
                  <Link to="/pricing/sales" key={link}>{link}</Link>
                ) : link === "Service" ? (
                  <Link to="/pricing/service" key={link}>{link}</Link>
                ) : link === "Content" ? (
                  <Link to="/pricing/content" key={link}>{link}</Link>
                ) : (
                  <a
                    className={link === "Free Tools" ? "active" : ""}
                    href={link === "Marketing" || link === "HubSpot for Marketers"
                      ? "#marketing-hub"
                      : link === "Free Tools" ? "#free-tools" : "#"}
                    key={link}
                  >
                    {link}
                  </a>
                )
              ))}
            </section>
          ))}
          <div className="currency-picker">
            <button
              className="currency"
              type="button"
              aria-label="Select currency"
              aria-expanded={currencyOpen}
              onClick={() => setCurrencyOpen((open) => !open)}
            >
              <span>{currency} ({currencies.find(([code]) => code === currency)?.[1]})</span>
              <span aria-hidden="true">{currencyOpen ? "⌃" : "⌄"}</span>
            </button>
            {currencyOpen && (
              <div className="currency-menu" role="menu" aria-label="Currency options">
                <label className="currency-search">
                  <span className="sr-only">Search currencies</span>
                  <input
                    type="search"
                    value={currencySearch}
                    placeholder="Search"
                    onChange={(event) => setCurrencySearch(event.target.value)}
                  />
                  <span aria-hidden="true">⌕</span>
                </label>
                <div className="currency-options">
                  {filteredCurrencies.map(([code, symbol]) => (
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={currency === code}
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setCurrencyOpen(false);
                        setCurrencySearch("");
                      }}
                    >
                      <span>{code} ({symbol})</span>
                      {currency === code && <span aria-hidden="true">✓</span>}
                    </button>
                  ))}
                  {filteredCurrencies.length === 0 && <p className="currency-empty">No currencies found</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pricing-main">
          <div className="starter-banner">
            <div>
              <strong>Save up to 65% on Starter</strong>
              <p>Smarter tools, lower price. Get special Starter pricing when you choose a monthly or annual subscription. New customers only. Select offers available for a limited time.</p>
            </div>
            <button>Buy Now</button>
          </div>

          <div className="pricing-heading" id="free-tools">
            <h1>Free Tools</h1>
            <p>Get access to all of HubSpot's free foundational tools</p>
          </div>

          <div className="plan-grid free-tools-grid">
            {plans.slice(0, 2).map((plan) => (
              <article className="plan-card" key={plan.name}>
                <h2>{plan.name}</h2>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  {plan.name !== "Free" && <small>Starts at</small>}
                  <strong>{plan.price}<span>{plan.period}</span></strong>
                  {plan.old && <del>{plan.old}</del>}
                </div>
                {plan.user && <p className="plan-user-note">{plan.user}</p>}
                {plan.seats && <p className="core-seats">{plan.seats}</p>}
                {plan.extraSeats && <p className="core-seats">{plan.extraSeats}</p>}
                {plan.billingToggle && (
                  <button className={`pay-switch ${annual ? "yearly" : ""}`} onClick={() => setAnnual((value) => !value)} type="button">
                    <span>Pay Monthly<br />Commit monthly</span>
                    <span>Pay Annually<br /><b>BEST VALUE</b></span>
                  </button>
                )}
                <button className="plan-button" type="button">{plan.button}</button>
                {plan.secondary && <button className="plan-secondary" type="button">{plan.secondary}</button>}
                {plan.name === "Free" ? (
                  <div className="plan-details">
                    <p className="details-heading">Includes:</p>
                    <ul className="free-features">
                      {plan.includes.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ) : (
                  <div className="plan-details">
                    <p className="plan-metric">{plan.credits}</p>
                    <p className="details-heading">{plan.includesTitle}</p>
                    <ul className="plan-feature-list">
                      {plan.features.map((feature) => (
                        <li key={feature.name}>
                          {feature.name === "Marketing Hub Starter"
                            ? <a href="#marketing-hub"><strong>{feature.name}</strong></a>
                            : <strong>{feature.name}</strong>}
                          {feature.detail && <span>{feature.detail}</span>}
                        </li>
                      ))}
                    </ul>
                    {plan.note && <p className="plan-onboarding-note">*{plan.note} <a href="#">Learn more ↗</a></p>}
                  </div>
                )}
              </article>
            ))}
          </div>

          <p className="tax-note">*Price shown in INR and subject to applicable tax.</p>
          <div className="integration-call pricing-help">
            <h3>Need help choosing a plan?</h3>
            <a href="tel:+1008000503669">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a15 15 0 0 0 5 5L15 13l2.5-3 5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" /></svg>
              +0 (008) 000-503669
            </a>
          </div>

          <section className="comparison comparison-free-tools" id="marketing-hub">
            {tableSections.map((section) => (
              <div className="comparison-section" key={section.title}>
                <div className="comparison-head">
                  <h2>{section.title}</h2>
                  <div className="sticky-plan-head">
                    {["Free tools", "Starter"].map((name, index) => (
                      <div key={name}>
                        <b>{name}</b>
                        {index === 1 && <strong>₹585/mo</strong>}
                        <button>{index === 0 ? "Get started free" : "Buy now"}</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="comparison-grid">
                  {section.rows.map((row) => (
                    <div className="comparison-row" key={row[0]}>
                      <div className="feature-name">{row[0]} <i>ⓘ</i></div>
                      {row.slice(1, 3).map((cell, index) => (
                        <div className="feature-cell" key={index}>
                          {cell === "check" ? <Check /> : cell === "-" ? "" : cell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="integration-banner">
            <h2>Works with the tools you already use.<br />2,000+ integrations.</h2>
            <div className="integration-art" aria-hidden="true">
              <span className="integration-logo slack">✣</span>
              <span className="integration-logo zapier">zapier</span>
              <span className="integration-logo mailchimp">Mailchimp</span>
              <span className="integration-logo ads">Google Ads</span>
              <span className="integration-logo shopify">S</span>
              <span className="integration-logo gmail">M</span>
              <span className="integration-logo hubspot">✣</span>
              <span className="integration-logo salesforce">cloud</span>
            </div>
          </section>

          <section className="faq-section">
            <h2>Frequently asked questions</h2>
            {faqs.map((faq, index) => (
              <div className="faq-item" key={faq}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span>{openFaq === index ? "⌄" : "›"}</span>{faq}
                </button>
                {openFaq === index && <p>{faq.replace("?", "")} is available across the selected HubSpot Marketing Hub plan. Contact sales or choose a plan to see exact limits and eligible features.</p>}
              </div>
            ))}
              <div className="faq-contact">
                <h3>Still have questions about how HubSpot's software can<br className="faq-contact-break" /> help your business?</h3>
                <a href="tel:+1008000503669">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a15 15 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" /></svg>
                  +0 (008) 000-503669
                </a>
              </div>
          </section>
        </div>
      </main>
    </>
  );
}
