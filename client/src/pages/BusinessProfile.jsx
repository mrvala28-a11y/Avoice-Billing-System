import { useState } from "react";
import "./BusinessProfile.css";

const BusinessProfile = () => {
  const [form, setForm] = useState({
    businessName: "",
    email: "",
    address: "",
    phone: "",
    gst: "",
    tax: "",
    owner: "",
    designation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bp-page">

      {/* BUSINESS INFO */}
      <div className="card">
        <h3>🏢 Business Information</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Business Name</label>
            <input
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group full">
          <label>Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>GST Number</label>
            <input
              name="gst"
              value={form.gst}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* BRANDING + TAX */}
      <div className="branding">

      
        <div className="card">
          <h3>🖼 Branding & Digital Assets</h3>

          <div className="asset-box">
            {["Company Logo", "Digital Stamp", "Digital Signature"].map(
              (item, i) => (
                <div key={i}>
                  <div className="asset">
                    <div className="asset-buttons">
                      <button className="change">Change</button>
                      <button className="remove">Remove</button>
                    </div>
                  </div>
                  <div className="asset-label">{item}</div>
                </div>
              )
            )}
          </div>
        </div>

   
        <div className="card tax-box">
          <h3>💰 Tax Setting</h3>

          <label>Default Tax Percentage</label>
          <div className="tax-input">
            <input
              type="number"
              name="tax"
              value={form.tax}
              onChange={handleChange}
            />

          </div>

          <label>Signature Owner Name</label>
          <input
            name="owner"
            value={form.owner}
            onChange={handleChange}
          />

          <label>Signature Title / Designation</label>
          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
          />
        </div>

      </div>

      {/* ACTIONS */}
      <div className="card actions">
        <button className="save-btn">💾 Save Profile</button>
        <button className="clear-btn">🔄 Clear Profile</button>
      </div>
    </div>
  );
};

export default BusinessProfile;
