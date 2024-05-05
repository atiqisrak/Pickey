const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");
const routes = require("./routes");

// middleware
app.use(cors());
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

// Mount routes
app.use(routes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
