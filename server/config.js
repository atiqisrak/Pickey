// This file is not strictly required if you're comfortable defining the database connection URI directly in your server.js file.
// However, it's a recommended practice to separate sensitive configuration from your main application code.

const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from a .env file

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  // Add other configurations as needed (e.g., API keys, secret tokens)
};
