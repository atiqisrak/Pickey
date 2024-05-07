const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/api.routes");
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use(routes);

// Set the view engine to ejs
app.set("view engine", "ejs");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/images", (req, res) => {
  res.send("Hello World");
});

app.post("/images", upload.single("image"), (req, res) => {
  // res.send("Uploaded Successfully");
  res.json(req.file);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
