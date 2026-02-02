import React from "react";
import "./AdminProfileModal.css"; // We'll add modern styles

const AdminProfileModal = ({ open, onClose, user }) => {
  if (!open) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="admin-profile-modal">
        <h2>Admin Profile</h2>
        <div className="profile-content">
          <img src={user.avatar} alt={user.name} />
          <div className="user-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </>
  );
};

export default AdminProfileModal;
    