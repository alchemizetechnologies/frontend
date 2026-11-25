import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Pricing.css";
import "./SmartCrm.css";

const sidebarSections = [
  ["Platform Solutions", ["Customer Platform", "Free Tools", "Create a Bundle", "HubSpot for Marketers"]],
  ["Products", ["Smart CRM", "Marketing", "Sales", "Service", "Content", "Data", "Revenue", "Commerce Hub", "Operations Hub", "Breeze", "App Marketplace"]],
];

const plans = [
  {
    name: "Professional",
    description: "Comprehensive customer relationship management tools for centralized data and process management",
    price: "₹3,753",
    oldPrice: "₹4,170/mo/seat",
    credits: "3,000 HubSpot Credits",
    includes: "Starter CRM features, plus:",
    features: [
      "Agent Hub",
      "Teams",
      "Custom reporting",
      "Calculated properties",
      "Standard CRM interface configuration",
      "Duplicate management",
    ],
    billingToggle: true,
  },
  {
    name: "Enterprise",
    description: "Our most powerful customer relationship management tools for advanced customization and flexibility",
    price: "₹6,250",
    credits: "5,000 HubSpot Credits",
    includes: "Smart CRM Professional, plus:",
    features: [
      "Custom objects",
      "Standard sandbox account",
      "Admin notifications management",
      "Organize teams",
      "Field-level permissions",
      "Sensitive Data",
    ],
  },
];

const comparisonSections = [
  {
    title: "Unify Customer Data",
    rows: [
      ["Agent Hub", "check", "check"],
      ["Intent signals", "check", "check"],
      ["Custom properties", "1,000 custom properties per object.", "1,000 custom properties per object."],
      ["Smart properties", "check", "check"],
      ["Calculated properties", "40 calculated properties", "200 calculated properties"],
      ["Field-level permissions", "-", "check"],
      ["Contact enrichment", "check", "check"],
      ["Object Tags", "50", "100"],
      ["Data Agent", "check", "check"],
      ["Data quality overview (Beta)", "Scan account for data quality issues daily.", "Scan account for data quality issues daily."],
      ["Duplicate management", "check", "check"],
      ["AI insights on CRM index pages (Beta)", "-", "check"],
      ["Custom objects", "-", "Up to 10 object definitions and 1,000,000 total custom object records."],
      ["Standard sandbox account", "-", "One standard sandbox. Import up to 200K records per type; enroll up to 100K records per day per sandbox."],
      ["Custom events", "-", "Limited to 500 event definitions and 30 million completions per month."],
      ["Sensitive Data", "-", "check"],
    ],
  },
  {
    title: "Unify Teams",
    rows: [
      ["Breeze Assistant", "check", "check"],
      ["HubSpot Work (Beta)", "Full automation", "Full automation"],
      ["Work Agents", "Full automation", "Full automation"],
      ["Customer agent", "check", "check"],
      ["Prospecting agent", "check", "check"],
      ["Pipelines", "Up to 100 total pipelines per account across object types.", "Up to 350 total pipelines per account across object types."],
      ["Repeating tasks", "check", "check"],
      ["Shared inbox", "Up to 100 inboxes", "Up to 200 inboxes"],
      ["Reporting dashboard", "75 dashboards, 50 reports per dashboard", "100 dashboards, 50 reports per dashboard"],
      ["Custom reporting", "Up to 100 custom reports and 10 million events per custom reporting query", "Up to 500 custom reports and 100 million events per custom reporting query"],
      ["Projects", "check", "check"],
    ],
  },
  {
    title: "Unify Tech Stack",
    rows: [
      ["CRM Import", "Up to 500 imports/day, 10M rows/day via UI, and 80M rows/day via API", "Up to 500 imports/day, 10M rows/day via UI, and 80M rows/day via API"],
      ["Slack integration", "check", "check"],
      ["Salesforce integration", "500 field mappings; 10,000 Salesforce owners; 1 account", "500 field mappings; 10,000 Salesforce owners; 1 account"],
      ["Salesforce custom object sync", "-", "check"],
    ],
  },
];

const faqs = [
  "What is Smart CRM?",
  "How is AI used in Smart CRM?",
  "How does Smart CRM work with other HubSpot Hubs?",
  "How many HubSpot Credits do I get with my Smart CRM plan?",
  "What type of support does HubSpot offer for Smart CRM?",
];

function Check() {
  return <span className="pricing-check" aria-label="Included">✓</span>;
}

export default function SmartCrm() {
  const [annual, setAnnual] = useState(true);
  const [pageScrolled, setPageScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);

  useEffect(() => {
    const updateScrollState = () => setPageScrolled(window.scrollY > 110);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <>
      <Navbar hideOnScroll />
      <main className={`pricing-page smart-crm-page${pageScrolled ? " is-scrolled" : ""}`}>
        <aside className="pricing-sidebar">
          {sidebarSections.map(([section, links]) => (
            <section key={section}>
              <h3>{section}</h3>
              {links.map((link) => {
                if (link === "Create a Bundle") {
                  return <Link key={link} to="/pricing/bundle">{link}</Link>;
                }
                if (link === "HubSpot for Marketers") {
                  return <Link key={link} to="/pricing/marketing-plus">{link}</Link>;
                }
                if (link === "Smart CRM") {
                  return <Link className="active" key={link} to="/pricing/smart-crm">{link}</Link>;
                }
                if (link === "Sales") {
                  return <Link key={link} to="/pricing/sales">{link}</Link>;
                }
                if (link === "Service") {
                  return <Link key={link} to="/pricing/service">{link}</Link>;
                }
                if (link === "Content") {
                  return <Link key={link} to="/pricing/content">{link}</Link>;
                }
                if (link === "Free Tools" || link === "Customer Platform") {
                  return <Link key={link} to="/pricing">{link}</Link>;
                }
                return <a key={link} href={link === "Marketing" ? "#smart-crm-plans" : "#"}>{link}</a>;
              })}
            </section>
          ))}
        </aside>

        <div className="pricing-main">
          <div className="pricing-heading smart-crm-heading">
            <h1><span className="smart-crm-icon" aria-hidden="true" />Smart CRM</h1>
            <p>Customer relationship management tools that make it easy to unify your customer data, teams, and tech stacks.</p>
          </div>

          <div className="plan-grid smart-crm-grid" id="smart-crm-plans">
            {plans.map((plan) => (
              <article className="plan-card smart-crm-card" key={plan.name}>
                <h2>{plan.name}</h2>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  <small>Starts at</small>
                  <strong>{plan.price}<span>/mo/seat</span></strong>
                  {plan.oldPrice && <del>{plan.oldPrice}</del>}
                </div>
                {plan.billingToggle ? (
                  <button
                    className={`pay-switch ${annual ? "yearly" : ""}`}
                    type="button"
                    aria-label="Toggle billing commitment"
                    aria-pressed={annual}
                    onClick={() => setAnnual((value) => !value)}
                  >
                    <span>Pay Monthly<br />Commit annually</span>
                    <span>Pay Annually<br /><b>BEST VALUE</b></span>
                  </button>
                ) : (
                  <div className="smart-crm-toggle-spacer" aria-hidden="true" />
                )}
                {plan.name === "Professional" ? (
                  <>
                    <Link className="plan-button smart-crm-sales" to="/contact">Buy now</Link>
                    <Link className="plan-secondary smart-crm-sales" to="/contact">Talk to Sales ↗</Link>
                  </>
                ) : (
                  <Link className="plan-button smart-crm-sales smart-crm-sales-enterprise" to="/contact">Talk to Sales ↗</Link>
                )}
                <div className="plan-details smart-crm-details">
                  <p className="plan-metric">{plan.credits} ⓘ</p>
                  <p className="details-heading">{plan.includes}</p>
                  <ul className="plan-feature-list">
                    {plan.features.map((feature) => <li key={feature}><strong>{feature}</strong></li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <p className="tax-note smart-crm-tax">*Price shown in INR and subject to applicable tax.</p>

          <section className="comparison comparison-smart-crm" id="smart-crm-comparison">
            {comparisonSections.map((section) => (
              <div className="comparison-section" key={section.title}>
                <div className="comparison-head">
                  <h2>{section.title}</h2>
                  <div className="sticky-plan-head">
                    {["Professional", "Enterprise"].map((name, index) => (
                      <div key={name}>
                        <b>{name}</b>
                        <strong>{index === 0 ? "₹3,753/mo" : "₹6,250/mo"}</strong>
                        {index === 0
                          ? <Link to="/contact">Buy now</Link>
                          : <Link to="/contact">Talk to Sales ↗</Link>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="comparison-grid">
                  {section.rows.map(([feature, professional, enterprise]) => (
                    <div className="comparison-row" key={feature}>
                      <div className="feature-name">{feature} <i>ⓘ</i></div>
                      {[professional, enterprise].map((cell, index) => (
                        <div className="feature-cell" key={index}>
                          {cell === "check" ? <Check /> : cell === "-" ? "" : cell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p className="smart-crm-catalog">View the <a href="#">Product &amp; Services Catalog ↗</a> for full technical limits and definitions.</p>
          </section>

          <div className="integration-call smart-crm-help">
            <h3>Need help choosing a plan?</h3>
            <a href="tel:+1008000503669">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a15 15 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" /></svg>
              +0 (008) 000-503669
            </a>
          </div>

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

          <section className="faq-section smart-crm-faq">
            <h2>Frequently asked questions</h2>
            {faqs.map((faq, index) => (
              <div className="faq-item" key={faq}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span>{openFaq === index ? "⌄" : "›"}</span>{faq}
                </button>
                {openFaq === index && <p>{faq.replace("?", "")} is available with the selected Smart CRM plan. Contact sales for exact limits and support details.</p>}
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
