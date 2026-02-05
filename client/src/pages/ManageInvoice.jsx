import React, { useEffect, useState } from "react";
import { FaEye, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Navigation માટે
import "./ManageInvoice.css";

const ManageInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const limit = 5;
  const token = localStorage.getItem("token");

  const tabList = ["All", "Paid", "Unpaid", "OverDue", "Draft"];

  useEffect(() => {
    fetchInvoices(page);
  }, [page]);

  const fetchInvoices = async (pageNo) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/invoices?page=${pageNo}&limit=${limit}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      if (res.status === 401) {
        alert("Session expired. Please login again.");
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

  // --- DELETE FUNCTION ---
  const handleDelete = async (id) => {
    if (window.confirm("Invoive Delette ?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/invoices/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.ok) {
          // સ્ટેટ અપડેટ કરો જેથી પેજ રીલોડ વગર ડેટા જતો રહે
          setInvoices(invoices.filter((inv) => inv._id !== id));
          alert("Invoice deleted successfully!");
        }
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Paid": return { background: "#e8f5e9", color: "#0f9d58" };
      case "Unpaid": return { background: "#fff8e1", color: "#f4a100" };
      case "OverDue": return { background: "#ffebee", color: "#e53935" };
      default: return { background: "#eff6ff", color: "#3b82f6" };
    }
  };

  const filteredData = activeTab === "All"
    ? invoices
    : invoices.filter(inv => inv.status === activeTab);

  return (
    <div className="manage-invoice-container">
      <div className="invoice-header">
        <h2>Invoice Management</h2>
      </div>

      <div className="tabs">
        {tabList.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => { setActiveTab(tab); setPage(1); }}
          >
            {tab}
          </button>
        ))}
      </div>

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
                    {/* View Icon Click */}
                    <FaEye
                      className="view-icon"
                      style={{ cursor: "pointer", color: "#3b82f6" }}
                      onClick={() => navigate(`/dashboard/view-invoice/${inv._id}`)}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className="action-btns">
                      <button
                        className="update-btn"
                         onClick={() => navigate(`/dashboard/edit-invoice/${inv._id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(inv._id)}
                      >
                        <FaTrash />
                      </button>
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