const User = require("../models/user");
const hashPassword = require("../utils/hashPassword");

exports.registerUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  const newUser = new User({
    ...userData,
    password: hashedPassword,
  });
  return await newUser.save();
};

// Function to get all users (consider adding filters and pagination for larger datasets)
exports.getUsers = async () => {
  return await User.find();
};

// Function to get a user by ID
exports.getUserById = async (userId) => {
  return await User.findById(userId);
};

// Function to update a user (assuming validation and authorization are done elsewhere)
exports.updateUser = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
  return user;
};

// Function to delete a user (assuming authorization is done elsewhere)
exports.deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};
