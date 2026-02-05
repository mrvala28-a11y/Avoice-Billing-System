import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number,
  total: Number,
});

const invoiceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    client: String,
    email: String,
    phone: String,
    address: String,

    invoiceNo: String,
    createDate: String,
    dueDate: String,

    status: {
      type: String,
      enum: ["Draft", "Paid", "Unpaid", "OverDue"],
      default: "Draft",
    },

    tax: Number,
    items: [itemSchema],
    amount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
