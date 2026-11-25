import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "./SitePage.css";

const pathTitle = {
  "/pricing": "HubSpot Pricing",
  "/customers": "Customer Stories",
  "/partners": "HubSpot Partner Directory",
  "/careers": "Careers at HubSpot",
  "/customer-support": "Customer Support",
  "/hubspot-academy": "HubSpot Academy",
  "/community": "HubSpot Community",
  "/knowledge-base": "Knowledge Base",
  "/developer-documentation": "Developer Documentation",
  "/partner-directory": "Partner Directory",
};

function humanize(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function SitePage() {
  const location = useLocation();
  const slug = location.pathname.split("/").filter(Boolean).join("-") || "page";
  const title = pathTitle[location.pathname] || humanize(slug);
  const isPricing = location.pathname === "/pricing";

  const cards = isPricing
    ? [
        ["Free", "$0", "For individuals and small teams", ["Contact management", "Email marketing", "Live chat", "Shared inbox"]],
        ["Starter", "From $15", "For growing teams", ["Everything in Free", "Advanced reporting", "Automation tools", "Custom properties"]],
        ["Professional", "Custom", "For scaling businesses", ["Everything in Starter", "Omni-channel marketing", "Custom objects", "Advanced automation"]],
        ["Enterprise", "Custom", "For complex organizations", ["Everything in Professional", "Predictive lead scoring", "Single sign-on", "Advanced permissions"]],
      ]
    : [
        [title, "Everything your team needs", "Connected tools and customer data help every team move faster.", "Learn more"],
        ["Built to grow", "Flexible for every stage", "Start simple, add capabilities, and scale across your organization.", "Explore features"],
        ["Customer-first", "Expert support included", "Get guidance, resources, and support from experts who understand your goals.", "Talk to an expert"],
      ];

  return (
    <>
      <Navbar />
      <main className="site-page">
        <section className={isPricing ? "site-hero pricing-hero" : "site-hero"}>
          <div className="site-wrap">
            <span className="site-eyebrow">{isPricing ? "Simple, transparent pricing" : "HubSpot Platform"}</span>
            <h1>{title}</h1>
            <p>
              {isPricing
                ? "Start free or choose a plan that grows with your business."
                : `Explore ${title.toLowerCase()} solutions, resources, and tools designed to help your business grow better.`}
            </p>
            <div className="site-actions">
              <Link className="site-primary" to="/contact">Get a demo</Link>
              <Link className="site-secondary" to="/pricing">Get started free</Link>
            </div>
          </div>
        </section>

        <section className="site-content">
          <div className="site-wrap">
            {isPricing && <h2>Choose the right HubSpot plan</h2>}
            <div className={isPricing ? "site-grid pricing-grid" : "site-grid"}>
              {cards.map(([name, price, description, extra]) => (
                <article className="site-card" key={name}>
                  <div className="site-card-mark" />
                  <h3>{name}</h3>
                  {isPricing ? (
                    <>
                      <strong className="site-price">{price}</strong>
                      <p>{description}</p>
                      <ul>{extra.map((item) => <li key={item}>{item}</li>)}</ul>
                      <button type="button">Get started</button>
                    </>
                  ) : (
                    <>
                      <h4>{price}</h4>
                      <p>{description}</p>
                      <a href="#" onClick={(event) => event.preventDefault()}>{extra} <span>→</span></a>
                    </>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {!isPricing && (
          <section className="site-feature">
            <div className="site-wrap site-feature-grid">
              <div>
                <span className="site-eyebrow">Grow better together</span>
                <h2>One connected platform for every customer journey</h2>
                <p>Bring your marketing, sales, service, content, and customer data together so teams can collaborate and deliver exceptional experiences.</p>
                <Link to="/contact">Connect with our team</Link>
              </div>
              <div className="site-feature-art" aria-hidden="true">
                <span /><span /><span />
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
