import { useEffect, useState } from "react";
import "./Header.css";
import { markAllAsSeen } from "../utils/notifications"; // ✅ import

const Header = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, []);

  // Update notifications if localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
      setNotifications(updatedNotifications);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);

    if (!showPopup) {
      // ✅ mark all as seen when opening popup
      markAllAsSeen();
      const updatedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
      setNotifications(updatedNotifications);
    }
  };

  const unseenCount = notifications.filter((n) => !n.seen).length;
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  return (
    <header className="app-header">
      <div className="header-left">
        <h2>
          Welcome Back,
          <span> {user?.name || "Admin"}</span>
        </h2>
        <p>Ready to amazing invoice ✨</p>
      </div>

      <div className="header-right">
        <div className="notification-wrapper" onClick={togglePopup}>
          <span className="bell">🔔</span>
          {unseenCount > 0 && <span className="notif-count">{unseenCount}</span>}

          {showPopup && (
            <div className="notification-popup">
              <h4>Notifications</h4>
              {notifications.length === 0 ? (
                <p>No notifications</p>
              ) : (
                <ul>
                  {notifications
                    .slice()
                    .reverse()
                    .map((notif, index) => (
                      <li key={index}>
                        <strong>{notif.type}</strong> - {notif.message}{" "}
                        <span className="time">{notif.time}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="avatar">
          {firstLetter}
          <span className="online-dot"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
