import { useState } from "react";
import "./CreateInvoice.css";

const CreateInvoice = () => {
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ client, amount });
  };

  return (
    <div className="page-container">
      <h1>Create Invoice</h1>

      <form className="invoice-form" onSubmit={handleSubmit}>
        <label>Client Name</label>
        <input
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="Client Name"
        />

        <label>Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />

        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
};

export default CreateInvoice;
