const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON data

// Routes (Placeholder)
app.use("/users", require("./routes/userRoutes"));
app.use("/jobs", require("./routes/jobRoutes"));

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`Server running on http://127.0.0.1:${port}`)
);
