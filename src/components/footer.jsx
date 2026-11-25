
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const popularFeatures = [
  ["All Products and Features", "products"],
  ["HubSpot AEO", "aeo"],
  ["Free Meeting Scheduler App", "meeting-scheduler"],
  ["Email Tracking Software", "email-tracking"],
  ["AI Content Writer", "ai-content-writer"],
  ["AI Website Generator", "ai-website-generator"],
  ["Free Website Builder", "website-builder"],
  ["Free Landing Page Builder", "landing-page-builder"],
  ["Free Online Form Builder", "online-form-builder"],
  ["Free Chatbot Builder", "chatbot-builder"],
  ["Free Live Chat Software", "live-chat"],
  ["Marketing Analytics", "marketing-analytics"],
];

const freeTools = [
  ["See All Free Business Tools", "free-tools"],
  ["AI Search Grader", "ai-search-grader"],
  ["AI Search Sensor", "ai-search-sensor"],
  ["Make My Persona", "make-my-persona"],
  ["Email Signature Generator", "email-signature-generator"],
  ["Business Templates", "business-templates"],
];

const companyLinks = [
  { name: "About Us", to: "/About" },
  { name: "Careers", to: "/careers" },
  { name: "Management Team", to: "/management-team" },
  { name: "Board of Directors", to: "/board-of-directors" },
  { name: "Investor Relations", to: "/investor-relations" },
  { name: "Blog", to: "/blog" },
  { name: "Contact Us", to: "/contact" },
  { name: "Customers", to: "/customers" },
  { name: "Partners", to: "/partners" },
];

const customerLinks = [
  ["Customer Support", "customer-support"],
  ["Join a Local User Group", "community"],
];

const partnerLinks = [
  ["All Partner Programs", "partner-programs"],
  ["Solutions Partner Program", "solutions-partner-program"],
];

const legalLinks = [
  {
    name: "Legal Center",
    url: "https://legal.hubspot.com/legal-center?hubs_content=www.hubspot.com/&hubs_content-cta=legal-center&wfoid=4466b9ae61.1795501304",
  },
  {
    name: "Privacy Policy",
    url: "https://legal.hubspot.com/privacy-policy?hubs_content=www.hubspot.com/&hubs_content-cta=privacy-policy&wfoid=4466b9ae61.1795501304",
  },
  {
    name: "Security",
    url: "https://legal.hubspot.com/security?hubs_content=www.hubspot.com/&hubs_content-cta=security&wfoid=4466b9ae61.1795501304",
  },
  {
    name: "Website Accessibility",
    url: "https://legal.hubspot.com/website-accessibility?hubs_content=www.hubspot.com/&hubs_content-cta=website-accessibility&wfoid=4466b9ae61.1795501304",
  },
  {
    name: "Manage Cookies",
    url: "https://www.hubspot.com/?hubs_content=www.hubspot.com/our-story&hubs_content-cta=HubSpot&wfoid=4466b9ae61.1795501304",
  },
];

function Footer() {
  return (
    <footer className="hubspot-footer">
      <div className="footer-container">

        {/* FOOTER MAIN COLUMNS */}
        <div className="footer-main">

          {/* POPULAR FEATURES */}
          <div className="footer-column footer-popular">
            <h3>Popular Features</h3>

            <div className="footer-feature-grid">
              {popularFeatures.map(([name, slug]) => (
                <Link to={`/${slug}`} key={name}>
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* FREE TOOLS */}
          <div className="footer-column">
            <h3>Free Tools</h3>

            {freeTools.map(([name, slug]) => (
              <Link to={`/${slug}`} key={name}>
                {name}
              </Link>
            ))}
          </div>

          {/* COMPANY */}
          <div className="footer-column">
            <h3>Company</h3>

            {companyLinks.map((item) => (
              item.to ? (
                <Link to={item.to} key={item.name}>{item.name}</Link>
              ) : (
                <a href="#" key={item.name} onClick={(event) => event.preventDefault()}>{item.name}</a>
              )
            ))}
          </div>

          {/* CUSTOMERS AND PARTNERS */}
          <div className="footer-column">
            <h3>Customers</h3>

            {customerLinks.map(([name, slug]) => (
              <Link to={`/${slug}`} key={name}>
                {name}
              </Link>
            ))}

            <h3 className="footer-subheading">Partners</h3>
            {partnerLinks.map(([name, slug]) => (
              <Link to={`/${slug}`} key={name}>
                {name}
              </Link>
            ))}
          </div>

        </div>

        {/* SOCIAL ICONS */}
        <div className="footer-social-section">

          <div className="footer-social-line"></div>

          <div className="footer-social-icons">

            <a
              href="https://www.facebook.com/HubSpot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              f
            </a>

            <a
              href="https://www.instagram.com/hubspot/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              ◎
            </a>

            <a
              href="https://www.linkedin.com/company/hubspot/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>

            <a
              href="https://www.youtube.com/user/HubSpot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              ▶
            </a>

            <a
              href="https://x.com/HubSpot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              𝕏
            </a>

          </div>

          <div className="footer-social-line"></div>

        </div>

        {/* HUBSPOT LOGO */}
        <div className="footer-logo">
          <a
            href="https://www.hubspot.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="footer-logo-icon">☼</span>
            <span>HubSpot</span>
          </a>
        </div>

        {/* COPYRIGHT AND LEGAL LINKS */}
        <div className="footer-bottom">

          <p className="footer-copyright">
            Copyright © 2026 HubSpot, Inc.
          </p>

          <div className="footer-legal-links">
            {legalLinks.map((item, index) => (
              <a
                href={item.url}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
