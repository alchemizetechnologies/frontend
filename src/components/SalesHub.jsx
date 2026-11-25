import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Pricing.css";
import "./SalesHub.css";

const sidebarSections = [
  ["Platform Solutions", ["Customer Platform", "Free Tools", "Create a Bundle", "HubSpot for Marketers"]],
  ["Products", ["Smart CRM", "Marketing", "Sales", "Service", "Content", "Data", "Revenue", "Commerce Hub", "Operations Hub", "Breeze", "App Marketplace"]],
];

const plans = [
  {
    name: "Free",
    description: "Start closing deals faster with time-saving sales tools you can use for free.",
    price: "₹0",
    period: "/mo",
    button: "Get started free",
    freeFeatures: ["Free Sales tools", "Free CRM tools", "Free meeting scheduling", "Free live chat", "Free email tracking"],
  },
  {
    name: "Starter",
    description: "Essential sales software to organize your pipeline and close deals faster.",
    price: "₹585",
    period: "/mo/seat",
    oldPrice: "₹1,670/mo/seat",
    credits: "500 HubSpot Credits",
    includes: "Free tools, plus:",
    features: ["Agent Hub", "Agent Builder", "Prospecting agent", "Notetaker", "Calling", "Task queues", "Intent signals"],
    note: "Discounts available for new customers only.",
    billingToggle: true,
    button: "Buy now",
  },
  {
    name: "Professional",
    description: "Comprehensive sales software to automate and scale your sales processes.",
    price: "₹7,497",
    period: "/mo/seat",
    oldPrice: "₹8,330/mo/seat",
    credits: "3,000 HubSpot Credits",
    includes: "Sales Hub Starter, plus:",
    features: ["Deal Progression (BETA)", "Forecasting", "Deal Plans (BETA)", "Conversation intelligence", "Sequences"],
    note: "Cost shown does not include required one-time Professional Onboarding for ₹125,000.",
    billingToggle: true,
    button: "Buy now",
  },
  {
    name: "Enterprise",
    description: "Our most powerful sales software for advanced control and flexibility.",
    price: "₹12,500",
    period: "/mo/seat",
    credits: "5,000 HubSpot Credits",
    includes: "Sales Hub Professional, plus:",
    features: ["Deal splits", "Deal journey analytics", "Lead Form Routing", "Pipeline approvals for Deals", "Standard sandbox account"],
    note: "Cost shown does not include required one-time Enterprise Onboarding for ₹292,000.",
    button: "Talk to Sales",
  },
];

const creditSlides = [
  {
    name: "Prospecting Agent",
    description: "Spot buying signals, research target accounts, and launch helpful outreach with the context your team needs.",
    metric: "24/7",
    metricLabel: "always-on prospecting support",
    secondMetric: "More",
    secondMetricLabel: "time for meaningful conversations",
  },
  {
    name: "Customer Agent",
    description: "Answer customer questions instantly across every channel with an AI-powered agent that escalates to your team when needed.",
    metric: "65%+",
    metricLabel: "of conversations resolved automatically",
    secondMetric: "39%",
    secondMetricLabel: "faster ticket resolution",
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

const comparisonSections = [
  {
    title: "Build Pipeline",
    rows: [
      ["HubSpot mobile app", "check", "check", "check", "check"],
      ["1-to-1 email", "Includes HubSpot branding.", "Remove HubSpot branding.", "Remove HubSpot branding.", "Remove HubSpot branding."],
      ["Canned snippets", "Up to 3 snippets.", "Up to 5,000 snippets.", "Up to 5,000 snippets.", "Up to 5,000 snippets."],
      ["Email templates", "Up to 3 templates.", "Up to 10,000 templates.", "Up to 10,000 templates.", "Up to 10,000 templates."],
      ["1:1 video messaging", "-", "-", "check", "check"],
      ["Sales email frequency controls", "-", "-", "check", "check"],
      ["Agent Hub", "-", "check", "check", "check"],
      ["Agent Builder", "-", "Simple automation.", "Advanced automation.", "Advanced automation."],
      ["Data Agent", "-", "check", "check", "check"],
      ["Prospecting agent", "-", "check", "check", "check"],
      ["Customer agent", "-", "-", "check", "check"],
      ["Live chat", "Includes HubSpot branding.", "Remove HubSpot branding.", "Additional features.", "Additional features."],
      ["Conversational bots", "Limited features.", "Limited features.", "Additional features.", "Additional features."],
      ["Facebook Messenger integration", "Send and receive messages.", "Remove HubSpot branding.", "Additional features.", "Custom options."],
      ["Calling", "-", "500 minutes per account.", "3,000 minutes per account.", "12,000 minutes per account."],
      ["HubSpot-provided phone numbers", "-", "1 number.", "Up to 3 numbers.", "Up to 5 numbers."],
      ["Call transcription and coaching", "-", "-", "Up to 750 hours per month.", "Up to 1,500 hours per month."],
      ["Coaching playbooks", "-", "-", "check", "check"],
      ["Interactive Voice Response", "-", "-", "check", "check"],
      ["Sales automation", "-", "Up to 50 workflows with limited triggers and actions.", "Up to 300 workflows.", "Up to 1,000 workflows with custom triggers and actions."],
      ["ABM tools and automation", "-", "-", "check", "check"],
      ["LinkedIn Sales Navigator and CRM Sync", "-", "-", "check", "check"],
      ["Lead scoring", "-", "-", "Up to 5 scores.", "Up to 10 scores."],
      ["Sequences", "-", "-", "Up to 5,000 sequences and 500 daily email sends.", "Up to 5,000 sequences and 1,000 daily email sends."],
    ],
  },
  {
    title: "Close Deals",
    rows: [
      ["Pipelines", "-", "Up to 15 pipelines.", "Up to 100 pipelines.", "Up to 350 pipelines."],
      ["Deal summaries", "-", "-", "check", "check"],
      ["Deal Progression (BETA)", "-", "-", "check", "check"],
      ["Pipeline approvals for Deals", "-", "-", "-", "check"],
      ["Deal splits", "-", "-", "-", "check"],
      ["Deal Plans (BETA)", "-", "-", "check", "check"],
      ["Meeting scheduling", "1 personal meeting link with HubSpot branding.", "Up to 1,000 personal and team meeting links.", "Up to 1,000 meeting links.", "Up to 1,000 meeting links."],
      ["Product library", "Limited features.", "Up to 1,000 products.", "Up to 15,000 products.", "Up to 15,000 products."],
      ["Sales workspace", "-", "Limited features.", "Additional features.", "Additional features."],
      ["Reporting dashboard", "10 dashboards, 50 reports per dashboard.", "30 dashboards, 50 reports per dashboard.", "75 dashboards, 50 reports per dashboard.", "100 dashboards, 50 reports per dashboard."],
      ["Sales analytics", "-", "check", "check", "check"],
      ["Custom reporting", "-", "-", "Up to 100 custom reports and 10M events.", "Up to 500 custom reports and 100M events."],
      ["Deal journey analytics", "-", "-", "-", "10 stages, 10 steps, and 36 months of data."],
      ["Goals", "-", "Limited features.", "Template goals.", "Template and custom goals."],
      ["Custom Signals (BETA)", "-", "check", "check", "check"],
      ["Forecasting", "-", "-", "Create and track sales forecasts.", "Advanced forecasting and custom reporting."],
      ["Notetaker", "-", "check", "check", "check"],
      ["Meeting prep and recap", "-", "-", "check", "check"],
      ["Conversation intelligence", "-", "-", "Call transcription and analysis.", "Advanced call transcription and analysis."],
      ["Tracked terms", "-", "-", "Up to 5,000 tracked terms.", "Up to 5,000 tracked terms."],
      ["Playbooks", "-", "-", "Up to 5 playbooks.", "Up to 5,000 playbooks."],
      ["HubSpot Work (BETA)", "-", "Limited automation.", "Full automation.", "Full automation."],
      ["Standard sandbox account", "-", "-", "-", "One standard sandbox account."],
    ],
  },
];

const faqs = [
  {
    question: "What's the difference between Sales Hub and HubSpot Smart CRM?",
    answer: "Sales Hub adds sales-specific tools for prospecting, managing pipelines, and closing deals. Smart CRM focuses on unifying customer data, teams, and connected tools.",
  },
  {
    question: "How many users do I get with my Sales Hub plan?",
    answer: "Free tools include up to two users. Paid Sales Hub plans are priced per seat, so you can add seats to fit your team.",
  },
  {
    question: "How many HubSpot Credits do I get with my Sales Hub plan?",
    answer: "Sales Hub Starter includes 500 credits, Professional includes 3,000, and Enterprise includes 5,000 HubSpot Credits.",
  },
  {
    question: "What's the difference between Sales and Service Hub?",
    answer: "Sales Hub helps teams find prospects, manage deals, and grow revenue. Service Hub provides tools for customer support and service teams.",
  },
  {
    question: "What type of support does HubSpot offer?",
    answer: "Support options depend on your subscription. Paid plans include access to HubSpot support resources, with additional support options available on higher tiers.",
  },
  {
    question: "Does HubSpot offer discount pricing for startups and nonprofits?",
    answer: "Eligible startups and nonprofits may qualify for discounted pricing. Contact HubSpot to learn about current eligibility and offers.",
  },
];

function Check() {
  return <span className="pricing-check" aria-label="Included">✓</span>;
}

export default function SalesHub() {
  const [annual, setAnnual] = useState(true);
  const [creditSlide, setCreditSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);
  const [pageScrolled, setPageScrolled] = useState(false);
  const activeCreditSlide = creditSlides[creditSlide];

  useEffect(() => {
    const updateScrollState = () => setPageScrolled(window.scrollY > 110);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <>
      <Navbar hideOnScroll />
      <main className={`pricing-page sales-hub-page${pageScrolled ? " is-scrolled" : ""}`}>
        <aside className="pricing-sidebar">
          {sidebarSections.map(([section, links]) => (
            <section key={section}>
              <h3>{section}</h3>
              {links.map((link) => {
                if (link === "Create a Bundle") return <Link key={link} to="/pricing/bundle">{link}</Link>;
                if (link === "HubSpot for Marketers") return <Link key={link} to="/pricing/marketing-plus">{link}</Link>;
                if (link === "Smart CRM") return <Link key={link} to="/pricing/smart-crm">{link}</Link>;
                if (link === "Free Tools" || link === "Customer Platform") return <Link key={link} to="/pricing">{link}</Link>;
                if (link === "Sales") return <Link className="active" key={link} to="/pricing/sales">{link}</Link>;
                if (link === "Service") return <Link key={link} to="/pricing/service">{link}</Link>;
                if (link === "Content") return <Link key={link} to="/pricing/content">{link}</Link>;
                if (link === "Marketing") return <Link key={link} to="/pricing/marketing-plus">{link}</Link>;
                return <a key={link} href="#">{link}</a>;
              })}
            </section>
          ))}
          <div className="currency-picker"><button className="currency" type="button">INR (Rs) <span>⌄</span></button></div>
        </aside>

        <div className="pricing-main">
          <div className="starter-banner sales-banner">
            <div>
              <strong>Manage your full revenue journey in one place with HubSpot for Marketers.</strong>
              <p>Get Marketing Hub Professional or Enterprise with Content Hub Professional or Enterprise, for one powerful price.</p>
            </div>
            <Link to="/pricing/marketing-plus">Explore HubSpot for Marketers ↗</Link>
          </div>

          <div className="pricing-heading sales-heading">
            <h1>Sales Hub</h1>
            <p>Sales software that helps your team build pipeline, close deals, and grow revenue.</p>
          </div>

          <div className="plan-grid sales-plan-grid" id="sales-plans">
            {plans.map((plan) => (
              <article className="plan-card sales-plan-card" key={plan.name}>
                <h2>{plan.name}</h2>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  {plan.name !== "Free" && <small>Starts at</small>}
                  <strong>{plan.price}<span>{plan.period}</span></strong>
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
                ) : <div className="sales-toggle-spacer" aria-hidden="true" />}
                <Link className="plan-button sales-plan-button" to="/contact">{plan.button} ↗</Link>
                {plan.name === "Starter" || plan.name === "Professional" ? (
                  <Link className="plan-secondary sales-plan-button" to="/contact">Talk to Sales ↗</Link>
                ) : null}
                <div className="plan-details sales-plan-details">
                  {plan.credits && <p className="plan-metric">{plan.credits} ⓘ</p>}
                  {plan.name === "Free" ? (
                    <ul className="free-features">{plan.freeFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  ) : (
                    <>
                      <p className="details-heading"><strong>{plan.includes}</strong></p>
                      <ul className="plan-feature-list">{plan.features.map((feature) => <li key={feature}><strong>{feature}</strong></li>)}</ul>
                      {plan.note && <p className="plan-onboarding-note">{plan.note} <a href="#">Learn more ↗</a></p>}
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="tax-note sales-tax">*Price shown in INR and subject to applicable tax.</p>

          <section className="credits-card sales-credits">
            <div className="credits-copy">
              <h2>HubSpot Credits:</h2>
              <h3>Power features and agents that do work for you</h3>
              <p>HubSpot has powerful AI agents and features that do work for you. You can take advantage of these features with HubSpot Credits. Buy credits in packs to easily plan your spend or pay-as-you-go for added flexibility.</p>
              <svg className="credits-flower" viewBox="0 0 170 190" role="img" aria-label="Illustration of a flower growing from coins">
                <g fill="none" stroke="#1b4145" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M88 145c-10-42 2-68 5-94M91 115c-24-14-35-9-45-5 12 16 26 21 45 14M94 93c16-16 31-20 45-18-6 17-20 26-44 27" />
                  <path d="M83 47c-6-15 2-24 13-27 4 12 1 21-10 30M94 47c4-17 16-21 27-16-3 13-11 20-26 22M84 49c-16-7-17-19-9-28 11 7 15 16 12 29M91 44c-3-18 7-26 19-25 1 14-5 22-18 28" fill="#ff6a3d" />
                  <ellipse cx="70" cy="158" rx="43" ry="12" fill="#fff" /><ellipse cx="101" cy="162" rx="43" ry="12" fill="#fff" /><ellipse cx="85" cy="172" rx="43" ry="12" fill="#fff" />
                  <path d="M29 158v7c3 13 77 13 82 0v-7M59 162v7c3 13 77 13 82 0v-7M43 172v7c3 13 77 13 82 0v-7" />
                  <ellipse cx="70" cy="158" rx="43" ry="12" stroke="#ff5a1f" /><ellipse cx="101" cy="162" rx="43" ry="12" stroke="#ff5a1f" /><ellipse cx="85" cy="172" rx="43" ry="12" stroke="#ff5a1f" />
                </g>
              </svg>
            </div>
            <div className="credits-agent">
              <span className="credits-agent-label">AI Agents</span>
              <button className="credits-slide-arrow previous" type="button" aria-label="Previous AI agent slide" onClick={() => setCreditSlide((creditSlide + creditSlides.length - 1) % creditSlides.length)}>‹</button>
              <button className="credits-slide-arrow next" type="button" aria-label="Next AI agent slide" onClick={() => setCreditSlide((creditSlide + 1) % creditSlides.length)}>›</button>
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
                    <div className="preview-response"><b>Breeze {activeCreditSlide.name}</b><span>TOTAL CREDITS USED</span><strong>25,400</strong></div>
                  </div>
                </div>
                <div className="agent-slide-stats">
                  <div><strong>{activeCreditSlide.metric}</strong><span>{activeCreditSlide.metricLabel}</span></div>
                  <div><strong>{activeCreditSlide.secondMetric}</strong><span>{activeCreditSlide.secondMetricLabel}</span></div>
                </div>
              </article>
              <div className="credits-slide-dots" aria-label={`Slide ${creditSlide + 1} of ${creditSlides.length}`}>
                {creditSlides.map((slide, index) => <button key={slide.name} type="button" className={index === creditSlide ? "active" : ""} aria-label={`Show ${slide.name}`} onClick={() => setCreditSlide(index)} />)}
              </div>
            </div>
            <div className="credits-simple">
              <div className="credit-principle"><h3><b>✦</b> Simple</h3><ul><li>Pay when work gets done. Credits are used when features take action across the platform.</li><li>Get a clear view of every action taken and pause features when priorities change.</li></ul></div>
              <div className="credit-principle"><h3><b>✦</b> Predictable</h3><ul><li>You decide how much each feature can spend, and when to stop.</li><li>Adjust default spend controls to match your budget and set action-level credit limits.</li></ul></div>
            </div>
          </section>

          <section className="comparison comparison-sales" id="sales-comparison">
            {comparisonSections.map((section) => (
              <div className="comparison-section" key={section.title}>
                <div className="comparison-head">
                  <h2>{section.title}</h2>
                  <div className="sticky-plan-head">
                    {plans.map((plan) => (
                      <div key={plan.name}>
                        <b>{plan.name}</b>
                        <strong>{plan.price}{plan.period}</strong>
                        <Link to="/contact">{plan.name === "Free" ? "Get started free" : plan.name === "Enterprise" ? "Talk to Sales" : "Buy now"}</Link>
                      </div>
                    ))}
                  </div>
                </div>
                {section.rows.map(([feature, ...values]) => (
                  <div className="comparison-row" key={feature}>
                    <div className="feature-name">{feature}</div>
                    {values.map((value, index) => (
                      <div className="feature-cell" key={`${feature}-${index}`}>{value === "check" ? <Check /> : value}</div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </section>

          <div className="sales-catalog">Looking for the full list of features? <a href="#">View the Sales Hub product and services catalog ↗</a></div>
          <div className="integration-call pricing-help"><h3>Want to see how Sales Hub works?</h3><Link to="/contact">Talk to our sales team ↗</Link></div>
          <section className="integration-banner">
            <div><h2>Connect Sales Hub to the tools your team already uses.</h2><p>Explore hundreds of integrations in the HubSpot App Marketplace.</p><Link to="/contact">Browse integrations ↗</Link></div>
            <div className="integration-art" aria-hidden="true"><span className="integration-logo slack">✣</span><span className="integration-logo zapier">zapier</span><span className="integration-logo mailchimp">mailchimp</span><span className="integration-logo ads">Google Ads</span><span className="integration-logo shopify">S</span><span className="integration-logo gmail">M</span><span className="integration-logo hubspot">✥</span></div>
          </section>

          <section className="faq-section sales-faq">
            <h2>Frequently asked questions</h2>
            {faqs.map((faq, index) => (
              <article className="faq-item" key={faq.question}>
                <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span className="sales-faq-chevron" aria-hidden="true">{openFaq === index ? "⌄" : "›"}</span>
                  <span className="sales-faq-question">{faq.question}</span>
                </button>
                {openFaq === index && <p>{faq.answer}</p>}
              </article>
            ))}
          </section>
          <div className="faq-contact">
            <h3>Still have questions about how HubSpot's software can help your business?</h3>
            <a href="tel:+0008000502669"><span aria-hidden="true">☎</span> +0 (008) 000-502669</a>
          </div>
        </div>
      </main>
    </>
  );
}
