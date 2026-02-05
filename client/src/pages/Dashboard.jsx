import React, { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";

/* ---------------- MOCK API (Replace with real backend) ---------------- */
const fetchInvoices = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([]); // 👈 aaje empty, kale API data aavse
    }, 800);
  });

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 5;

  /* ---------------- API CALL ---------------- */
  useEffect(() => {
    fetchInvoices().then((data) => setInvoices(data));
  }, []);

  /* ---------------- FILTER + SEARCH ---------------- */
  const filteredData = useMemo(() => {
    let data =
      activeTab === "All"
        ? invoices
        : invoices.filter((i) => i.status === activeTab);

    if (search) {
      data = data.filter(
        (i) =>
          i.client.toLowerCase().includes(search.toLowerCase()) ||
          i.amount.toString().includes(search)
      );
    }
    return data;
  }, [invoices, activeTab, search]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ---------------- TABS ---------------- */
  const tabs = [
    "All",
    "Paid",
    "Unpaid",
    "OverDue",
    "Draft",
  ].map((t) => ({
    name: t,
    count:
      t === "All"
        ? invoices.length
        : invoices.filter((i) => i.status === t).length,
  }));

  /* ---------------- CARD METRICS ---------------- */
  const cards = [
    { title: "Paid", color: "green" },
    { title: "Unpaid", color: "orange" },
    { title: "OverDue", color: "red" },
    { title: "Draft", color: "blue" },
  ].map((c) => {
    const items = invoices.filter((i) => i.status === c.title);
    return {
      ...c,
      count: items.length,
      total: items.reduce((s, i) => s + i.amount, 0),
    };
  });

  return (
    <div className="dashboard">

      {/* ================= HEADER ================= */}
      <h1 className="title">Admin Dashboard</h1>

      {/* ================= CARDS ================= */}
      <div className="card-grid">
        {cards.map((c) => (
          <div key={c.title} className={`card ${c.color}`}>
            <h4>{c.title}</h4>
            <p>{c.count} Invoices</p>
            <strong>₹ {c.total}</strong>
          </div>
        ))}
      </div>

      {/* ================= CHART GRID ================= */}
      <div className="chart-grid">
        <div className="chart-box">📊 Revenue Chart (future)</div>
        <div className="chart-box">📈 Monthly Growth</div>
        <div className="chart-box">🥧 Status Distribution</div>
        <div className="chart-box">📉 Outstanding Amount</div>
      </div>

      {/* ================= SEARCH ================= */}
      <input
        className="search"
        placeholder="Search by client or amount..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* ================= TABS ================= */}
     {/* ================= TABS ================= */}
<div className="tabs">
  {tabs.map((t) => (
    <button
      key={t.name}
      className={`tab-btn ${t.name.toLowerCase()} ${
        activeTab === t.name ? "active" : ""
      }`}
      onClick={() => {
        setActiveTab(t.name);
        setPage(1);
      }}
    >
      {t.name} ({t.count})
    </button>
  ))}
</div>

      {/* ================= TABLE ================= */}
      <div className="table-box">
        {paginatedData.length === 0 ? (
          <div className="empty">
            😴 No invoices yet  
            <br />
            Create invoice and dashboard will auto update
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((i, idx) => (
                <tr key={i.id}>
                  <td>{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td>{i.client}</td>
                  <td>₹ {i.amount}</td>
                  <td>
                    <span className={`badge ${i.status.toLowerCase()}`}>
                      {i.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
