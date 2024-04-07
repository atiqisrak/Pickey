const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "candidate"],
    required: true,
  },
  company: {
    type: String,
  },
  name: {
    type: String,
  },
  // Add a field to store JWT refresh token (optional for future use)
  refreshToken: {
    type: String,
  },
});

// Method to generate JWT access token
userSchema.methods.generateAccessToken = async function () {
  const user = this;
  const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};

// Method to generate JWT refresh token
userSchema.methods.generateRefreshToken = async function () {
  const user = this;
  const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return refreshToken;
};

// Method to hash user password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Method to compare user password
userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

// Method to find user by email
userSchema.statics.findByEmail = async function (email) {
  return await this.findOne({
    email,
  });
};

// Method to find user by ID
userSchema.statics.findById = async function (_id) {
  return await this.findOne({
    _id,
  });
};

// Method to find user by refresh token
userSchema.statics.findByRefreshToken = async function (refreshToken) {
  return await this.findOne({
    refreshToken,
  });
};

// Method to delete refresh token
userSchema.methods.deleteRefreshToken = async function () {
  const user = this;
  user.refreshToken = null;
  await user.save();
};

module.exports = mongoose.model("User", userSchema);
