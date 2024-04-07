const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1]; // Assuming 'Authorization' header with 'Bearer token' format
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user information to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Optional: Middleware to check for specific roles (e.g., adminOnly)
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin access only" });
  }
  next();
};

module.exports = { auth, adminOnly }; // Export both middleware functions
