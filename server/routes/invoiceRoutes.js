import express from "express";
import Invoice from "../models/Invoice.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE */
router.post("/", auth, async (req, res) => {
  const invoice = await Invoice.create({
    ...req.body,
    user: req.user.id,
  });
  res.json(invoice);
});

/* GET ALL */
router.get("/", auth, async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const invoices = await Invoice.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(+limit);

  const total = await Invoice.countDocuments({ user: req.user.id });

  res.json({
    invoices,
    totalPages: Math.ceil(total / limit),
  });
});

/* GET ONE */
router.get("/:id", auth, async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  res.json(invoice);
});

/* UPDATE */
router.put("/:id", auth, async (req, res) => {
  const updated = await Invoice.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* DELETE */
router.delete("/:id", auth, async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ message: "Invoice deleted" });
});

export default router;
