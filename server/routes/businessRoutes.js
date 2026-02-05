import express from "express";
import fs from "fs";
import BusinessProfile from "../models/BusinessProfile.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

/* ================= FETCH PROFILE ================= */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await BusinessProfile.findOne({ user: req.user.id });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

/* ================= SAVE / UPDATE PROFILE ================= */
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "logo" },
    { name: "stamp" },
    { name: "signature" },
  ]),
  async (req, res) => {
    try {
      // ✅ VALIDATION
      if (!req.body.businessName || !req.body.email) {
        return res
          .status(400)
          .json({ error: "Business name & email required" });
      }

      const files = req.files || {};
      let profile = await BusinessProfile.findOne({ user: req.user.id });

      const data = {
        businessName: req.body.businessName,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        gst: req.body.gst,
        tax: req.body.tax,
        owner: req.body.owner,
        designation: req.body.designation,
        user: req.user.id,
      };

      if (files.logo) data.logo = files.logo[0].filename;
      if (files.stamp) data.stamp = files.stamp[0].filename;
      if (files.signature) data.signature = files.signature[0].filename;

      if (profile) {
        await BusinessProfile.findByIdAndUpdate(profile._id, data);
      } else {
        await BusinessProfile.create(data);
      }

      res.json({ message: "Business profile saved successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Profile save failed" });
    }
  }
);

/* ================= REMOVE FILE ================= */
router.delete("/:type", authMiddleware, async (req, res) => {
  try {
    const type = req.params.type;
    const profile = await BusinessProfile.findOne({ user: req.user.id });

    if (!profile || !profile[type]) {
      return res.status(404).json({ error: "File not found" });
    }

    // ✅ SAFE DELETE
    const filePath = `uploads/${profile[type]}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    profile[type] = "";
    await profile.save();

    res.json({ message: "File removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove file" });
  }
});

export default router;
