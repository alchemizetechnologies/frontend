
import React from "react";
import "./Footer.css";

const popularFeatures = [
  "Marketing Hub",
  "Sales Hub",
  "Service Hub",
  "Content Hub",
  "Data Hub",
  "Commerce Hub",
  "Smart CRM",
  "Breeze AI",
];

const freeTools = [
  "Website Grader",
  "Email Signature Generator",
  "Blog Ideas Generator",
  "Invoice Generator",
  "Business Templates",
  "AI Content Writer",
  "Make My Persona",
];

const companyLinks = [
  "About Us",
  "Careers",
  "Management Team",
  "Board of Directors",
  "Investor Relations",
  "Contact Us",
  "Customers",
  "Partners",
];

const customerLinks = [
  "Customer Support",
  "HubSpot Academy",
  "Community",
  "Knowledge Base",
  "Developer Documentation",
  "Partner Directory",
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
              {popularFeatures.map((item, index) => (
                <a href="#" key={index}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* FREE TOOLS */}
          <div className="footer-column">
            <h3>Free Tools</h3>

            {freeTools.map((item, index) => (
              <a href="#" key={index}>
                {item}
              </a>
            ))}
          </div>

          {/* COMPANY */}
          <div className="footer-column">
            <h3>Company</h3>

            {companyLinks.map((item, index) => (
              <a href="#" key={index}>
                {item}
              </a>
            ))}
          </div>

          {/* CUSTOMERS AND PARTNERS */}
          <div className="footer-column">
            <h3>Customers & Partners</h3>

            {customerLinks.map((item, index) => (
              <a href="#" key={index}>
                {item}
              </a>
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
