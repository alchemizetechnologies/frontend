import Navbar from "./Navbar";
import "./Contact.css";

const officeImages = [
  ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80", "Global Headquarters"],
  ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80", "Dublin"],
  ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80", "Singapore"],
  ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80", "Sydney"],
  ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80", "Berlin"],
  ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80", "Bogota"],
  ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80", "Paris"],
  ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80", "Ghent"],
  ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80", "San Francisco"],
  ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80", "London"],
  ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80", "Toronto"],
  ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80", "Netherlands"],
  ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80", "Madrid"],
  ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80", "India"],
];

const offices = [
  { name: "Dublin (European HQ)", address: ["1 Sir John Rogerson's Quay, Dublin 2"], phone: ["+353 1 518 7500 (English)"] },
  { name: "Singapore", address: ["1 George Street, #10-01, One George Street, Singapore 049145"], phone: ["+65 6955 6000 (English)"] },
  { name: "Sydney (Asia Pacific and Japan HQ)", address: ["123 Pitt Street, Angel Place, Level 30,", "Sydney NSW 2000"], phone: ["+61 2 9164 8000 (English)"] },
  { name: "Tokyo", address: ["4-1, Marunouchi 1-chome,,", "Chiyoda City, Tokyo 100-0005, Japan"], phone: ["+81 3-4520-9500 (Japanese)"] },
  { name: "Berlin", address: ["HubSpot Germany GmbH,", "AM Postbahnhof 17,", "10243 Berlin"], phone: ["+49 30 2084 8600 (German)", "+49 30 2179 98000 (English)"] },
  { name: "Bogota (Latin American HQ)", address: ["Carrera 11 #79-35,", "5th Floor,", "Bogota, Colombia,", "111321"], phone: ["+57 601 7057100 (Spanish)", "+57 601 7056900 (English)"] },
  { name: "Paris", address: ["91 Boulevard Haussmann,,", "75008 Paris,,", "France"], phone: ["+33 1 72 73 05 00 (French)", "+33 1 72 73 06 44 (English)"] },
  { name: "Ghent", address: ["Notarisstraat 1,", "B - 9000 Ghent,", "Belgium"], phone: ["+32 9 320 0370 (French)", "+32 9 320 0350 (English)"] },
  { name: "San Francisco", address: ["343 Sansome St. Floor 16,,", "San Francisco, CA 94104,", "United States"], phone: ["+1 888 482 7768 (English)"] },
  { name: "London", address: ["199 Bishopsgate,,", "London EC2M 3T."], phone: ["+44 20 7324 3700 (English)"] },
  { name: "Toronto", address: ["340 King Street E,,", "Toronto, Ontario,,", "M5A 1K8."], phone: ["+1 888 482 7768 (English)"] },
  { name: "Netherlands", address: ["Tribes Amsterdam Raamplein, Raamplein 1, 1016 XK Amsterdam, Netherlands"], phone: ["+31 2 0200 3299 (English)"] },
  { name: "Madrid", address: ["Paseo de la Castellana 91,,", "10th Floor,,", "28046 Madrid, Spain"], phone: ["+34 9 1087 3300 (English)"] },
  { name: "India", address: ["#04B-105 and #04B-114,,", "WeWork Cherry Hills,,", "Embassy Golf Links Business Park, Challaghatta,,", "Bengaluru, Karnataka 560071"], phone: ["1800 569 1932 (English)"] },
];

const phoneSections = [
  {
    title: "Americas",
    countries: [
      ["U.S. and Canada", ["+1 888 482 7768 (English)", "+1 857 829 5064 (Spanish)"]],
      ["Brazil", ["+55 11 5193-3250 (Portuguese)", "+55 11 5193-3251 (English)"]],
      ["Chile", ["+56 2 3278 9790 (Spanish)", "+56 2 3278 9791 (English)"]],
      ["Colombia", ["+57 601 7057100 (Spanish)", "+57 601 7056900 (English)"]],
      ["Mexico", ["+52 55 6952 1760 (Spanish)", "+52 55 6952 1761 (English)"]],
    ],
  },
  {
    title: "Europe, the Middle East, and Africa",
    countries: [
      ["Austria", ["800 1023542 (German)", "800 102354 (English)"]],
      ["Belgium", ["+32 9 320 0370 (French)", "+32 9 320 0350 (English)"]],
      ["Bulgaria", ["800 210 0254 (English)"]],
      ["Denmark", ["+45 43 33 34 45 (English)"]],
      ["Finland", ["800 189362 (English)"]],
      ["France", ["+33 1 72 73 05 00 (French)", "+33 1 72 73 06 44 (English)"]],
      ["Germany", ["+49 30 2084 8600 (German)", "+49 30 2179 98000 (English)"]],
      ["Ireland", ["+353 1 518 7500 (English)"]],
      ["Israel", ["+972 3-376-0840 (English)"]],
      ["Italy", ["+390 68 033 5222 (English)"]],
      ["Luxembourg", ["+352 34 20 80 93 43 (French)", "+352 34 20 80 93 50 (German)", "+352 34 20 80 93 44 (English)"]],
      ["Netherlands", ["+31 2 0200 3299 (English)"]],
      ["Norway", ["+47 24 14 08 55 (English)"]],
      ["Poland", ["+48 8001 30 88 (English)"]],
      ["Portugal", ["800 210 649 (English)"]],
      ["South Africa", ["+27 21 426 8487 (English)"]],
      ["Spain", ["+34 9 1087 3300 (Spanish)", "+34 9 1087 3300 (English)"]],
      ["Sweden", ["+46 20 015 91 62 (English)"]],
      ["Switzerland", ["+41 21 355 21 66 (German)", "+41 21 355 21 71 (French)", "+41 21 355 21 70 (English)"]],
      ["United Kingdom", ["+44 20 7324 3700 (English)"]],
      ["United Arab Emirates", ["800 0 444 9440 (English)"]],
      ["Saudi Arabia", ["800101 0765 (English)"]],
    ],
  },
  {
    title: "Asia Pacific",
    countries: [
      ["Australia", ["+61 2 9164 8000 (English)"]],
      ["Hong Kong", ["+852 3011 4980 (English)"]],
      ["India", ["1800 569 1932 (English)"]],
      ["Japan", ["+81 3-4520-9500 (Japanese)"]],
      ["Indonesia", ["+62 21 3950 4705 (English)"]],
      ["Malaysia", ["+60 37 724 0500 (English)"]],
      ["New Zealand", ["0800 147 875 (English)"]],
      ["Singapore", ["+65 6955 6000 (English)"]],
      ["Philippines", ["1 800 1441 1273 (English)", "1 800 8908 6347 (English)"]],
      ["Thailand", ["+66-2-7604053 (English)"]],
      ["South Korea", ["+82 22 023 6280"]],
      ["Taiwan", ["+886 2 7737 4415"]],
      ["Vietnam", ["+84 120 32683 (English)", "+84 122 80785 (English)"]],
    ],
  },
];

function MapGraphic() {
  return (
    <div className="contact-map" aria-label="Map of Global Headquarters">
      <div className="map-road r1" /><div className="map-road r2" /><div className="map-road r3" /><div className="map-road r4" />
      <span className="map-label gore">Gore St</span>
      <span className="map-label canal">Canal Park</span>
      <span className="map-label river">Charles River</span>
      <span className="map-pin" />
      <div className="map-card"><strong>Global Headquarters</strong><span>2 Canal Park<br />Cambridge, MA 02141<br />United States</span></div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-wrap hero-grid">
            <div>
              <h1>Get in touch<span>.</span></h1>
              <p>Want to get in touch? We'd love to hear from you. Here's how you can reach us.</p>
            </div>
            <div className="contact-illustration" aria-hidden="true">
              <svg viewBox="0 0 420 210">
                <g fill="none" stroke="#f4f1eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="210" y="28" width="176" height="128" rx="4" fill="#fff4ea" />
                  <path d="M210 156l176-128M210 28l176 128" stroke="#ff4800" />
                  <circle cx="300" cy="92" r="15" fill="#ff4800" stroke="#ff4800" />
                  <path d="M74 178c20-38 47-58 81-66 31-7 59 12 83 40M138 112l-18-58M154 116l36-72M112 132l-51 16" />
                  <circle cx="112" cy="55" r="25" fill="#fbfbfb" />
                  <circle cx="240" cy="176" r="28" fill="#fbfbfb" />
                  <path d="M87 56c10-18 30-20 44-6M222 176c9-23 31-31 49-16" />
                </g>
                <g fill="#ff4800">
                  <path d="M35 115c28-24 60-16 79 18l-17 42H41z" />
                  <path d="M258 121c24-21 58-16 76 17l-8 57h-91z" />
                </g>
              </svg>
            </div>
          </div>
          <div className="contact-wrap contact-cards">
            <article>
              <div className="contact-card-icon phone-icon" aria-hidden="true">⌕</div>
              <h2>Talk to Sales</h2>
              <p>Interested in HubSpot's software? Just pick up the phone to chat with a member of our sales team.</p>
              <a href="tel:+18884827768">+1 888 482 7768</a>
              <a className="global-link" href="#global-numbers">View all global numbers</a>
            </article>
            <article>
              <div className="contact-card-icon" aria-hidden="true">▱</div>
              <h2>Contact Customer Support</h2>
              <p>Sometimes you need a little help from your friends. Or a HubSpot support rep. Don't worry... we're here for you.</p>
              <a className="contact-button" href="#">Contact Support</a>
            </article>
          </div>
        </section>

        <section className="offices-section">
          <div className="contact-wrap">
            <h2 className="section-heading">Connect with one of our global offices</h2>
            <div className="headquarters">
              <MapGraphic />
              <div className="headquarters-info">
                <h3>Global Headquarters</h3>
                <p>2 Canal Park<br />Cambridge, MA 02141<br />United States</p>
                <h4>Phone / Fax</h4>
                <p><a href="tel:+18884827768">+1 888 HUBSPOT</a><br /><a href="tel:+18884827768">(+1 888 482 7768)</a></p>
                <p><strong>Fax:</strong> <a href="tel:+16178125820">+1 617 812 5820</a></p>
                <h4>Press / Media / Blogger Information</h4>
                <a href="#">Visit our Newsroom for contact info</a>
              </div>
            </div>
            <details className="office-finder">
              <summary>How to find this office</summary>
            </details>

            <div className="office-list">
              {offices.map((office, index) => (
                <article className="office" key={office.name}>
                  <div className="office-photo">
                    {index === 0 ? (
                      <div className="office-photo-fallback dub">HUBSPOT</div>
                    ) : (
                      <img src={officeImages[index][0]} alt={`${office.name} office`} loading="lazy" />
                    )}
                  </div>
                  <div className="office-info">
                    <h3>{office.name}</h3>
                    <h4>Address</h4>
                    <p>{office.address.map((line) => <span key={line}>{line}<br /></span>)}</p>
                    <h4>Phone</h4>
                    {office.phone.map((phone) => <a href="#" key={phone}>{phone}</a>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="global-numbers" id="global-numbers">
          {phoneSections.map((section) => (
            <div className="phone-section" key={section.title}>
              <h2>{section.title === "Asia Pacific" ? "Asia Pacific" : section.title}</h2>
              <div className="phone-grid">
                {section.countries.map(([country, numbers]) => (
                  <div className="phone-country" key={country}>
                    <h3>{country}</h3>
                    {numbers.map((number) => <a href="#" key={number}>{number}</a>)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
