import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import API from "../services/api";
import { showSuccess, showError } from "../utils/toast";
import "./AdminProfileModal.css";

const AdminProfileModal = ({ open, onClose }) => {
  const [user, setUser] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔔 Notification states
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // 🔁 Load user & notifications
  useEffect(() => {
    if (open) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);

      const storedNotifications =
        JSON.parse(localStorage.getItem("adminNotifications")) || [];

      setNotifications(storedNotifications);
      setUnreadCount(storedNotifications.length);
    }
  }, [open]);

  if (!open || !user) return null;

  // 🔔 Bell click → mark all as seen
  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    setUnreadCount(0);
  };

  // 🔘 Clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem("adminNotifications");
  };

  // 🔐 Update password
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

      const newNotification = {
        id: Date.now(),
        message: `Password updated by ${user.name}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };

      const updatedNotifications = [
        newNotification,
        ...notifications,
      ];

      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.length);

      localStorage.setItem(
        "adminNotifications",
        JSON.stringify(updatedNotifications)
      );

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
      {/* Overlay */}
      <div className="overlay" onClick={onClose}></div>

      <div className="admin-profile-modal">
        {/* HEADER */}
        <div className="modal-header">
          <h2>Admin Profile</h2>

          {/* 🔔 Bell */}
          <div className="notification-bell" onClick={handleBellClick}>
            <FaBell />
            {unreadCount > 0 && (
              <span className="notification-count">
                {unreadCount}
              </span>
            )}
          </div>

          {/* 🔽 Dropdown */}
          {showNotifications && (
            <div className="notification-dropdown">

              {notifications.length > 0 && (
                <button className="clear-btn" onClick={handleClearAll}>
                  Clear All
                </button>
              )}

              {notifications.length === 0 ? (
                <p className="empty-text">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="notification-item">
                    <p>{n.message}</p>
                    <span>
                      {n.date} • {n.time}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* USER INFO */}
        <div className="profile-section">
          <label>Name</label>
          <input value={user.name} disabled />

          <label>Email</label>
          <input value={user.email} disabled />
        </div>

        {/* PASSWORD */}
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
          <button
            className="update-btn"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminProfileModal;
