import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { showWarning } from "../utils/toast";
import ConfirmLogout from "./ConfirmLogout";
import AdminProfileModal from "./AdminProfileModal";
import Header from "./Header";
import logoImg from "../assets/download (3).png";
import "./Sidebar.css";
import ScrollToTop from "./ScrollToTop";


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openLogout, setOpenLogout] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showWarning("You have been logged out ⚠️");
    navigate("/");
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <>
      {/* SIDEBAR */}
      <aside className="sidebar fixed">
        <div className="sidebar-top">
          <div className="logo">
            <img src={logoImg} alt="Logo" />
            <h3>
              Invoice & <br /> Billing System
            </h3>
          </div>
        </div>

        {/* CENTER MENU */}
        <ul className="menu center-menu">
          <li className={isActive("/dashboard") ? "active" : ""}>
            <Link to="/dashboard">
              <i className="fa fa-house"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className={isActive("/manage-invoice") ? "active" : ""}>
            <Link to="/dashboard/manage-invoice">
              <i className="fa fa-file-invoice"></i>
              <span>Manage Invoice</span>
            </Link>
          </li>

          <li className={isActive("/create-invoice") ? "active" : ""}>
            <Link to="/dashboard/create-invoice">
              <i className="fa fa-circle-plus"></i>
              <span>Create Invoice</span>
            </Link>
          </li>

          <li className={isActive("/business") ? "active" : ""}>
            <Link to="/dashboard/business">
              <i className="fa fa-building"></i>
              <span>Business Profile</span>
            </Link>
          </li>
        </ul>

        {/* BOTTOM MENU */}
        <ul className="menu bottom-menu">
          <li onClick={() => setOpenProfile(true)}>
            <i className="fa fa-user-gear"></i>
            <span>Admin Profile</span>
          </li>

          <li onClick={() => setOpenLogout(true)}>
            <i className="fa fa-right-from-bracket"></i>
            <span>Logout</span>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
        {/* MAIN CONTENT */}
    <div className="main-content">
      <Header />
      <Outlet />
    </div>

      {/* MODALS */}
      <ConfirmLogout
        open={openLogout}
        onConfirm={confirmLogout}
        onCancel={() => setOpenLogout(false)}
      />

      <AdminProfileModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      />
      <ScrollToTop />
    </>
  );
};

export default Sidebar;
