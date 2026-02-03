import "./ManageInvoice.css";

const ManageInvoice = () => {
  return (
    <div className="page-container">
      <h1>Manage Invoices</h1>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Client</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>ABC Pvt Ltd</td>
            <td>12-02-2026</td>
            <td>₹12,500</td>
            <td className="paid">Paid</td>
            <td>
              <button className="btn edit">Edit</button>
              <button className="btn delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageInvoice;
