import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ManageInvoice.css";

const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState({
    client: "",
    email: "",
    amount: "",
    status: "Draft",
    dueDate: ""
  });

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  /* ===== FETCH INVOICE DETAILS ===== */
  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/invoices/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();
        setInvoice(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoice:", error);
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, [id, token]);

  /* ===== HANDLE INPUT CHANGE ===== */
  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value
    });
  };

  /* ===== UPDATE INVOICE ===== */
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/api/invoices/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(invoice)
        }
      );

      if (res.ok) {
        alert("Invoice Updated Successfully!");
        navigate("/dashboard/manage-invoice"); // ✅ correct redirect
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="manage-invoice-container">
      <h2>Edit Invoice #{invoice.invoiceNo}</h2>

      <form onSubmit={handleUpdate} className="edit-form">

        <div className="form-group">
          <label>Client Name</label>
          <input
            type="text"
            name="client"
            value={invoice.client}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={invoice.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={invoice.status}
            onChange={handleChange}
          >
            <option value="Draft">Draft</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="OverDue">OverDue</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={invoice.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="action-btns" style={{ marginTop: "20px" }}>
          <button type="submit" className="create-btn">
            Save Changes
          </button>

          <button
            type="button"
            className="delete-btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditInvoice;
