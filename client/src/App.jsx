import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      {/* 🔔 TOAST POPUP */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        theme="colored"
        style={{ top: "80px" }}   // navbar ની નીચે
      />
    </>
  );
}

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>

//       {/* 🌐 GLOBAL NAVBAR */}
//       <Navbar />

//       {/* 🔀 ROUTES */}
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       {/* 🔔 GLOBAL TOAST */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         newestOnTop
//         theme="colored"
//         style={{ top: "80px" }} // navbar ની નીચે
//       />

//     </BrowserRouter>
//   );
// }

// export default App;



