const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const valid = ["image/jpeg", "image/png", "image/webp"];
  valid.includes(file.mimetype) ? cb(null, true) : cb(new Error("Invalid file type"));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
