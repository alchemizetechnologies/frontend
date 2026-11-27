import React, { useMemo, useState } from "react";
import "./companies.css";

const initialCompanies = [
  { id: 1, name: "Acme Corporation", domain: "acme.com", phone: "+1 555 010 1000", city: "New York", type: "Customer", owner: "Alex Morgan" },
  { id: 2, name: "Brightside Studio", domain: "brightside.co", phone: "+1 555 010 2000", city: "Chicago", type: "Prospect", owner: "Jamie Lee" },
  { id: 3, name: "Northstar Labs", domain: "northstar.io", phone: "+1 555 010 3000", city: "Austin", type: "Partner", owner: "Taylor Kim" },
  { id: 4, name: "Evergreen Retail", domain: "evergreen.com", phone: "+1 555 010 4000", city: "Seattle", type: "Customer", owner: "Alex Morgan" },
];

export default function Companies() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selected, setSelected] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortNewest, setSortNewest] = useState(true);
  const [form, setForm] = useState({ name: "", domain: "", phone: "", city: "", type: "Prospect", owner: "" });

  const filteredCompanies = useMemo(() => {
    const term = search.trim().toLowerCase();
    const result = companies.filter((company) => {
      const matchesSearch = !term || [company.name, company.domain, company.phone, company.city, company.type, company.owner]
        .some((value) => String(value || "").toLowerCase().includes(term));
      const matchesTab = activeTab === "all" || company.owner === "Alex Morgan";
      return matchesSearch && matchesTab;
    });
    return [...result].sort((a, b) => sortNewest ? b.id - a.id : a.name.localeCompare(b.name));
  }, [companies, search, activeTab, sortNewest]);

  const toggleSelected = (id) => {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const toggleAll = () => {
    if (filteredCompanies.length > 0 && filteredCompanies.every((company) => selected.includes(company.id))) {
      setSelected((current) => current.filter((id) => !filteredCompanies.some((company) => company.id === id)));
    } else {
      setSelected((current) => [...new Set([...current, ...filteredCompanies.map((company) => company.id)])]);
    }
  };

  const addCompany = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    const newCompany = { ...form, id: Date.now(), name: form.name.trim() };
    setCompanies((current) => [newCompany, ...current]);
    setForm({ name: "", domain: "", phone: "", city: "", type: "Prospect", owner: "" });
    setShowAddForm(false);
  };

  const deleteSelected = () => {
    setCompanies((current) => current.filter((company) => !selected.includes(company.id)));
    setSelected([]);
  };

  return (
    <main className="companies-page">
      <div className="companies-connect-banner">
        <div className="companies-banner-icon" aria-hidden="true">✉</div>
        <div className="companies-banner-copy">
          <strong>Connect your inbox</strong>
          <span>Connect your email to keep track of conversations with your companies.</span>
        </div>
        <button className="companies-button companies-button-light" type="button" onClick={() => window.alert("Email connection needs Google OAuth setup in your app.")}>
          Connect email
        </button>
        <button className="companies-banner-close" type="button" aria-label="Dismiss banner" onClick={(event) => event.currentTarget.closest(".companies-connect-banner")?.remove()}>×</button>
      </div>

      <header className="companies-heading">
        <div>
          <div className="companies-breadcrumb">CRM <span>/</span> Companies</div>
          <h1>Companies</h1>
          <p>Manage the organizations you work with.</p>
        </div>
        <div className="companies-heading-actions">
          <button className="companies-button companies-button-outline" type="button" onClick={() => window.alert("Import is not connected yet.")}>Import</button>
          <button className="companies-button companies-button-primary" type="button" onClick={() => setShowAddForm(true)}>＋ Add company</button>
        </div>
      </header>

      <section className="companies-workspace">
        <div className="companies-tabs-row">
          <div className="companies-tabs" role="tablist" aria-label="Company views">
            <button type="button" role="tab" aria-selected={activeTab === "all"} className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>All companies</button>
            <button type="button" role="tab" aria-selected={activeTab === "mine"} className={activeTab === "mine" ? "active" : ""} onClick={() => setActiveTab("mine")}>My companies</button>
          </div>
          <button className="companies-text-button" type="button" onClick={() => window.alert("Saved views can be configured when connected to your CRM data.")}>＋ Create view</button>
        </div>

        <div className="companies-toolbar">
          <label className="companies-search">
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search companies" aria-label="Search companies" />
          </label>
          <div className="companies-toolbar-actions">
            <div className="companies-filter-wrap">
              <button className="companies-button companies-button-outline" type="button" onClick={() => setShowFilters((value) => !value)}>☷ Filters</button>
              {showFilters && <div className="companies-filter-popover">
                <strong>Quick filters</strong>
                <p>Search by company name, domain, phone, city, type, or owner using the search box.</p>
                <button type="button" onClick={() => { setSearch(""); setShowFilters(false); }}>Clear search</button>
              </div>}
            </div>
            <button className="companies-button companies-button-outline" type="button" onClick={() => setSortNewest((value) => !value)}>↕ Sort: {sortNewest ? "Recently added" : "Name"}</button>
            <button className="companies-button companies-button-outline" type="button" onClick={() => window.alert("Choose columns is not connected yet.")}>▤ Edit columns</button>
          </div>
        </div>

        {selected.length > 0 && <div className="companies-selection-bar">
          <span>{selected.length} selected</span>
          <button type="button" onClick={deleteSelected}>Delete selected</button>
          <button type="button" onClick={() => setSelected([])}>Clear selection</button>
        </div>}

        <div className="companies-table-scroll">
          <table className="companies-table">
            <thead>
              <tr>
                <th className="companies-check-cell"><input type="checkbox" aria-label="Select all companies" checked={filteredCompanies.length > 0 && filteredCompanies.every((company) => selected.includes(company.id))} onChange={toggleAll} /></th>
                <th>Company name</th>
                <th>Company domain name</th>
                <th>Phone number</th>
                <th>City</th>
                <th>Type</th>
                <th>Company owner</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company.id}>
                  <td className="companies-check-cell"><input type="checkbox" aria-label={`Select ${company.name}`} checked={selected.includes(company.id)} onChange={() => toggleSelected(company.id)} /></td>
                  <td><button className="companies-name-link" type="button" onClick={() => window.alert(`${company.name}\n${company.domain || "No domain added"}`)}>{company.name}</button></td>
                  <td>{company.domain || "—"}</td>
                  <td>{company.phone || "—"}</td>
                  <td>{company.city || "—"}</td>
                  <td><span className={`companies-type-pill ${String(company.type).toLowerCase()}`}>{company.type || "—"}</span></td>
                  <td>{company.owner || "—"}</td>
                </tr>
              ))}
              {filteredCompanies.length === 0 && <tr><td colSpan="7" className="companies-empty">No companies found. Try another search or add a company.</td></tr>}
            </tbody>
          </table>
        </div>
        <footer className="companies-table-footer">
          <span>{filteredCompanies.length} {filteredCompanies.length === 1 ? "record" : "records"}</span>
          <span>Showing {filteredCompanies.length ? 1 : 0}–{filteredCompanies.length} of {filteredCompanies.length}</span>
        </footer>
      </section>

      {showAddForm && <div className="companies-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowAddForm(false); }}>
        <section className="companies-modal" role="dialog" aria-modal="true" aria-labelledby="companies-modal-title">
          <div className="companies-modal-header">
            <div><h2 id="companies-modal-title">Create company</h2><p>Add a new company to this list.</p></div>
            <button type="button" aria-label="Close" onClick={() => setShowAddForm(false)}>×</button>
          </div>
          <form onSubmit={addCompany}>
            <label>Company name *<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Acme Inc." /></label>
            <label>Company domain<input value={form.domain} onChange={(event) => setForm({ ...form, domain: event.target.value })} placeholder="example.com" /></label>
            <div className="companies-form-grid">
              <label>Phone number<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="+1 555 000 0000" /></label>
              <label>City<input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} placeholder="City" /></label>
            </div>
            <div className="companies-form-grid">
              <label>Type<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}><option>Prospect</option><option>Customer</option><option>Partner</option></select></label>
              <label>Company owner<input value={form.owner} onChange={(event) => setForm({ ...form, owner: event.target.value })} placeholder="Owner name" /></label>
            </div>
            <div className="companies-modal-actions">
              <button className="companies-button companies-button-outline" type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
              <button className="companies-button companies-button-primary" type="submit">Create company</button>
            </div>
          </form>
        </section>
      </div>}
    </main>
  );
}
