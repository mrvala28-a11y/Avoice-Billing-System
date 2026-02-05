import React, { useEffect, useState } from "react";
import { FaEye, FaPlus, FaTrash } from "react-icons/fa";
import "./ManageInvoice.css";

const ManageInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  const limit = 5;

  // Tabs structure with count logic
  const tabList = ["All", "Paid", "Unpaid", "OverDue", "Draft"];

  useEffect(() => {
    fetchInvoices(page);
  }, [page]);

  const fetchInvoices = async (pageNo) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Token fetch
      const res = await fetch(
        `http://localhost:5000/api/invoices?page=${pageNo}&limit=${limit}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Header fixed
            "Content-Type": "application/json"
          }
        }
      );

      if (res.status === 401) {
        alert("Unauthorized! Please login again.");
        return;
      }

      const data = await res.json();
      setInvoices(data.invoices || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  // Status-wise styling
  const statusStyle = (status) => {
    switch (status) {
      case "Paid": return { background: "#e8f5e9", color: "#0f9d58" };
      case "Unpaid": return { background: "#fff8e1", color: "#f4a100" };
      case "OverDue": return { background: "#ffebee", color: "#e53935" };
      default: return { background: "#eff6ff", color: "#3b82f6" };
    }
  };

  // Filtering based on Tabs
  const filteredData = activeTab === "All" 
    ? invoices 
    : invoices.filter(inv => inv.status === activeTab);

  return (
    <div className="manage-invoice-container">
      {/* Header */}
      <div className="invoice-header">
        <h2>Invoice Management</h2>
        <button className="create-btn">
          <FaPlus /> Create Invoice
        </button>
      </div>

      {/* Modern Full-Width Tabs */}
      <div className="tabs">
        {tabList.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => {
              setActiveTab(tab);
              setPage(1);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="invoice-table-box">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Create</th>
              <th>Due</th>
              <th>Amount</th>
              <th>Status</th>
              <th>View</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" className="no-data">Loading...</td></tr>
            ) : filteredData.length === 0 ? (
              <tr><td colSpan="9" className="no-data">No invoices found</td></tr>
            ) : (
              filteredData.map((inv) => (
                <tr key={inv._id} className="table-row">
                  <td style={{ textAlign: "center" }}>#{inv.invoiceNo}</td>
                  <td><b>{inv.client}</b></td>
                  <td style={{ textAlign: "center" }}>{inv.createDate}</td>
                  <td style={{ textAlign: "center" }}>{inv.dueDate}</td>
                  <td style={{ textAlign: "center" }}><b>₹{inv.amount}</b></td>
                  <td style={{ textAlign: "center" }}>
                    <span className="status-badge" style={statusStyle(inv.status)}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <FaEye className="view-icon" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className="action-btns">
                      <button className="update-btn">Update</button>
                      <button className="delete-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageInvoice;