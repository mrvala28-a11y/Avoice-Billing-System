import { useEffect, useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import html2pdf from "html2pdf.js";
import InvoicePreview from "../components/InvoicePreview";
import "./CreateInvoice.css";

const CreateInvoice = () => {
  const token = localStorage.getItem("token");
  const previewRef = useRef(null);

  const [showPreview, setShowPreview] = useState(false);

  const [invoice, setInvoice] = useState({
    client: "",
    email: "",
    phone: "",
    address: "",
    invoiceNo: "",
    createDate: "",
    dueDate: "",
    status: "Draft", // ✅ default
    tax: 0,
    items: [{ name: "", qty: 1, price: 0, total: 0 }],
  });

  /* ================= INIT ================= */
  useEffect(() => {
    setInvoice((p) => ({
      ...p,
      invoiceNo: "INV-" + Math.floor(100000 + Math.random() * 900000),
      createDate: new Date().toISOString().split("T")[0],
    }));
  }, []);

  /* ================= ITEMS ================= */
  const updateItem = (i, field, val) => {
    const items = [...invoice.items];
    items[i][field] = val;
    items[i].total = items[i].qty * items[i].price;
    setInvoice({ ...invoice, items });
  };

  const addItem = () =>
    setInvoice({
      ...invoice,
      items: [...invoice.items, { name: "", qty: 1, price: 0, total: 0 }],
    });

  const removeItem = (i) => {
    if (invoice.items.length === 1) return;
    setInvoice({
      ...invoice,
      items: invoice.items.filter((_, idx) => idx !== i),
    });
  };

  /* ================= TOTAL ================= */
  const subTotal = invoice.items.reduce((s, i) => s + i.total, 0);
  const taxAmount = (subTotal * invoice.tax) / 100;
  const grandTotal = subTotal + taxAmount;

  /* ================= SAVE ================= */
  const saveInvoice = async () => {
    if (!invoice.client) {
      toast.error("Client name required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/invoices",
        { ...invoice, amount: grandTotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Invoice Saved");
    } catch {
      toast.error("Save failed");
    }
  };

  /* ================= PDF ================= */
  const downloadPDF = () => {
    if (!previewRef.current) return;

    html2pdf()
      .set({
        margin: 10,
        filename: `${invoice.invoiceNo}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(previewRef.current)
      .save();
  };

  return (
    <div className="manage-invoice-container">
      <h2>Create Invoice</h2>

      {/* CLIENT */}
      <div className="card">
        <input placeholder="Client Name"
          value={invoice.client}
          onChange={(e) => setInvoice({ ...invoice, client: e.target.value })}
        />
        <input placeholder="Email"
          value={invoice.email}
          onChange={(e) => setInvoice({ ...invoice, email: e.target.value })}
        />
        <input placeholder="Phone"
          value={invoice.phone}
          onChange={(e) => setInvoice({ ...invoice, phone: e.target.value })}
        />
        <input placeholder="Address"
          value={invoice.address}
          onChange={(e) => setInvoice({ ...invoice, address: e.target.value })}
        />
      </div>

      {/* STATUS BUTTONS ✅ */}
      <div className="card status-buttons">
        {["Draft", "Paid", "Unpaid", "Overdue"].map((s) => (
          <button
            key={s}
            className={invoice.status === s ? "active" : ""}
            onClick={() => setInvoice({ ...invoice, status: s })}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ITEMS */}
      <div className="card">
        {invoice.items.map((item, i) => (
          <div className="item-row" key={i}>
            <input
              placeholder="Item"
              value={item.name}
              onChange={(e) => updateItem(i, "name", e.target.value)}
            />
            <input
              type="number"
              value={item.qty}
              onChange={(e) => updateItem(i, "qty", +e.target.value)}
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => updateItem(i, "price", +e.target.value)}
            />
            <input value={item.total} disabled />
            <FaTrash onClick={() => removeItem(i)} />
          </div>
        ))}
        <button onClick={addItem}>
          <FaPlus /> Add Item
        </button>
      </div>

      {/* TOTAL */}
      <div className="card">
        <p>Subtotal : ₹ {subTotal}</p>
        <p>Tax : ₹ {taxAmount}</p>
        <h3>Total : ₹ {grandTotal}</h3>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setShowPreview(true)}>👁 Preview</button>
        <button onClick={saveInvoice}>💾 Save</button>
      </div>

      {/* PREVIEW */}
      {showPreview && (
        <div className="preview-modal">
          <div className="preview-box">
            <InvoicePreview
              ref={previewRef}
              invoice={invoice}
              subTotal={subTotal}
              taxAmount={taxAmount}
              grandTotal={grandTotal}
            />

            <div className="preview-actions">
              <button onClick={downloadPDF}>⬇ Download PDF</button>
              <button onClick={() => setShowPreview(false)}>❌ Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;
