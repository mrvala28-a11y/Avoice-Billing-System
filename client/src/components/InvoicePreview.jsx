import React, { forwardRef } from "react";
import "./InvoicePreview.css";

const InvoicePreview = forwardRef(
  ({ invoice, subTotal, taxAmount, grandTotal }, ref) => {
    return (
      <div className="invoice-preview" ref={ref}>
        <h2>INVOICE</h2>

        <div className="top">
          <div>
            <p><b>Invoice No:</b> {invoice.invoiceNo}</p>
            <p><b>Date:</b> {invoice.createDate}</p>
            <p>
              <b>Status:</b>{" "}
              <span className={`status ${invoice.status.toLowerCase()}`}>
                {invoice.status}
              </span>
            </p>
          </div>
        </div>

        <hr />

        <div>
          <p><b>Client:</b> {invoice.client}</p>
          <p>{invoice.email}</p>
          <p>{invoice.phone}</p>
          <p>{invoice.address}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((i, idx) => (
              <tr key={idx}>
                <td>{i.name}</td>
                <td>{i.qty}</td>
                <td>₹ {i.price}</td>
                <td>₹ {i.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary">
          <p>Subtotal : ₹ {subTotal}</p>
          <p>Tax : ₹ {taxAmount}</p>
          <h3>Grand Total : ₹ {grandTotal}</h3>
        </div>
      </div>
    );
  }
);

export default InvoicePreview;
