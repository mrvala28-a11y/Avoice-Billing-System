import { showError } from "../utils/toast";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // 🔔 Logout toast
  showError("You have been logged out");
};
