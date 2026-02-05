import { useEffect, useState } from "react";
import axios from "axios";
import StatusPieChart from "../components/StatusPieChart";
import RevenueBarChart from "../components/RevenueBarChart";
import "./Dashboard.css";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/invoices", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data.invoices)) {
        setInvoices(res.data.invoices);
      } else {
        setInvoices([]);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
    const interval = setInterval(() => fetchInvoices(), 15000);
    return () => clearInterval(interval);
  }, []);

  const totalRevenue = invoices.reduce((s, i) => s + (i.amount || 0), 0);
  const paidInvoices = invoices.filter((i) => i.status === "Paid").length;
  const pendingInvoices = invoices.filter((i) => i.status === "Unpaid").length;

  if (loading) return <div className="loader"><h3>Loading Dashboard...</h3></div>;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h2>📊 Business Overview</h2>
        <p>Real-time analytics and invoice tracking</p>
      </div>

      {/* SUMMARY CARDS - Row 1 */}
      <div className="summary-grid">
        <div className="stat-card">
          <div className="stat-icon blue">📄</div>
          <div>
            <h4>Total Invoices</h4>
            <p className="stat-value">{invoices.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div>
            <h4>Paid Invoices</h4>
            <p className="stat-value">{paidInvoices}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">⏳</div>
          <div>
            <h4>Pending</h4>
            <p className="stat-value">{pendingInvoices}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">💰</div>
          <div>
            <h4>Total Revenue</h4>
            <p className="stat-value">₹ {totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* CHARTS - Row 2 */}
      <div className="charts-grid">
        <div className="chart-card">
          <h4>Status Distribution</h4>
          <div className="chart-container">
            <StatusPieChart invoices={invoices} />
          </div>
        </div>

        <div className="chart-card">
          <h4>Revenue Analytics</h4>
          <div className="chart-container">
            <RevenueBarChart invoices={invoices} />
          </div>
        </div>
      </div>

      {/* TABLE - Row 3 */}
      <div className="table-section">
        <div className="table-header">
          <h4>Recent Invoices</h4>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Created</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 5).map((inv) => (
                <tr key={inv._id}>
                  <td>#{inv.invoiceNo}</td>
                  <td className="client-name">{inv.client}</td>
                  <td>{inv.createDate}</td>
                  <td className="amount-cell">₹{inv.amount}</td>
                  <td>
                    <span className={`badge ${inv.status.toLowerCase()}`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;