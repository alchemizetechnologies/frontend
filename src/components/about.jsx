import { useState } from "react";
import "./About.css";
import Navbar from "./Navbar";

const quotes = [
  {
    text: "The biggest benefit is that all your data lives in it, you see the same customer information as the sales team and vice versa. It gives us a new level of confidence.",
    name: "PATRICIA PORTIK",
    role: "National Sales Operations / E-Marketing Manager",
    company: "ARC Document Solutions",
  },
  { text: "Sample testimonial two. Replace with your own customer quote.", name: "CUSTOMER NAME", role: "Job Title", company: "Company" },
  { text: "Sample testimonial three. Replace with your own customer quote.", name: "CUSTOMER NAME", role: "Job Title", company: "Company" },
  { text: "Sample testimonial four. Replace with your own customer quote.", name: "CUSTOMER NAME", role: "Job Title", company: "Company" },
];

const features = [
  { title: "Responsible Business Report", text: "Progress and key data on our journey to build a company future generations would be proud of.", cta: "Read the report", alt: false },
  { title: "Second feature", text: "Replace this with another highlight for your company.", cta: "Learn more", alt: true },
];

const stats = ["15 Global Offices", "9,000+ Employees", "306,000 Customers"];

const badges = [
  ["Best Results"],
  ["Easiest Admin", "ENTERPRISE"],
  ["Best Support", "ENTERPRISE"],
  ["Best Usability"],
  ["Fastest Implementation"],
];

const offices = [
  ["Berlin, Germany", "Phone: +49 30 0000 0000 (German)", "t1"],
  ["Bogotá, Colombia", "Latin America Headquarters · Opened: 2018", "t2"],
  ["Dublin, Ireland", "Europe Headquarters · Opened: 2013", "t3"],
  ["Ghent, Belgium", "Phone: +32 9 000 0000 (English)", "t4"],
  ["The Netherlands", "Phone: +31 2 0000 0000 (English)", "t2"],
  ["Paris, France", "Opened: 2016", "t4"],
  ["Toronto, Ontario, Canada", "Opened: 2021", "t1"],
  ["San Francisco, California, USA", "Opened: 2020", "t3"],
  ["Singapore", "Asia-Pacific Headquarters · Opened: 2015", "t2"],
  ["Sydney, Australia", "Opened: 2014", "t4"],
  ["Tokyo, Japan", "Opened: 2016", "t1"],
  ["United Kingdom", "Phone: +44 20 0000 0000 (English)", "t3"],
];

const resources = [
  ["Company News", "Read the latest announcements from the communications team."],
  ["Investor Relations", "Find the latest earnings updates and investor news."],
  ["What’s New", "Check out the newest features and improvements to our products."],
];

const products = [
  ["Marketing Hub", "Marketing automation software to help you generate leads and automate marketing that drives growth."],
  ["Sales Hub", "Powerful sales software to help teams close more deals, deepen relationships, and manage their pipeline more effectively."],
  ["Service Hub", "Customer service management software to help you connect with customers, exceed expectations, and turn them into promoters."],
  ["Content Hub", "AI-powered content marketing software that helps marketers create and manage content that fuels the entire customer journey."],
  ["Data Hub", "Transform scattered data into actionable intelligence with AI-powered data management."],
  ["Revenue Hub", "Revenue software that connects quoting, billing, and payments in one place, so every team works from the same revenue picture."],
];

function Carousel({ items, render, arrows = false, wide = false }) {
  const [i, setI] = useState(0);
  const go = (n) => setI((n + items.length) % items.length);
  return (
    <div className={`car${wide ? " wide" : ""}`}>
      {arrows && (
        <>
          <button type="button" className="arrow l" aria-label="Previous" onClick={() => go(i - 1)}>‹</button>
          <button type="button" className="arrow r" aria-label="Next" onClick={() => go(i + 1)}>›</button>
        </>
      )}
      {items.map((item, k) => (
        <div key={k} className={`slide${k === i ? " on" : ""}`}>{render(item)}</div>
      ))}
      <div className="dots">
        {items.map((_, k) => (
          <i key={k} className={k === i ? "on" : ""} onClick={() => go(k)} />
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <Navbar />
      <div className="about-page">

      <section className="hero">
        <div className="wrap">
          <div>
            <h1>About Us</h1>
            <p>Our company and culture are a lot like our product. They’re crafted, not cobbled, for a delightful experience.</p>
          </div>
          <div className="ph p1" role="img" aria-label="Team photo placeholder" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap row">
          <div className="ph p2" role="img" aria-label="Office photo placeholder" />
          <div>
            <h2>Our Mission: Helping Millions of Organizations Grow Better</h2>
            <h3 style={{ marginTop: 28, fontSize: 26 }}>Grow Better</h3>
            <p>We believe not just in growing bigger, but in growing better. And growing better means aligning the success of your own business with the success of your customers. Win-win!</p>
          </div>
        </div>
      </section>

      <section className="sec story">
        <div className="wrap row">
          <div>
            <h2>Our Story</h2>
            <p>In 2004, fellow MIT graduate students Brian Halligan and Dharmesh Shah noticed a major shift in the way people shop and purchase products. Buyers didn’t want to be interrupted by ads, they wanted helpful information. In 2006, they founded the company to help businesses use that shift to grow better with inbound marketing.</p>
            <p>Along the way, it expanded beyond marketing into a crafted, not cobbled suite of products that create the frictionless customer experience that buyers expect today.</p>
          </div>
          <div className="ph p3" role="img" aria-label="Leadership photo placeholder" />
        </div>
      </section>

      <section className="sec sand">
        <div className="wrap center">
          <h2>By the Numbers</h2>
          <div className="grid3">
            {stats.map((s) => (
              <div className="card" key={s}>
                <div className="ic"><i /></div>
                <b>{s}</b>
                <a className="lm" href="#" onClick={(e) => e.preventDefault()}>Learn more</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sand" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="panel">
            <div className="badges">
              {badges.map(([title, sub], idx) => (
                <div className="badge" key={`${title}-${idx}`}>
                  <small>FALL 2026</small>
                  {title}
                  {sub && <small>{sub}</small>}
                </div>
              ))}
            </div>
            <div className="big">
              Voted #1 in 571 Reports<br />
              <a className="lm" href="#" onClick={(e) => e.preventDefault()}>Learn more</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap center">
          <h2>What Our Customers Say</h2>
          <p style={{ marginTop: 12 }}>See how customers are growing their businesses and getting incredible results.</p>
          <Carousel
            items={quotes}
            arrows
            render={(q) => (
              <div className="quote">
                <div className="av" />
                <p>“{q.text}”</p>
                <div className="who">
                  <b>{q.name}</b><br />{q.role}<br />{q.company}
                </div>
              </div>
            )}
          />
        </div>
      </section>

      <section className="sec sand">
        <div className="wrap center">
          <h2>Growing Better Together</h2>
          <Carousel
            wide
            items={features}
            render={(f) => (
              <div className="rep">
                <div className={`art${f.alt ? " b" : ""}`} />
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <a className="btn" href="#" onClick={(e) => e.preventDefault()}>{f.cta}</a>
                </div>
              </div>
            )}
          />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="loc">
            <div>
              <h2>Connect at One of Our Locations</h2>
              <p>Global Headquarters</p>
              <p>Boston, MA, USA</p>
              <p>
                <b>Phone:</b><br />
                <a className="lm plain" href="#" onClick={(e) => e.preventDefault()}>+1-888-000-0000</a> (English)<br />
                <a className="lm plain" href="#" onClick={(e) => e.preventDefault()}>+1 888 000 0001</a> (English)
              </p>
              <a className="lm" href="#" onClick={(e) => e.preventDefault()}>Contact us</a>
            </div>
            <div className="ph t3" style={{ minHeight: 340 }} />
          </div>
          <div className="lgrid">
            {offices.map(([city, info, tone]) => (
              <div key={city}>
                <div className={`t ${tone}`} />
                <h4>{city}</h4>
                <p>{info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sand">
        <div className="wrap center">
          <h2>Resources</h2>
          <div className="grid3">
            {resources.map(([title, text]) => (
              <div className="card" key={title}>
                <div className="ic"><i /></div>
                <b className="sm"><a href="#" onClick={(e) => e.preventDefault()}>{title}</a></b>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="wrap">
          <h2>Our Products</h2>
          <p>Each product in the customer platform is connected to the same underlying Smart CRM database. Although our products are powerful on their own, the real magic happens when you use them together.</p>
          <div className="prods">
            {products.map(([title, text]) => (
              <div key={title}>
                <b>{title}</b>
                {text}<br />
                <a href="#" onClick={(e) => e.preventDefault()}>Learn more</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}