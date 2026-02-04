import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import ManageInvoice from "./pages/ManageInvoice";
import CreateInvoice from "./pages/CreateInvoice";
import BusinessProfile from "./pages/BusinessProfile";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* PROTECTED WITH SIDEBAR */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Sidebar />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="manage-invoice" element={<ManageInvoice />} />
            <Route path="create-invoice" element={<CreateInvoice />} />
            <Route path="business" element={<BusinessProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;
