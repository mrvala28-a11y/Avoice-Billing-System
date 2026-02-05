import mongoose from "mongoose";

const businessProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    businessName: { type: String, required: true },
    email: { type: String, required: true },
    address: String,
    phone: String,
    gst: String,
    tax: String,
    owner: String,
    designation: String,
    logo: String,
    stamp: String,
    signature: String,
  },
  { timestamps: true }
);

export default mongoose.model("BusinessProfile", businessProfileSchema);
