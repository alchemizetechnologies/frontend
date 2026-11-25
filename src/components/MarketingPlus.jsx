import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Pricing.css";
import "./MarketingPlus.css";

const platformLinks = [
  ["Platform Solutions", ["Customer Platform", "Free Tools", "Create a Bundle", "HubSpot for Marketers"]],
  ["Products", ["Smart CRM", "Marketing", "Sales", "Service", "Content", "Data", "Revenue", "Commerce Hub", "Operations Hub", "Breeze", "App Marketplace"]],
];

const plans = [
  {
    name: "Professional",
    description: "Marketing Hub and Content Hub combined to provide world-class lead generation, marketing automation, and content marketing tools.",
    price: "₹74,970",
    oldPrice: "₹83,300/mo",
    seats: "Includes 3 Core Seats",
    extraSeats: "Additional Core Seats start at ₹3,753/mo",
    credits: "3,000 HubSpot Credits",
    contacts: "2,000 marketing contacts",
    features: [
      "Smart content and reporting",
      "Social media",
      "Content remix BETA",
      "Omni-channel marketing automation",
      "Breeze social post agent BETA",
      "Custom reporting",
      "Memberships",
      "Campaign management",
    ],
    onboarding: "Cost shown does not include the required, one-time Professional Onboarding for a fee of ₹250,000.",
    annualToggle: true,
  },
  {
    name: "Enterprise",
    description: "Advanced control, flexibility, and scale with Marketing Hub and Content Hub Enterprise editions.",
    price: "₹317,000",
    seats: "Includes 5 Core Seats",
    extraSeats: "Additional Core Seats start at ₹6,250/mo",
    credits: "5,000 HubSpot Credits",
    contacts: "10,000 marketing contacts",
    features: [
      "Multi-touch revenue attribution",
      "Customer journey analytics",
      "Organize teams",
      "Content approvals",
      "Journey automation BETA",
      "Limit access to content and data",
      "Multisites",
      "Lookalike Segments BETA",
      "Email approvals",
    ],
    onboarding: "Cost shown does not include the required, one-time Enterprise Onboarding for a fee of ₹584,000.",
  },
];

const comparisonSections = [
  {
    title: "Marketing Hub",
    rows: [
      ["Agent Hub", "check", "check"],
      ["Agent Builder", "Build and deploy custom agents with simple automation tailored to your business.", "Build and deploy custom agents with advanced automation and event-based triggers."],
      ["Prospecting agent", "check", "check"],
      ["Nurture Agent (Beta)", "check", "check"],
      ["Content Agent (Beta)", "check", "check"],
      ["Customer agent", "check", "check"],
      ["AEO (Beta)", "Get started with 50 prompts, each run daily across 3 engines.", "Get started with 50 prompts, each run daily across 3 engines."],
      ["SEO recommendations & optimizations", "Advanced recommendations, full site auditing, and topics.", "Advanced recommendations, full site auditing, and topics."],
    ],
  },
  {
    title: "Ad Management",
    rows: [
      ["Ad management", "500 connected accounts. 5 contact and company lists.", "500 connected accounts. 15 contact and company lists."],
      ["Ad retargeting", "All available ad types. 5 audiences.", "All available ad types. 15 audiences."],
      ["Simple ad automation", "Unlimited simple workflows.", "Unlimited simple workflows."],
      ["Ad conversion events", "Up to 50 synced events.", "Up to 50 synced events."],
      ["CRM segments", "Up to 1,200 active CRM segments.", "Up to 2,000 active CRM segments."],
      ["Social media", "50 connected accounts. 10 posts/mo scheduling.", "300 connected accounts. 10 posts/mo scheduling."],
    ],
  },
  {
    title: "Automate Marketing",
    rows: [
      ["Email marketing", "10x marketing contact tier email send limit.", "20x marketing contact tier email send limit."],
      ["Email automation", "Unlimited actions plus omni-channel automation.", "Unlimited actions plus omni-channel automation."],
      ["Email health reporting", "Additional features.", "Additional features."],
      ["Messaging insights (Beta)", "check", "check"],
      ["A/B testing", "check", "check"],
      ["Smart content for marketing email", "check", "check"],
    ],
  },
  {
    title: "Analyze",
    rows: [
      ["Reporting dashboard", "75 dashboards, 50 reports.", "100 dashboards, 50 reports."],
      ["Website traffic analytics", "Customizable website traffic analytics.", "Customizable website traffic analytics."],
      ["Custom reporting", "Up to 100 custom reports.", "Up to 500 custom reports."],
      ["SEO analytics", "check", "check"],
      ["Google Search Console integration", "check", "check"],
      ["Multi-touch revenue attribution", "-", "Track up to 10,000 logged interactions."],
    ],
  },
];

const creditSlides = [
  {
    name: "Customer Agent",
    description: "Answer customer questions instantly across every channel — chat, email, forms, and calling — with an AI-powered agent you can train in minutes and that escalates to your team when needed.",
    metric: "65%+",
    metricLabel: "of conversations resolved automatically",
    secondMetric: "39%",
    secondMetricLabel: "faster ticket resolution",
  },
  {
    name: "Prospecting Agent",
    description: "Spot buying signals, research target accounts, and launch helpful outreach with the context your team needs.",
    metric: "24/7",
    metricLabel: "always-on prospecting support",
    secondMetric: "More",
    secondMetricLabel: "time for meaningful conversations",
  },
  {
    name: "Data Agent",
    description: "Turn customer data into useful answers, account insights, and recommendations your team can act on.",
    metric: "One",
    metricLabel: "connected view of every customer",
    secondMetric: "Fast",
    secondMetricLabel: "answers from your business data",
  },
  {
    name: "Content Agent",
    description: "Create helpful content and keep your messaging consistent across campaigns, channels, and customer journeys.",
    metric: "On-brand",
    metricLabel: "content for every channel",
    secondMetric: "Less",
    secondMetricLabel: "time spent on repetitive work",
  },
];

const faqs = [
  "What is HubSpot for Marketers?",
  "What is included in HubSpot for Marketers?",
  "How do marketing contacts and pricing work?",
  "How many users are included in each plan?",
  "Do I need to buy onboarding?",
  "What type of support does HubSpot offer?",
];

function Check() {
  return <span className="pricing-check" aria-label="Included">✓</span>;
}

export default function MarketingPlus() {
  const [annual, setAnnual] = useState(true);
  const [creditSlide, setCreditSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);
  const [pageScrolled, setPageScrolled] = useState(false);
  const activeCreditSlide = creditSlides[creditSlide];
  const changeCreditSlide = (direction) => {
    setCreditSlide((current) => (current + direction + creditSlides.length) % creditSlides.length);
  };

  useEffect(() => {
    const updateScrollState = () => setPageScrolled(window.scrollY > 110);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <>
      <Navbar hideOnScroll />
      <main className={`pricing-page marketing-plus-page${pageScrolled ? " is-scrolled" : ""}`}>
        <aside className="pricing-sidebar">
          {platformLinks.map(([section, links]) => (
            <section key={section}>
              <h3>{section}</h3>
              {links.map((link) => {
                if (link === "Create a Bundle") {
                  return <Link key={link} to="/pricing/bundle">{link}</Link>;
                }
                if (link === "HubSpot for Marketers") {
                  return <Link className="active" key={link} to="/pricing/marketing-plus">{link}</Link>;
                }
                if (link === "Smart CRM") {
                  return <Link key={link} to="/pricing/smart-crm">{link}</Link>;
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
                return <a key={link} href={link === "Marketing" ? "#marketing-plans" : "#"}>{link}</a>;
              })}
            </section>
          ))}
        </aside>

        <div className="pricing-main">
          <div className="pricing-heading marketing-plus-heading">
            <h1>HubSpot for Marketers</h1>
            <p>
              A complete solution that unites the power of content marketing with world-class lead generation and marketing automation tools.
              <Link to="/pricing/bundle">Calculate your price</Link>
            </p>
          </div>

          <div className="plan-grid marketing-plus-grid" id="marketing-plans">
            {plans.map((plan) => (
              <article className="plan-card marketing-plus-card" key={plan.name}>
                <h2>{plan.name}</h2>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  <small>Starts at</small>
                  <strong>{plan.price}<span>/mo</span></strong>
                  {plan.oldPrice && <del>{plan.oldPrice}</del>}
                </div>
                <p className="core-seats">{plan.seats}</p>
                <p className="marketing-plus-extra-seats">{plan.extraSeats}</p>
                {plan.annualToggle ? (
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
                  <div className="marketing-plus-toggle-spacer" aria-hidden="true" />
                )}
                <Link className="plan-button marketing-plus-sales" to="/contact">Talk to Sales ↗</Link>
                <div className="plan-details marketing-plus-details">
                  <p className="plan-metric">{plan.credits} ⓘ</p>
                  <p className="plan-metric">{plan.contacts}</p>
                  <p className="details-heading">Includes:</p>
                  <ul className="plan-feature-list">
                    {plan.features.map((feature) => <li key={feature}><strong>{feature}</strong></li>)}
                  </ul>
                  <p className="plan-onboarding-note">*{plan.onboarding} <a href="#">Learn more ↗</a></p>
                </div>
              </article>
            ))}
          </div>
          <p className="tax-note marketing-plus-tax">*Price shown in INR and subject to applicable tax.</p>

          <section className="credits-card">
            <div className="credits-copy">
              <h2>HubSpot Credits:</h2>
              <h3>Power features and agents that do work for you</h3>
              <p>HubSpot has powerful AI agents and features that do work for you. You can take advantage of these features with HubSpot Credits. Buy credits in packs to easily plan your spend or pay-as-you-go for added flexibility.</p>
              <svg className="credits-flower" viewBox="0 0 170 190" role="img" aria-label="Illustration of a flower growing from coins">
                <g fill="none" stroke="#1b4145" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M88 145c-10-42 2-68 5-94M91 115c-24-14-35-9-45-5 12 16 26 21 45 14M94 93c16-16 31-20 45-18-6 17-20 26-44 27" />
                  <path d="M83 47c-6-15 2-24 13-27 4 12 1 21-10 30M94 47c4-17 16-21 27-16-3 13-11 20-26 22M84 49c-16-7-17-19-9-28 11 7 15 16 12 29M91 44c-3-18 7-26 19-25 1 14-5 22-18 28" fill="#ff6a3d" />
                  <ellipse cx="70" cy="158" rx="43" ry="12" fill="#fff" />
                  <ellipse cx="101" cy="162" rx="43" ry="12" fill="#fff" />
                  <ellipse cx="85" cy="172" rx="43" ry="12" fill="#fff" />
                  <path d="M29 158v7c3 13 77 13 82 0v-7M59 162v7c3 13 77 13 82 0v-7M43 172v7c3 13 77 13 82 0v-7" />
                  <ellipse cx="70" cy="158" rx="43" ry="12" stroke="#ff5a1f" />
                  <ellipse cx="101" cy="162" rx="43" ry="12" stroke="#ff5a1f" />
                  <ellipse cx="85" cy="172" rx="43" ry="12" stroke="#ff5a1f" />
                </g>
              </svg>
            </div>
            <div className="credits-agent">
              <span className="credits-agent-label">AI Agents</span>
              <button className="credits-slide-arrow previous" type="button" aria-label="Previous AI agent slide" onClick={() => changeCreditSlide(-1)}>‹</button>
              <button className="credits-slide-arrow next" type="button" aria-label="Next AI agent slide" onClick={() => changeCreditSlide(1)}>›</button>
              <article className="credits-agent-slide" aria-live="polite">
                <h3>{activeCreditSlide.name}</h3>
                <p>{activeCreditSlide.description} <a href="#">Learn more ↗</a></p>
                <div className={`agent-preview preview-${creditSlide}`} aria-hidden="true">
                  <div className="preview-toolbar"><i /><i /><i /><span>{activeCreditSlide.name}</span></div>
                  <div className="preview-content">
                    <div className="preview-table">
                      <div><b>Agent</b><b>Tasks</b><b>Status</b></div>
                      <div><span>Customer Agent</span><span>1,248</span><i>Active</i></div>
                      <div><span>Prospecting Agent</span><span>428</span><i>Active</i></div>
                      <div><span>Data Agent</span><span>92</span><i>Ready</i></div>
                    </div>
                    <div className="preview-response">
                      <b>Breeze {activeCreditSlide.name}</b>
                      <span>TOTAL CREDITS USED</span>
                      <strong>25,400</strong>
                    </div>
                  </div>
                </div>
                <div className="agent-slide-stats">
                  <div><strong>{activeCreditSlide.metric}</strong><span>{activeCreditSlide.metricLabel}</span></div>
                  <div><strong>{activeCreditSlide.secondMetric}</strong><span>{activeCreditSlide.secondMetricLabel}</span></div>
                </div>
              </article>
              <div className="credits-slide-dots" aria-label={`Slide ${creditSlide + 1} of ${creditSlides.length}`}>
                {creditSlides.map((slide, index) => (
                  <button
                    key={slide.name}
                    type="button"
                    className={index === creditSlide ? "active" : ""}
                    aria-label={`Show ${slide.name}`}
                    aria-current={index === creditSlide ? "true" : undefined}
                    onClick={() => setCreditSlide(index)}
                  />
                ))}
              </div>
            </div>
            <div className="credits-simple">
              <div className="credit-principle">
                <h3><b>✦</b> Simple</h3>
                <ul>
                  <li>Pay when work gets done. Credits are used when features take action across the platform.</li>
                  <li>Get a clear view of every action taken and pause features when priorities change.</li>
                </ul>
              </div>
              <div className="credit-principle">
                <h3><b>✦</b> Predictable</h3>
                <ul>
                  <li>You decide how much each feature can spend, and when to stop.</li>
                  <li>Adjust default spend controls to match your budget and set action-level credit limits so your spend goes to what drives value.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="comparison comparison-marketing-plus" id="marketing-hub-comparison">
            {comparisonSections.map((section) => (
              <div className="comparison-section" key={section.title}>
                <div className="comparison-head">
                  <h2>{section.title}</h2>
                  <div className="sticky-plan-head">
                    {["Professional", "Enterprise"].map((name, index) => (
                      <div key={name}>
                        <b>{name}</b>
                        <strong>{index === 0 ? "₹74,970/mo" : "₹317,000/mo"}</strong>
                        <Link to="/contact">Talk to Sales</Link>
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

          <section className="faq-section marketing-plus-faq">
            <h2>Frequently asked questions</h2>
            {faqs.map((faq, index) => (
              <div className="faq-item" key={faq}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span>{openFaq === index ? "⌄" : "›"}</span>{faq}
                </button>
                {openFaq === index && <p>{faq.replace("?", "")} is available with the selected HubSpot for Marketers plan. Contact sales for exact limits and onboarding details.</p>}
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
