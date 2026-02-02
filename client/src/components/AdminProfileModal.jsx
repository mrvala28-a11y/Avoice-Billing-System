import { useState, useEffect } from "react";
import API from "../services/api";
import { showSuccess, showError } from "../utils/toast";
import "./AdminProfileModal.css";

const AdminProfileModal = ({ open, onClose }) => {
  const [user, setUser] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    }
  }, [open]);

  if (!open || !user) return null;

  const handleUpdate = async () => {
    if (!oldPassword || !newPassword) {
      showError("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      showError("New password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      showSuccess("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      onClose();

    } catch (err) {
      showError(err.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>

      <div className="admin-profile-modal">
        <h2>Admin Profile</h2>

        {/* USER INFO */}
        <div className="profile-section">
          <label>Name</label>
          <input value={user.name} disabled />

          <label>Email</label>
          <input value={user.email} disabled />
        </div>

        {/* PASSWORD CHANGE */}
        <div className="profile-section">
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* BUTTONS */}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="update-btn" onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminProfileModal;
