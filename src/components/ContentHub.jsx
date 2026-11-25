import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Pricing.css";
import "./ContentHub.css";

const sidebarSections = [
  ["Platform Solutions", ["Customer Platform", "Free Tools", "Create a Bundle", "HubSpot for Marketers"]],
  ["Products", ["Smart CRM", "Marketing", "Sales", "Service", "Content", "Data", "Revenue", "Commerce Hub", "Operations Hub", "Breeze", "App Marketplace"]],
];

const plans = [
  {
    name: "Free",
    description: "Get started with content marketing and launch a website — for free.",
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
    features: ["Website pages", "Landing pages", "Live chat", "Agent Hub", "Blog", "Content library", "Drag-and-drop editor", "Cookie Management Tools", "Design manager"],
    note: "Discounts available for new customers only.",
    billingToggle: true,
    button: "Buy now",
  },
  {
    name: "Professional",
    description: "Comprehensive content marketing software to leverage and scale results from content",
    price: "₹37,530",
    period: "/mo",
    oldPrice: "₹41,700/mo",
    seats: "Includes 3 Core Seats",
    extraSeats: "Additional Core Seats start at ₹3,753/mo",
    credits: "3,000 HubSpot Credits",
    includes: "Content Hub Starter, plus:",
    features: ["Memberships", "Smart content for pages", "A/B testing", "Content remix BETA", "Podcasts", "Video creation & editing"],
    billingToggle: true,
    primaryButton: "Talk to Sales",
    secondaryButton: "Start 14-day trial",
  },
  {
    name: "Enterprise",
    description: "Our most powerful content marketing software for advanced control and flexibility",
    price: "₹125,000",
    period: "/mo",
    seats: "Includes 5 Core Seats",
    extraSeats: "Additional Core Seats start at ₹6,250/mo",
    credits: "5,000 HubSpot Credits",
    includes: "Content Hub Professional, plus:",
    features: ["Activity logging", "Content Sync BETA", "Organize teams", "Multisites", "Limit access to content and data", "Content Approvals", "Serverless functions"],
    primaryButton: "Talk to Sales",
    secondaryButton: "Start 14-day trial",
  },
];

const agentSlides = [
  {
    name: "Content Agent",
    description: "Create helpful content and keep your messaging consistent across campaigns, channels, and customer journeys.",
    metric: "On-brand",
    metricLabel: "content for every channel",
    secondMetric: "Less",
    secondMetricLabel: "time spent on repetitive work",
  },
  {
    name: "Customer Agent",
    description: "Answer customer questions instantly across every channel, and escalate to your team whenever a person is needed.",
    metric: "65%+",
    metricLabel: "of conversations resolved automatically",
    secondMetric: "39%",
    secondMetricLabel: "faster ticket resolution",
  },
  {
    name: "Prospecting Agent",
    description: "Spot buying signals, research target accounts, and give your team more context for every conversation.",
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
];

const comparisonRows = [
  ["Agent Hub", "-", "check", "check", "check"],
  ["Agent Builder", "-", "Build and deploy custom agents with simple automation tailored to your business.", "Build and deploy custom agents with advanced automation and event-based triggers.", "Build and deploy custom agents with advanced automation and event-based triggers."],
  ["Prospecting agent", "-", "check", "check", "check"],
  ["Data Agent", "-", "check", "check", "check"],
  ["Customer agent", "-", "-", "check", "check"],
  ["Ad management", "3 connected accounts. Website audience creation only.", "3 connected accounts. Advanced website audiences and 2 contact and company list audiences.", "500 connected accounts, 5 contact and company list audiences, and 50 ad conversion events.", "500 connected accounts, 15 contact and company list audiences, and 100 ad conversion events."],
  ["AI assistants", "-", "check", "check", "check"],
  ["AI image generator", "-", "check", "check", "check"],
  ["Blog", "One blog on the same subdomain as your website. Up to 100 blog posts, 20 authors, and 50 tags. Includes HubSpot branding.", "One blog on the same subdomain as your website. Up to 10,000 blog posts, 20 authors, and 50 tags. Remove HubSpot branding.", "Up to 100 blogs on unlimited subdomains. Up to 10,000 blog posts, 2,000 authors, and 5,000 tags. Remove HubSpot branding.", "Up to 100 blogs on unlimited subdomains. Up to 10,000 blog posts, 2,000 authors, and 5,000 tags. Remove HubSpot branding."],
  ["Built-in AMP support for blogs", "check", "check", "check", "check"],
  ["CTAs", "-", "No custom targeting by device type, country, referral URL, etc.", "Includes custom targeting by device type, country, referral URL, and more.", "Includes custom targeting by device type, country, referral URL, and more."],
  ["Landing pages", "Up to 30 total landing pages. Includes HubSpot branding.", "Up to 30 total landing pages. Includes custom templates. Remove HubSpot branding.", "Up to 10,000 landing pages with custom templates, smart content, A/B testing, adaptive testing, and SEO recommendations.", "Up to 10,000 landing pages with custom templates, smart content, A/B testing, adaptive testing, and SEO recommendations."],
  ["Live chat", "Includes HubSpot branding.", "Remove HubSpot branding.", "Remove HubSpot branding.", "Remove HubSpot branding."],
  ["Conversational bots", "Limited features.", "Additional features.", "Additional features.", "Additional features."],
  ["Facebook Messenger integration", "Send and receive simple messages and quick replies.", "Remove HubSpot branding.", "Includes advanced Messenger bot branching and advanced reporting.", "Use code snippets for custom Messenger bot actions."],
  ["Logged-in visitor identification", "-", "-", "check", "check"],
  ["Draggable chat widget", "-", "-", "check", "check"],
  ["Website pages", "Up to 30 total website pages. Includes HubSpot branding. Favicon is not customizable.", "Up to 30 total website pages. Remove HubSpot branding.", "Up to 10,000 website pages with smart content, A/B testing, adaptive testing, and SEO recommendations.", "Up to 10,000 website pages with smart content, A/B testing, adaptive testing, and SEO recommendations."],
  ["99.95% measured uptime", "check", "check", "check", "check"],
  ["Advanced menus", "Applies to website pages and blog posts. Does not include landing pages.", "Applies to website pages and blog posts. Does not include landing pages.", "Applies to website pages and blog posts. Does not include landing pages.", "Applies to website pages and blog posts. Does not include landing pages."],
  ["Apex hosting and redirects", "check", "check", "check", "check"],
  ["Automatically-generated XML sitemap", "check", "check", "check", "check"],
  ["Cookie Management Tools", "Create up to 100 consent banners with geotargeting rules, languages, and banner templates. Includes GPC signal support.", "Create up to 100 consent banners with geotargeting rules, languages, and banner templates. Includes GPC signal support.", "Create up to 100 consent banners with geotargeting rules, languages, and banner templates. Remove HubSpot branding.", "Create up to 100 consent banners with geotargeting rules, languages, and banner templates. Remove HubSpot branding."],
  ["Connect a custom domain", "check", "check", "check", "check"],
  ["Custom domain security settings", "check", "check", "check", "check"],
  ["Design manager", "check", "check", "check", "check"],
  ["Drag-and-drop editor", "check", "check", "check", "check"],
  ["Local website development", "check", "check", "check", "check"],
  ["Mobile optimization", "check", "check", "check", "check"],
  ["Premium hosting", "check", "check", "check", "check"],
  ["Site export", "check", "check", "check", "check"],
  ["Website structure import", "check", "check", "check", "check"],
  ["Content staging", "-", "-", "check", "check"],
  ["Site tree", "-", "-", "check", "check"],
  ["Code alerts", "-", "-", "-", "check"],
  ["Multisites", "-", "-", "-", "Includes your core domain plus 9 additional root domains."],
  ["Content library", "Includes content library module, with HubSpot branding.", "Includes content library module. Remove HubSpot branding.", "Includes content library module and the ability to gate it behind a login. Remove HubSpot branding.", "Includes content library module and the ability to gate it behind a login. Remove HubSpot branding."],
  ["URL mappings", "-", "check", "check", "check"],
  ["Smart content for pages", "-", "-", "check", "check"],
  ["Content embed", "-", "-", "Up to 3 blocks per page.", "Up to 3 blocks per page."],
  ["A/B testing", "-", "-", "check", "check"],
  ["Adaptive testing", "-", "-", "Test up to 5 page variations at a time.", "Test up to 5 page variations at a time."],
  ["AI translation", "-", "-", "Automatically translate content.", "Automatically translate content."],
  ["Content remix (Beta)", "-", "-", "Generate up to 20 pieces of content per day.", "Generate up to 50 pieces of content per day."],
  ["Podcasts", "-", "-", "Up to 5 podcasts and 1,000 podcast episodes.", "Up to 50 podcasts and 5,000 podcast episodes."],
  ["Video creation & editing", "-", "-", "check", "check"],
  ["Multi-language content creation", "Up to 3 HubSpot-supported languages.", "Up to 50 HubSpot-supported languages.", "Unlimited HubSpot-supported languages.", "Unlimited HubSpot-supported languages."],
  ["Content Sync (Beta)", "-", "-", "-", "check"],
];

const manageContentRows = [
  ["Reporting dashboard", "10 dashboards, 50 reports per dashboard.", "30 dashboards, 50 reports per dashboard.", "75 dashboards, 50 reports per dashboard.", "100 dashboards, 50 reports per dashboard."],
  ["Website traffic analytics", "Standard web analytics dashboard.", "Standard web analytics dashboard.", "Customizable website traffic analytics.", "Customizable website traffic analytics."],
  ["Content attribution", "-", "-", "Track up to 10,000 logged contact interactions.", "Track up to 10,000 logged contact interactions."],
  ["SEO analytics", "-", "-", "check", "check"],
  ["Google Search Console integration", "-", "-", "check", "check"],
  ["SEO recommendations & optimizations", "Basic recommendations.", "Basic recommendations.", "Advanced recommendations, full site auditing, and topics.", "Advanced recommendations, full site auditing, and topics."],
  ["HubDB", "-", "-", "check", "check"],
  ["Dynamic pages", "-", "-", "check", "check"],
  ["Memberships", "-", "-", "Up to 2 access groups.", "Up to 100 access groups."],
  ["Member blog", "-", "-", "Up to 2 access groups.", "Up to 100 access groups."],
  ["Password-protected pages", "-", "-", "check", "check"],
  ["Video hosting & management", "-", "-", "Up to 150 videos.", "Up to 500 videos."],
  ["Content Approvals", "-", "-", "-", "check"],
  ["Serverless functions", "-", "-", "-", "check"],
];

const faqs = [
  "What is Content Hub?",
  "Can I use Content Hub with my existing website CMS (e.g., WordPress)?",
  "Can I create microsites or customer portals with Content Hub?",
  "How do I get my developers and IT comfortable with Content Hub?",
  "How do I migrate my existing website to Content Hub?",
  "How many users do I get with my Content Hub plan?",
  "How many HubSpot Credits do I get with my Content Hub plan?",
  "What type of support does HubSpot offer?",
  "Does HubSpot offer discount pricing for startups and nonprofits?",
];

function Check() {
  return <span className="pricing-check" aria-label="Included">✓</span>;
}

export default function ContentHub() {
  const [annual, setAnnual] = useState(true);
  const [agentSlide, setAgentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);
  const [pageScrolled, setPageScrolled] = useState(false);
  const activeAgent = agentSlides[agentSlide];

  useEffect(() => {
    const updateScrollState = () => setPageScrolled(window.scrollY > 110);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <>
      <Navbar hideOnScroll />
      <main className={`pricing-page content-hub-page${pageScrolled ? " is-scrolled" : ""}`}>
        <aside className="pricing-sidebar">
          {sidebarSections.map(([section, links]) => (
            <section key={section}>
              <h3>{section}</h3>
              {links.map((link) => {
                if (link === "Create a Bundle") return <Link key={link} to="/pricing/bundle">{link}</Link>;
                if (link === "HubSpot for Marketers") return <Link key={link} to="/pricing/marketing-plus">{link}</Link>;
                if (link === "Smart CRM") return <Link key={link} to="/pricing/smart-crm">{link}</Link>;
                if (link === "Sales") return <Link key={link} to="/pricing/sales">{link}</Link>;
                if (link === "Service") return <Link key={link} to="/pricing/service">{link}</Link>;
                if (link === "Free Tools" || link === "Customer Platform") return <Link key={link} to="/pricing">{link}</Link>;
                if (link === "Marketing") return <Link key={link} to="/pricing/marketing-plus">{link}</Link>;
                if (link === "Content") return <Link className="active" key={link} to="/pricing/content">{link}</Link>;
                return <a key={link} href="#">{link}</a>;
              })}
            </section>
          ))}
          <div className="currency-picker"><button className="currency" type="button">INR (Rs) <span>⌄</span></button></div>
        </aside>

        <div className="pricing-main">
          <div className="starter-banner content-banner">
            <div>
              <strong>Save up to 65% on Starter</strong>
              <p>Smarter tools, lower price. Get special Starter pricing when you choose a monthly or annual subscription. New customers only. Select offers available for a limited time.</p>
            </div>
            <Link to="/contact">Buy Now</Link>
          </div>

          <div className="pricing-heading content-heading">
            <h1><svg viewBox="0 0 34 36" role="img" aria-label="Content Hub"><path d="M5 5v26l22-13L5 5Z" /><circle cx="5" cy="5" r="3" /><circle cx="5" cy="31" r="3" /></svg>Content Hub</h1>
            <p>Create and manage content that fuels the entire customer journey. <Link to="/pricing/bundle">Calculate your price</Link></p>
          </div>

          <div className="plan-grid content-plan-grid" id="content-plans">
            {plans.map((plan) => (
              <article className="plan-card content-plan-card" key={plan.name}>
                <h2>{plan.name}</h2>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  {plan.name !== "Free" && <small>Starts at</small>}
                  <strong>{plan.price}<span>{plan.period}</span></strong>
                  {plan.oldPrice && <del>{plan.oldPrice}</del>}
                </div>
                {plan.seats && <p className="content-seats"><strong>{plan.seats}</strong><span>{plan.extraSeats}</span></p>}
                {plan.billingToggle ? (
                  <button className={`pay-switch ${annual ? "yearly" : ""}`} type="button" aria-label="Toggle billing commitment" aria-pressed={annual} onClick={() => setAnnual((value) => !value)}>
                    <span>Pay Monthly<br />Commit monthly</span><span>Pay Annually<br /><b>BEST VALUE</b></span>
                  </button>
                ) : <div className="content-toggle-spacer" aria-hidden="true" />}
                <Link className="plan-button content-plan-button" to="/contact">{plan.primaryButton || plan.button} ↗</Link>
                {plan.secondaryButton ? (
                  <Link className="plan-secondary content-plan-button" to="/contact">{plan.secondaryButton} ↗</Link>
                ) : plan.name === "Starter" ? (
                  <Link className="plan-secondary content-plan-button" to="/contact">Talk to Sales ↗</Link>
                ) : null}
                <div className="plan-details content-plan-details">
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
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="tax-note content-tax">*Price shown in INR and subject to applicable tax.</p>
          <p className="content-view-plans"><a href="#content-comparison">View Professional &amp; Enterprise plans</a></p>

          <section className="credits-card content-credits">
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
              <button className="credits-slide-arrow previous" type="button" aria-label="Previous AI agent slide" onClick={() => setAgentSlide((agentSlide + agentSlides.length - 1) % agentSlides.length)}>‹</button>
              <button className="credits-slide-arrow next" type="button" aria-label="Next AI agent slide" onClick={() => setAgentSlide((agentSlide + 1) % agentSlides.length)}>›</button>
              <article className="credits-agent-slide" aria-live="polite">
                <h3>{activeAgent.name}</h3>
                <p>{activeAgent.description} <a href="#">Learn more ↗</a></p>
                <div className={`agent-preview preview-${agentSlide}`} aria-hidden="true">
                  <div className="preview-toolbar"><i /><i /><i /><span>{activeAgent.name}</span></div>
                  <div className="preview-content">
                    <div className="preview-table">
                      <div><b>Agent</b><b>Tasks</b><b>Status</b></div>
                      <div><span>Content Agent</span><span>1,248</span><i>Active</i></div>
                      <div><span>Customer Agent</span><span>428</span><i>Active</i></div>
                      <div><span>Data Agent</span><span>92</span><i>Ready</i></div>
                    </div>
                    <div className="preview-response"><b>Breeze {activeAgent.name}</b><span>TOTAL CREDITS USED</span><strong>25,400</strong></div>
                  </div>
                </div>
                <div className="agent-slide-stats">
                  <div><strong>{activeAgent.metric}</strong><span>{activeAgent.metricLabel}</span></div>
                  <div><strong>{activeAgent.secondMetric}</strong><span>{activeAgent.secondMetricLabel}</span></div>
                </div>
              </article>
              <div className="credits-slide-dots" aria-label={`Slide ${agentSlide + 1} of ${agentSlides.length}`}>
                {agentSlides.map((slide, index) => <button key={slide.name} type="button" className={index === agentSlide ? "active" : ""} aria-label={`Show ${slide.name}`} onClick={() => setAgentSlide(index)} />)}
              </div>
            </div>
            <div className="credits-simple">
              <div className="credit-principle"><h3><b>✦</b> Simple</h3><ul><li>Pay when work gets done. Credits are used when features take action across the platform.</li><li>Get a clear view of every action taken and pause features when priorities change.</li></ul></div>
              <div className="credit-principle"><h3><b>✦</b> Predictable</h3><ul><li>You decide how much each feature can spend, and when to stop.</li><li>Adjust default spend controls to match your budget and set action-level credit limits.</li></ul></div>
            </div>
          </section>

          <section className="comparison comparison-content" id="content-comparison">
            {[["Create Content", comparisonRows], ["Manage Content", manageContentRows]].map(([title, rows]) => (
              <div className="comparison-section" key={title}>
                <div className="comparison-head">
                  <h2>{title}</h2>
                  <div className="sticky-plan-head">
                    {plans.map((plan) => (
                      <div key={plan.name}>
                        <b>{plan.name === "Free" ? "Free tools" : plan.name}</b>
                        <strong>{plan.name === "Free" ? "" : `${plan.price}${plan.period}`}</strong>
                        <Link to="/contact">{plan.name === "Free" ? "Get started free" : plan.name === "Starter" ? "Buy now" : "Talk to Sales ↗"}</Link>
                      </div>
                    ))}
                  </div>
                </div>
                {rows.map(([feature, ...values]) => (
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
          <p className="content-catalog">View the <a href="#">Product &amp; Services Catalog ↗</a> for full technical limits and definitions</p>
          <div className="content-plan-help"><h3>Need help choosing a plan?</h3><a href="tel:+0008000503669">☎ +0 (008) 000-503669</a></div>
          <section className="integration-banner">
            <div><h2>Works with the tools you already use.</h2><p>2,000+ integrations.</p><Link to="/contact">Browse the App Marketplace ↗</Link></div>
            <div className="integration-art" aria-hidden="true"><span className="integration-logo slack">✣</span><span className="integration-logo zapier">zapier</span><span className="integration-logo mailchimp">mailchimp</span><span className="integration-logo ads">Google Ads</span><span className="integration-logo shopify">S</span><span className="integration-logo gmail">M</span><span className="integration-logo hubspot">✥</span></div>
          </section>
          <section className="faq-section content-faq">
            <h2>Frequently asked questions</h2>
            {faqs.map((faq, index) => (
              <article className="faq-item" key={faq}>
                <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span className="content-faq-chevron" aria-hidden="true">{openFaq === index ? "⌄" : "›"}</span>
                  <span className="content-faq-question">{faq}</span>
                </button>
                {openFaq === index && <p>{faq.replace("?", "")} depends on your Content Hub subscription and selected plan. Contact our sales team for details.</p>}
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
