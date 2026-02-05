import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG / PNG allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
});
