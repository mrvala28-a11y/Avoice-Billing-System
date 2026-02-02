import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { showWarning } from "../utils/toast";
import ConfirmLogout from "./ConfirmLogout";
import AdminProfileModal from "./AdminProfileModal";
import logoImg from "../assets/download (3).png"; 
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openLogout, setOpenLogout] = useState(false); 
  const [openAdmin, setOpenAdmin] = useState(false);

  // Simulated logged-in user data
  const user = {
    name: "Vivek Vala",
    email: "vivek@example.com",
    role: "Admin",
    avatar: "https://i.pravatar.cc/100?img=12"
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    showWarning("You have been logged out ⚠️");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <aside className="sidebar fixed">
        <div className="sidebar-top">
          <div className="logo">
            <img src={logoImg} alt="Logo" />
            <h3>Invoice & <br /> Billing System</h3>
          </div>
        </div>

        <ul className="menu center-menu">
          <li className={isActive("/dashboard") ? "active" : ""}>
            <Link to="/dashboard"><i className="fa fa-house"></i><span>Dashboard</span></Link>
          </li>
          <li className={isActive("/manage-invoice") ? "active" : ""}>
            <Link to="/manage-invoice"><i className="fa fa-file-invoice"></i><span>Invoice</span></Link>
          </li>
          <li className={isActive("/create-invoice") ? "active" : ""}>
            <Link to="/create-invoice"><i className="fa fa-circle-plus"></i><span>Create Invoice</span></Link>
          </li>
          <li className={isActive("/business") ? "active" : ""}>
            <Link to="/business"><i className="fa fa-building"></i><span>Business Profile</span></Link>
          </li>
        </ul>

        <ul className="menu bottom-menu">
          <li onClick={() => setOpenAdmin(true)}>
            <i className="fa fa-user-gear"></i>
            <span>Admin Profile</span>
          </li>
          <li onClick={() => setOpenLogout(true)}>
            <i className="fa fa-right-from-bracket"></i>
            <span>Logout</span>
          </li>
        </ul>
      </aside>

      <ConfirmLogout open={openLogout} onConfirm={confirmLogout} onCancel={() => setOpenLogout(false)} />
      <AdminProfileModal open={openAdmin} onClose={() => setOpenAdmin(false)} user={user} />
    </>
  );
};

export default Sidebar;
