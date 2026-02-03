export const addNotification = (type, message) => {
  const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
  const newNotif = {
    type,
    message,
    time: new Date().toLocaleString(),
    seen: false, // ✅ mark new notification as unseen
  };
  notifications.push(newNotif);
  localStorage.setItem("notifications", JSON.stringify(notifications));
};

// ✅ Mark all notifications as seen
export const markAllAsSeen = () => {
  const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
  const updated = notifications.map((n) => ({ ...n, seen: true }));
  localStorage.setItem("notifications", JSON.stringify(updated));
};
