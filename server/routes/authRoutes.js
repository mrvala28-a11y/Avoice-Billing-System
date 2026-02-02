// import express from "express";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import authMiddleware from "../middleware/authMiddleware.js";
// import { signupUser, loginUser } from "../controllers/authController.js";

// const router = express.Router();

// // existing routes (NO CHANGE)
// router.post("/signup", signupUser);
// router.post("/login", loginUser);

// // 🔐 CHANGE PASSWORD ROUTE (NEW)
// router.post("/change-password", authMiddleware, async (req, res) => {
//   try {
//     const { oldPassword, newPassword } = req.body;

//     if (!oldPassword || !newPassword) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (newPassword.length < 6) {
//       return res
//         .status(400)
//         .json({ message: "New password must be at least 6 characters" });
//     }

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Old password is incorrect" });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     res.json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { signupUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// existing routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

// 🔐 CHANGE PASSWORD
router.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters" });
    }

    // ✅ req.user.id MUST exist
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
