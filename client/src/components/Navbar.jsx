import { useNavigate } from "react-router-dom";
import { showWarning } from "../utils/toast";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    showWarning("You have been logged out ⚠️");
    navigate("/");
  };

  return (
    <nav style={{ padding: "10px", background: "#111", color: "#fff" }}>
      <span>Invoice System</span>
      <button
        onClick={logout}
        style={{
          float: "right",
          cursor: "pointer",
          background: "transparent",
          color: "#fff",
          border: "1px solid #555",
          padding: "5px 10px",
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
