import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./BusinessProfile.css";

const BusinessProfile = () => {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    businessName: "",
    email: "",
    address: "",
    phone: "",
    gst: "",
    tax: "",
    owner: "",
    designation: "",
    logo: null,
    stamp: null,
    signature: null,
  });

  const [preview, setPreview] = useState({
    logo: null,
    stamp: null,
    signature: null,
  });

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/business-profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!res.data) return;

        setForm((prev) => ({ ...prev, ...res.data }));
        setPreview({
          logo: res.data.logo,
          stamp: res.data.stamp,
          signature: res.data.signature,
        });
      })
      .catch(() => {});
  }, [token]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      toast.error("Only PNG or JPG allowed");
      return;
    }

    setForm({ ...form, [name]: file });
    setPreview({ ...preview, [name]: URL.createObjectURL(file) });
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!form.businessName || !form.email) {
      toast.error("Business Name & Email are required");
      return;
    }

    try {
      const fd = new FormData();
      Object.keys(form).forEach(
        (k) => form[k] !== null && fd.append(k, form[k])
      );

      await axios.post(
        "http://localhost:5000/api/business-profile",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Business Profile Saved");
    } catch (err) {
      toast.error(err.response?.data?.error || "Save failed");
    }
  };

  /* ================= REMOVE FILE ================= */
  const removeAsset = async (type) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/business-profile/${type}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPreview({ ...preview, [type]: null });
      setForm({ ...form, [type]: null });
      toast.success("File removed");
    } catch {
      toast.error("Remove failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="bp-page">

      {/* BUSINESS INFO */}
      <div className="card">
        <h3>🏢 Business Information</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Business Name *</label>
            <input name="businessName" value={form.businessName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input name="email" value={form.email} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group full">
          <label>Address</label>
          <input name="address" value={form.address} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input name="phone" value={form.phone} onChange={handleChange} />
          <input name="gst" value={form.gst} onChange={handleChange} />
        </div>
      </div>

      {/* BRANDING */}
     {/* BRANDING */}
<div className="branding">
  <div className="card">
    <h3>🖼 Branding & Digital Assets</h3>

    <div className="asset-box">
      {[
        { label: "Company Logo", name: "logo" },
        { label: "Digital Stamp", name: "stamp" },
        { label: "Digital Signature", name: "signature" },
      ].map((item) => (
        <div className="asset-item" key={item.name}>

          {/* IMAGE BOX */}
          <div className="asset">
            {preview[item.name] ? (
              <img
                src={
                  preview[item.name].startsWith("blob")
                    ? preview[item.name]
                    : `http://localhost:5000/uploads/${preview[item.name]}`
                }
                alt={item.label}
              />
            ) : (
              <span style={{ color: "#94a3b8", fontSize: 13 }}>
                No Image
              </span>
            )}
          </div>

          {/* BUTTONS BELOW IMAGE */}
          <div className="asset-actions">
            <label className="upload-btn">
              Choose
              <input
                type="file"
                name={item.name}
                accept="image/png,image/jpeg"
                onChange={handleFileChange}
                hidden
              />
            </label>

            {preview[item.name] && (
              <button
                className="remove-btn"
                onClick={() => removeAsset(item.name)}
              >
                Remove
              </button>
            )}
          </div>

          {/* LABEL */}
          <div className="asset-label">{item.label}</div>
        </div>
      ))}
    </div>
  </div>

  {/* TAX */}
  <div className="card tax-box">
    <h3>💰 Tax Setting</h3>

    <input
      name="tax"
      value={form.tax}
      onChange={handleChange}
      placeholder="Tax %"
    />

    <input
      name="owner"
      value={form.owner}
      onChange={handleChange}
      placeholder="Owner Name"
    />

    <input
      name="designation"
      value={form.designation}
      onChange={handleChange}
      placeholder="Designation"
    />
  </div>
</div>


      <div className="card actions">
        <button className="save-btn" onClick={handleSave}>
          💾 Save Profile
        </button>
      </div>
    </div>
  );
};

export default BusinessProfile;
