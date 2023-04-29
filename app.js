const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const uploadDir = path.join(__dirname, 'public');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 1048576,
  }
});

const upload = multer({
  storage: multerConfig
});

app.use(express.static('public'));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
