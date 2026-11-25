import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import "./Bundle.css";

const products = [
  {
    name: "Marketing Hub",
    icon: "marketing",
    tiers: [
      { name: "Starter", price: 1670 },
      { name: "Professional", price: 74200 },
      { name: "Enterprise", price: 300000 },
    ],
    contacts: true,
  },
  {
    name: "Sales Hub",
    icon: "sales",
    tiers: [
      { name: "Starter", price: 1670 },
      { name: "Professional", price: 8330 },
      { name: "Enterprise", price: 12500 },
    ],
  },
  {
    name: "Service Hub",
    icon: "service",
    tiers: [
      { name: "Starter", price: 1670 },
      { name: "Professional", price: 8330 },
      { name: "Enterprise", price: 12500 },
    ],
  },
  {
    name: "Content Hub",
    icon: "content",
    tiers: [
      { name: "Starter", price: 1670 },
      { name: "Professional", price: 41700 },
      { name: "Enterprise", price: 125000 },
    ],
  },
  {
    name: "Data Hub",
    icon: "data",
    tiers: [
      { name: "Starter", price: 1670 },
      { name: "Professional", price: 66700 },
      { name: "Enterprise", price: 167000 },
    ],
  },
  {
    name: "Revenue Hub",
    icon: "revenue",
    tiers: [
      { name: "Professional", price: 7920 },
      { name: "Enterprise", price: 11700 },
    ],
  },
];

const addOns = [
  {
    name: "Conversational Context Limit Increase",
    price: 4170,
    description: "Analyze 5,000 more conversational records (e.g., call transcripts, chats, emails) per month in HubSpot. Purchase multiple limit increase packs for more volume.",
  },
  {
    name: "AEO Answers Limit Increase",
    price: 1670,
    description: "Track 10 additional prompts, each run daily across three engines, for 1,000 additional answers per month. Purchase multiple limit increase packs for more volume.",
  },
  {
    name: "API Limit Increase",
    price: 41700,
    description: "Increase your included API call volume for your integrations between your HubSpot account and other services. Each capacity pack will add an additional 1,000,000 calls per day on top of the API calls included in your base subscription tier. Additionally, your rate limit will increase to 250 requests per 10-second.",
  },
];

const currencies = [
  ["INR", "Rs"],
  ["USD", "$"],
  ["EUR", "€"],
  ["GBP", "£"],
];
const sidebarProducts = [
  "Smart CRM",
  "Marketing",
  "Sales",
  "Service",
  "Content",
  "Data",
  "Revenue",
  "Commerce Hub",
  "Operations Hub",
  "Breeze",
  "App Marketplace",
];

const initialTiers = {
  "Marketing Hub": "Starter",
  "Sales Hub": "Starter",
  "Service Hub": "Starter",
  "Content Hub": "Starter",
  "Data Hub": "Starter",
  "Revenue Hub": null,
};

const formatPrice = (value) => `₹${value.toLocaleString("en-US")}`;

function ProductIcon({ type }) {
  return (
    <svg className={`bundle-product-icon ${type}`} viewBox="0 0 28 28" aria-hidden="true">
      <path d="M14 2.5 17 9l7 1-5 5 .9 7-5.9-3.4L8.1 22l.9-7-5-5 7-1z" />
      <circle cx="23" cy="5" r="2" />
      <circle cx="4" cy="22" r="1.5" />
    </svg>
  );
}

export default function Bundle() {
  const [selectedTiers, setSelectedTiers] = useState(initialTiers);
  const [annual, setAnnual] = useState(true);
  const [marketingContacts, setMarketingContacts] = useState(1000);
  const [seats, setSeats] = useState(1);
  const [addonQuantities, setAddonQuantities] = useState([0, 0, 0]);
  const [creditsExpanded, setCreditsExpanded] = useState(false);
  const [extraCreditPacks, setExtraCreditPacks] = useState(0);
  const [currency, setCurrency] = useState("INR");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [addonsExpanded, setAddonsExpanded] = useState(true);
  const [pageScrolled, setPageScrolled] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setPageScrolled(window.scrollY > 110);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const selectedProducts = products.filter((product) => selectedTiers[product.name]);
  const hasStarter = selectedProducts.some((product) => selectedTiers[product.name] === "Starter");
  const basePrice = Math.max(
    0,
    ...selectedProducts.map((product) => (
      product.tiers.find((tier) => tier.name === selectedTiers[product.name])?.price || 0
    ))
  );
  const contactPrice = Math.max(0, Math.ceil((marketingContacts - 1000) / 1000)) * 4170;
  const addonTotal = addonQuantities.reduce(
    (total, quantity, index) => total + quantity * addOns[index].price,
    0
  );
  const seatPrice = selectedProducts.length ? (hasStarter ? 585 : Math.round(basePrice * 0.35)) : 0;
  const extraSeatPrice = Math.max(0, seats - 1) * seatPrice;
  const selectedMonthlyPrice = annual ? Math.round(basePrice * 0.35) : basePrice;
  const monthlyTotal = selectedMonthlyPrice + contactPrice + extraSeatPrice + addonTotal;
  const annualTotal = Math.round(basePrice * 0.35 * 12) + (contactPrice + extraSeatPrice + addonTotal) * 12;
  const bundleTier = selectedProducts.reduce((highest, product) => {
    const tier = selectedTiers[product.name];
    const rank = { Starter: 1, Professional: 2, Enterprise: 3 };
    return rank[tier] > rank[highest] ? tier : highest;
  }, "Starter");

  const priceBreakdown = useMemo(() => [
    ["Products", formatPrice(selectedMonthlyPrice)],
    ["Marketing contacts", formatPrice(contactPrice)],
    ["Additional seats", formatPrice(extraSeatPrice)],
    ["Add-ons", formatPrice(addonTotal)],
  ], [selectedMonthlyPrice, contactPrice, extraSeatPrice, addonTotal]);

  const updateTier = (productName, tier) => {
    setSelectedTiers((current) => ({ ...current, [productName]: tier }));
  };

  const updateAddon = (index, value) => {
    const quantity = Math.max(0, Number(value) || 0);
    setAddonQuantities((current) => current.map((item, itemIndex) => (
      itemIndex === index ? quantity : item
    )));
  };

  const sharePrice = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage("Link copied");
    } catch {
      setShareMessage("Unable to copy the link. Copy the page URL to share.");
    }
  };

  return (
    <>
      <Navbar hideOnScroll hideUtility compact />
      <main className={`bundle-page${pageScrolled ? " is-scrolled" : ""}`}>
        <aside className="bundle-sidebar">
          <section>
            <h3>Platform Solutions</h3>
            <a href="#">Customer Platform</a>
            <a href="#">Free Tools</a>
            <a className="active" href="#bundle-title">Create a Bundle</a>
            <a href="#">HubSpot for Marketers</a>
          </section>
          <section>
            <h3>Products</h3>
            {sidebarProducts.map((item) => (
              <a href="#" key={item}>{item}</a>
            ))}
          </section>
          <div className="bundle-currency">
            <button type="button" aria-expanded={currencyOpen} onClick={() => setCurrencyOpen((open) => !open)}>
              {currency} ({currencies.find(([code]) => code === currency)?.[1]}) <span aria-hidden="true">⌄</span>
            </button>
            {currencyOpen && (
              <div className="bundle-currency-menu">
                {currencies.map(([code, symbol]) => (
                  <button
                    type="button"
                    key={code}
                    onClick={() => {
                      setCurrency(code);
                      setCurrencyOpen(false);
                    }}
                  >
                    {code} ({symbol}) {currency === code && <span aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        <div className="bundle-main">
          <header className="bundle-heading" id="bundle-title">
            <h1>Create a Bundle</h1>
            <p>Grow your business in the areas that matter most with a custom toolkit.</p>
          </header>

          <div className="bundle-layout">
            <section className="bundle-product-column">
              <h2>Select products &amp; add-ons</h2>
              <div className="bundle-product-list">
                {products.map((product) => (
                  <article className={`bundle-product-card${product.contacts ? " has-contacts" : ""}`} key={product.name}>
                    <h3><ProductIcon type={product.icon} />{product.name}</h3>
                    <div className={`bundle-tier-options${product.tiers.length === 2 ? " two-tiers" : ""}`}>
                      {product.tiers.map((tier) => {
                        const selected = selectedTiers[product.name] === tier.name;
                        return (
                          <button
                            type="button"
                            className={`bundle-tier${selected ? " selected" : ""}`}
                            key={tier.name}
                            aria-pressed={selected}
                            onClick={() => updateTier(product.name, tier.name)}
                          >
                            <span><strong>{tier.name}</strong><b>{formatPrice(tier.price)}/month</b></span>
                            <i aria-hidden="true">{selected ? "✓" : ""}</i>
                          </button>
                        );
                      })}
                    </div>
                    {product.contacts && (
                      <div className="bundle-contact-options">
                        <div className="bundle-contact-rule" />
                        <label htmlFor="marketing-contact-count">
                          Select number of <strong>marketing contacts:</strong>
                          <input
                            id="marketing-contact-count"
                            type="number"
                            min="1000"
                            step="1000"
                            value={marketingContacts}
                            onChange={(event) => setMarketingContacts(Math.max(1000, Number(event.target.value) || 1000))}
                          />
                        </label>
                        <p>Includes 1,000 marketing contacts.<br />Additional marketing contacts are sold in increments of 1,000 from<br /><strong>₹4,170/month.</strong></p>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <section className="bundle-credits">
                <div>
                  <h3>HubSpot Credits <span title="Credits are used by eligible HubSpot features">ⓘ</span></h3>
                  <strong>Included</strong>
                  <p>{500 + extraCreditPacks * 1000} credits/mo</p>
                  <small>Fuel features that do work for you. Add additional credits to scale your impact.</small>
                  {creditsExpanded && (
                    <label className="bundle-credit-quantity">
                      Additional 1,000-credit packs
                      <input
                        type="number"
                        min="0"
                        value={extraCreditPacks}
                        onChange={(event) => setExtraCreditPacks(Math.max(0, Number(event.target.value) || 0))}
                      />
                    </label>
                  )}
                </div>
                <button type="button" className="bundle-add-more" onClick={() => setCreditsExpanded((open) => !open)}>
                  {creditsExpanded ? "Done" : "Add more"} <span aria-hidden="true">{creditsExpanded ? "⌃" : "⌄"}</span>
                </button>
              </section>
            </section>

            <aside className="bundle-summary-column">
              <div className="bundle-summary-card">
                <div className="bundle-payment-toggle" role="group" aria-label="Billing frequency">
                  <button type="button" className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>
                    <strong>Pay Monthly</strong><span>Commit monthly</span>
                  </button>
                  <button type="button" className={annual ? "active" : ""} onClick={() => setAnnual(true)}>
                    <strong>Pay Annually</strong><span>BEST VALUE</span>
                  </button>
                </div>

                <h2>Your products</h2>
                <div className="bundle-summary-product">
                  <strong>{bundleTier}</strong>
                  <b>{formatPrice(selectedMonthlyPrice)}/mo</b>
                  <button type="button" aria-label="Remove all selected products" onClick={() => setSelectedTiers({})}>×</button>
                </div>
                <p className="bundle-summary-includes">Includes:</p>
                <ul className="bundle-included-list">
                  {selectedProducts.map((product) => (
                    <li key={product.name}>
                      <strong>{product.name} {selectedTiers[product.name]}</strong>
                      {product.contacts && <span>Includes {marketingContacts.toLocaleString("en-US")} Marketing Contacts</span>}
                    </li>
                  ))}
                  {selectedProducts.length > 0 && <li><strong>{seats} Core Seat{seats === 1 ? "" : "s"}</strong></li>}
                  {selectedProducts.length === 0 && <li>Select a product to build your bundle.</li>}
                </ul>

                <div className="bundle-summary-section">
                  <h3>Credits</h3>
                  <div className="bundle-summary-line"><strong>{500 + extraCreditPacks * 1000} credits/mo</strong><b>{extraCreditPacks ? formatPrice(extraCreditPacks * 1000) : "₹0"}</b></div>
                  <p>{extraCreditPacks ? "Additional credits selected" : "Included with plan"}</p>
                  <div className="bundle-summary-line total"><strong>Total credits</strong><b>{500 + extraCreditPacks * 1000}/mo</b></div>
                </div>

                <div className="bundle-summary-section bundle-seats">
                  <h3>Your Seats</h3>
                  <label>
                    <span><strong>Total Core Seats ({bundleTier}):</strong><b>{formatPrice(seatPrice)}/mo/seat</b></span>
                    <input type="number" min="1" value={seats} onChange={(event) => setSeats(Math.max(1, Number(event.target.value) || 1))} />
                  </label>
                  <strong className="bundle-seats-total">{formatPrice(extraSeatPrice)}/mo</strong>
                </div>

                <div className="bundle-total">
                  <strong>{formatPrice(monthlyTotal)}/mo</strong>
                  {annual && (
                    <>
                      <p>billed annually at <del>{formatPrice(basePrice * 12)}</del></p>
                      <b>{formatPrice(annualTotal)}/yr</b>
                      <span>with an annual commitment</span>
                    </>
                  )}
                  <button type="button">Buy now</button>
                  <button type="button" className="bundle-breakdown" onClick={() => setBreakdownOpen((open) => !open)}>
                    {breakdownOpen ? "Hide price breakdown" : "View price breakdown"}
                  </button>
                  <button type="button" className="bundle-share" onClick={sharePrice}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6" /></svg>
                    Share this price
                  </button>
                  {shareMessage && <span className="bundle-share-message" role="status">{shareMessage}</span>}
                </div>
                {breakdownOpen && (
                  <div className="bundle-price-breakdown">
                    <h3>Price breakdown</h3>
                    {priceBreakdown.map(([label, amount]) => (
                      <div className="bundle-summary-line" key={label}><span>{label}</span><b>{amount}/mo</b></div>
                    ))}
                    <div className="bundle-summary-line total"><strong>Total</strong><b>{formatPrice(monthlyTotal)}/mo</b></div>
                  </div>
                )}
              </div>
              <div className="bundle-help">
                <span>Disclaimer</span>
                <strong>Need help choosing a plan?</strong>
                <a href="tel:+1008000503669">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a15 15 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" /></svg>
                  +0 (008) 000-503669
                </a>
              </div>
            </aside>
          </div>

          <section className="bundle-addons">
            <button className="bundle-addons-toggle" type="button" aria-expanded={addonsExpanded} onClick={() => setAddonsExpanded((open) => !open)}>
              <span><strong>Add-ons</strong><small>Customize and enhance your plan with additional features.</small></span>
              <b aria-hidden="true">{addonsExpanded ? "—" : "+"}</b>
            </button>
            {addonsExpanded && (
              <div className="bundle-addon-list">
                {addOns.map((addon, index) => (
                  <article className="bundle-addon-card" key={addon.name}>
                    <div className="bundle-addon-heading">
                      <strong>{addon.name}</strong>
                      <span>{formatPrice(addon.price)}/mo</span>
                    </div>
                    <label>
                      Quantity
                      <input
                        type="number"
                        min="0"
                        value={addonQuantities[index]}
                        onChange={(event) => updateAddon(index, event.target.value)}
                      />
                    </label>
                    <p>{addon.description}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
