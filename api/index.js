const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// voices folder বানানো
const voicesDir = path.join(__dirname, "voices");
if (!fs.existsSync(voicesDir)) fs.mkdirSync(voicesDir);

// Multer setup (file upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, voicesDir),
  filename: (req, file, cb) => {
    const customName = req.query.name || `voice_${Date.now()}.mp3`;
    cb(null, customName);
  }
});
const upload = multer({ storage });

// 1️⃣ Upload API
app.post("/upload", upload.single("file"), (req, res) => {
  return res.json({
    success: true,
    fileName: req.file.filename,
    url: `/voice/${req.file.filename}`
  });
});

// 2️⃣ Voice list API
app.get("/voice/list", (req, res) => {
  const files = fs.readdirSync(voicesDir);
  res.json({ voices: files });
});

// 3️⃣ Play specific voice
app.get("/voice/:name", (req, res) => {
  const filePath = path.join(voicesDir, req.params.name);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Voice not found" });
  }
  res.sendFile(filePath);
});

// Start server (only needed locally, Vercel handles this automatically)
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Voice API running on http://localhost:${PORT}`);
  });
}

module.exports = app; // Export app for Vercel
