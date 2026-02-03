import { useState } from "react";
import "./BusinessProfile.css";

const BusinessProfile = () => {
  const [business, setBusiness] = useState({
    name: "",
    email: "",
    phone: "",
  });

  return (
    <div className="page-container">
      <h1>Business Profile</h1>

      <div className="business-card">
        <input
          placeholder="Business Name"
          value={business.name}
          onChange={(e) =>
            setBusiness({ ...business, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={business.email}
          onChange={(e) =>
            setBusiness({ ...business, email: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          value={business.phone}
          onChange={(e) =>
            setBusiness({ ...business, phone: e.target.value })
          }
        />

        <button>Save Profile</button>
      </div>
    </div>
  );
};

export default BusinessProfile;
