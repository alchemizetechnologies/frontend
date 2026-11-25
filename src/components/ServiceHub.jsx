import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Pricing.css";
import "./ServiceHub.css";

const sidebarSections = [
  ["Platform Solutions", ["Customer Platform", "Free Tools", "Create a Bundle", "HubSpot for Marketers"]],
  ["Products", ["Smart CRM", "Marketing", "Sales", "Service", "Content", "Data", "Revenue", "Commerce Hub", "Operations Hub", "Breeze", "App Marketplace"]],
];

const plans = [
  {
    name: "Free",
    description: "Start crafting better customer experiences — for free.",
    price: "₹0",
    period: "/mo",
    button: "Get started free",
    freeFeatures: ["Free Marketing tools", "Free Sales tools", "Free Service tools", "Free Content tools", "Free Data tools", "Free Revenue tools"],
    userNote: "Free for up to 2 users. No credit card required.",
  },
  {
    name: "Starter",
    description: "Essential marketing, sales, service, content, and data management software",
    price: "₹585",
    period: "/mo/seat",
    oldPrice: "₹1,670/mo/seat",
    credits: "500 HubSpot Credits",
    includes: "Free tools with increased limits, plus remove HubSpot branding from:",
    features: ["Live chat", "Agent Hub", "Agent Builder", "Ticketing", "Calling", "Meeting scheduling"],
    note: "Discounts available for new customers only.",
    billingToggle: true,
    button: "Buy now",
  },
  {
    name: "Professional",
    description: "Comprehensive help desk and customer success software to scale support and drive retention",
    price: "₹7,497",
    period: "/mo/seat",
    oldPrice: "₹8,330/mo/seat",
    credits: "3,000 HubSpot Credits",
    includes: "Service Hub Starter, plus:",
    features: ["Customer agent", "Help Desk Workspace", "Customer success workspace", "Knowledge base", "Customer portal", "Customer feedback surveys"],
    onboarding: "Cost shown does not include the required, one-time Professional Onboarding for a fee of ₹125,000.",
    billingToggle: true,
    button: "Buy now",
  },
  {
    name: "Enterprise",
    description: "Our most powerful help desk and customer success software with advanced routing and enterprise-grade controls",
    price: "₹12,500",
    period: "/mo/seat",
    credits: "5,000 HubSpot Credits",
    includes: "Service Hub Professional, plus:",
    features: ["Conditional SLAs", "Customer journey analytics", "Skill-based Routing", "Capacity Limits", "Standard sandbox account"],
    onboarding: "Cost shown does not include the required, one-time Enterprise Onboarding for a fee of ₹292,000.",
    button: "Talk to Sales",
  },
];

const creditSlides = [
  {
    name: "Customer Agent",
    description: "Answer customer questions instantly across every channel, and escalate to your team whenever a person is needed.",
    metric: "65%+",
    metricLabel: "of conversations resolved automatically",
    secondMetric: "39%",
    secondMetricLabel: "faster ticket resolution",
  },
  {
    name: "Knowledge Base Agent",
    description: "Help customers find accurate answers using the knowledge and support content your team already trusts.",
    metric: "24/7",
    metricLabel: "always-on customer assistance",
    secondMetric: "Faster",
    secondMetricLabel: "answers from your knowledge base",
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
    name: "Prospecting Agent",
    description: "Spot buying signals, research target accounts, and give your team more context for every conversation.",
    metric: "24/7",
    metricLabel: "always-on prospecting support",
    secondMetric: "More",
    secondMetricLabel: "time for meaningful conversations",
  },
];

const comparisonSections = [
  {
    title: "Scale Support",
    rows: [
      ["Live chat", "Includes HubSpot branding.", "Remove HubSpot branding.", "Remove HubSpot branding.", "Remove HubSpot branding."],
      ["Conversational bots", "Limited features.", "Limited features.", "Additional features.", "Additional features."],
      ["Facebook Messenger integration", "Send and receive simple messages and quick replies.", "Remove HubSpot branding.", "Includes advanced Messenger bot branching and advanced reporting.", "Use code snippets for custom Messenger bot actions."],
      ["Capacity Limits", "-", "-", "check", "Up to 99 active chats."],
      ["Logged-in visitor identification", "-", "-", "check", "check"],
      ["Ticketing", "check", "check", "check", "check"],
      ["Calling", "-", "500 minutes.", "3,000 minutes.", "12,000 minutes."],
      ["HubSpot-provided phone numbers", "-", "1 phone number. Not supported in all countries.", "Up to 3 phone numbers. Not supported in all countries.", "Up to 5 phone numbers. Not supported in all countries."],
      ["Call transcription and coaching", "-", "-", "750 hours of transcription per account per month.", "1,500 hours of transcription per account per month."],
      ["Interactive Voice Response", "-", "-", "check", "check"],
      ["Agent Hub", "-", "check", "check", "check"],
      ["Agent Builder", "-", "Build and deploy custom agents with simple automation tailored to your business.", "Build and deploy custom agents with simple automation and event-based triggers.", "Build and deploy custom agents with advanced automation and event-based triggers."],
      ["Prospecting agent", "-", "check", "check", "check"],
      ["Data Agent", "-", "check", "check", "check"],
      ["Knowledge Base Agent (Beta)", "-", "-", "check", "check"],
      ["Customer agent", "-", "-", "check", "check"],
      ["Help Desk Workspace", "-", "-", "check", "check"],
      ["Custom Channels API", "-", "-", "check", "check"],
      ["Help Desk Spaces", "-", "-", "check", "check"],
      ["Macros", "-", "-", "500 macros.", "1,500 macros."],
      ["WhatsApp integration", "-", "-", "Up to 1,000 messages per month.", "Up to 1,000 messages per month."],
      ["Skill-based Routing", "-", "-", "-", "check"],
      ["Reply Recommendations", "-", "-", "check", "check"],
      ["Quality assurance score (Beta)", "-", "-", "-", "Unavailable for Sensitive Data accounts due to additional legal, compliance, and AI-processing requirements."],
      ["Customer experience score (Beta)", "-", "-", "check", "Unavailable for Sensitive Data accounts due to additional legal, compliance, and AI-processing requirements."],
      ["Handoff Summaries (Beta)", "-", "-", "check", "check"],
      ["SLAs", "-", "-", "check", "check"],
      ["Conditional SLAs", "-", "-", "-", "check"],
      ["Knowledge base", "-", "-", "1 knowledge base per account with up to 2,000 articles.", "25 knowledge bases per account with up to 10,000 total articles."],
      ["Knowledge base single sign-on", "-", "-", "Up to 2 access groups for private knowledge base.", "Up to 100 access groups for private knowledge base."],
      ["Reporting dashboard", "10 dashboards, 50 reports per dashboard.", "30 dashboards, 50 reports per dashboard.", "75 dashboards, 50 reports per dashboard.", "100 dashboards, 50 reports per dashboard."],
      ["Service analytics", "-", "check", "check", "check"],
      ["Insights dashboard", "-", "-", "check", "check"],
      ["Custom reporting", "-", "-", "Up to 100 custom reports and 10 million events per query.", "Up to 500 custom reports and 100 million events per query."],
      ["Customer journey analytics", "-", "-", "-", "Up to 15 stages and 60 months of data, or 20 million events."],
    ],
  },
  {
    title: "Drive Retention",
    rows: [
      ["1-to-1 email", "Includes HubSpot branding.", "HubSpot branding removed.", "HubSpot branding removed.", "HubSpot branding removed."],
      ["Canned snippets", "Up to 3 snippets.", "Up to 5,000 snippets.", "Up to 5,000 snippets.", "Up to 5,000 snippets."],
      ["Email templates", "Up to 3 email templates per account.", "Up to 10,000 email templates per account.", "Up to 10,000 email templates per account.", "Up to 10,000 email templates per account."],
      ["1:1 video messaging", "-", "-", "check", "check"],
      ["Meeting scheduling", "Maximum of 1 personal meeting link. Includes HubSpot branding.", "1,000 personal and team meeting links. Remove HubSpot branding.", "1,000 personal and team meeting links. Remove HubSpot branding.", "1,000 personal and team meeting links. Remove HubSpot branding."],
      ["Notetaker", "-", "check", "check", "check"],
      ["Customer success workspace", "-", "-", "check", "check"],
      ["Health Scores", "-", "-", "50 scores.", "50 scores."],
      ["Handoff briefing", "-", "-", "check", "check"],
      ["HubSpot Work (Beta)", "-", "Limited automation.", "Full automation.", "Full automation."],
      ["Customer feedback surveys", "-", "-", "50 NPS surveys, 50 CES surveys, and 100 CSAT surveys.", "50 NPS surveys, 50 CES surveys, and 100 CSAT surveys."],
      ["Feedback Topics", "-", "-", "This feature does not use HubSpot Credits at this time.", "This feature does not use HubSpot Credits at this time."],
      ["Post-chat feedback", "-", "-", "check", "check"],
      ["Custom surveys", "-", "-", "100 custom surveys with unlimited questions and multiple question types. Share survey links by email.", "100 custom surveys with unlimited questions and multiple question types. Share survey links by email."],
      ["Goals", "-", "-", "Template goals.", "Template and custom goals."],
      ["Conversation intelligence", "-", "-", "check", "Includes tracked terms."],
      ["Coaching Playlists", "-", "-", "check", "check"],
      ["Playbooks", "-", "-", "Create up to 5 playbooks and capture notes.", "Create up to 5,000 playbooks, embed properties, and capture notes."],
      ["Forecasting", "-", "-", "Default and custom forecasting and reporting.", "Default and custom forecasting and reporting, including forecasting across team hierarchies."],
      ["Sequences", "-", "-", "5,000 sequences per account and up to 500 email sends per user per day.", "5,000 sequences per account and up to 1,000 email sends per user per day. Trigger sequences via workflows."],
      ["Custom events", "-", "-", "-", "Limited to 500 event definitions and 30 million completions per month."],
      ["Product Usage Tracking (Beta)", "-", "-", "10 activation or usage events per portal.", "10 activation or usage events per portal."],
    ],
  },
];

const faqs = [
  "What is Service Hub?",
  "How many users do I get with my Service Hub plan?",
  "How many HubSpot Credits do I get with my Service Hub plan?",
  "What's the difference between Sales and Service Hub?",
  "What type of support does HubSpot offer?",
  "Does HubSpot offer discount pricing for startups and nonprofits?",
];

function Check() {
  return <span className="pricing-check" aria-label="Included">✓</span>;
}

export default function ServiceHub() {
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
      <main className={`pricing-page service-hub-page${pageScrolled ? " is-scrolled" : ""}`}>
        <aside className="pricing-sidebar">
          {sidebarSections.map(([section, links]) => (
            <section key={section}>
              <h3>{section}</h3>
              {links.map((link) => {
                if (link === "Create a Bundle") return <Link key={link} to="/pricing/bundle">{link}</Link>;
                if (link === "HubSpot for Marketers") return <Link key={link} to="/pricing/marketing-plus">{link}</Link>;
                if (link === "Smart CRM") return <Link key={link} to="/pricing/smart-crm">{link}</Link>;
                if (link === "Sales") return <Link key={link} to="/pricing/sales">{link}</Link>;
                if (link === "Free Tools" || link === "Customer Platform") return <Link key={link} to="/pricing">{link}</Link>;
                if (link === "Service") return <Link className="active" key={link} to="/pricing/service">{link}</Link>;
                if (link === "Marketing") return <Link key={link} to="/pricing/marketing-plus">{link}</Link>;
                if (link === "Content") return <Link key={link} to="/pricing/content">{link}</Link>;
                return <a key={link} href="#">{link}</a>;
              })}
            </section>
          ))}
          <div className="currency-picker"><button className="currency" type="button">INR (Rs) <span>⌄</span></button></div>
        </aside>

        <div className="pricing-main">
          <div className="starter-banner service-banner">
            <div>
              <strong>14-day unlimited free access to Customer Agent</strong>
              <p>When you purchase at least 1 Service Professional or Enterprise Seat, use Customer Agent free for 14 days. No restrictions on the number of messages or features. Completely free for 14 days.</p>
            </div>
          </div>

          <div className="pricing-heading service-heading">
            <h1><svg viewBox="0 0 42 36" role="img" aria-label="Service Hub"><path d="M21 32 5.4 17.1C-2 9.6 8.6-.7 16 6.4l5 4.7 5-4.7c7.4-7.1 18 3.2 10.6 10.7L21 32Z" /><path d="M3 19h8l4-7 6 14 4-7h14" /></svg>Service Hub</h1>
            <p>Delight customers and grow your business with customer service software. <Link to="/pricing/bundle">Calculate your price</Link></p>
          </div>

          <div className="plan-grid service-plan-grid" id="service-plans">
            {plans.map((plan) => (
              <article className="plan-card service-plan-card" key={plan.name}>
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
                ) : <div className="service-toggle-spacer" aria-hidden="true" />}
                <Link className="plan-button service-plan-button" to="/contact">{plan.button} ↗</Link>
                {plan.name === "Starter" || plan.name === "Professional" ? (
                  <Link className="plan-secondary service-plan-button" to="/contact">Talk to Sales ↗</Link>
                ) : null}
                <div className="plan-details service-plan-details">
                  {plan.userNote && <p className="plan-user-note">{plan.userNote}</p>}
                  {plan.credits && <p className="plan-metric">{plan.credits} ⓘ</p>}
                  {plan.name === "Free" ? (
                    <>
                      <p className="details-heading"><strong>Includes:</strong></p>
                      <ul className="free-features">{plan.freeFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                    </>
                  ) : (
                    <>
                      <p className="details-heading"><strong>{plan.includes}</strong></p>
                      <ul className="plan-feature-list">{plan.features.map((feature) => <li key={feature}><strong>{feature}</strong></li>)}</ul>
                      {plan.note && <p className="plan-onboarding-note">{plan.note}</p>}
                      {plan.onboarding && <p className="plan-onboarding-note">{plan.onboarding} <a href="#">Learn more ↗</a></p>}
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="tax-note service-tax">*Price shown in INR and subject to applicable tax.</p>
          <p className="service-view-plans"><a href="#service-comparison">View Professional &amp; Enterprise plans</a></p>

          <section className="credits-card service-credits">
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
                      <div><span>Knowledge Base Agent</span><span>428</span><i>Active</i></div>
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

          <section className="comparison comparison-service" id="service-comparison">
            {comparisonSections.map((section) => (
              <div className="comparison-section" key={section.title}>
                <div className="comparison-head">
                  <h2>{section.title}</h2>
                  <div className="sticky-plan-head">
                    {plans.map((plan) => (
                      <div key={plan.name}>
                        <b>{plan.name === "Free" ? "Free tools" : plan.name}</b>
                        <strong>{plan.name === "Free" ? "" : `${plan.price}${plan.period}`}</strong>
                        <Link to="/contact">{plan.name === "Free" ? "Get started free" : plan.name === "Enterprise" ? "Talk to Sales ↗" : "Buy now"}</Link>
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

          <p className="service-catalog">
            View the <a href="#">Product &amp; Services Catalog ↗</a> for full technical limits and definitions
          </p>
          <div className="service-plan-help">
            <h3>Need help choosing a plan?</h3>
            <a href="tel:+0008000503669"><span aria-hidden="true">☎</span> +0 (008) 000-503669</a>
          </div>
          <section className="integration-banner">
            <div><h2>Connect Service Hub to the tools your team already uses.</h2><p>Explore hundreds of integrations in the HubSpot App Marketplace.</p><Link to="/contact">Browse integrations ↗</Link></div>
            <div className="integration-art" aria-hidden="true"><span className="integration-logo slack">✣</span><span className="integration-logo zapier">zapier</span><span className="integration-logo mailchimp">mailchimp</span><span className="integration-logo ads">Google Ads</span><span className="integration-logo shopify">S</span><span className="integration-logo gmail">M</span><span className="integration-logo hubspot">✥</span></div>
          </section>
          <section className="faq-section service-faq">
            <h2>Frequently asked questions</h2>
            {faqs.map((faq, index) => (
              <article className="faq-item" key={faq}>
                <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span className="service-faq-chevron" aria-hidden="true">{openFaq === index ? "⌄" : "›"}</span>
                  <span className="service-faq-question">{faq}</span>
                </button>
                {openFaq === index && <p>{faq.replace("?", "")} depends on your Service Hub subscription and selected plan. Contact our sales team for details.</p>}
              </article>
            ))}
          </section>
          <div className="faq-contact">
            <h3>Still have questions about how HubSpot's software can help your business?</h3>
            <a href="tel:+0008000503669"><span aria-hidden="true">☎</span> +0 (008) 000-503669</a>
          </div>
        </div>
      </main>
    </>
  );
}
