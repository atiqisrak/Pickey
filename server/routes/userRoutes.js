const express = require("express");
const userController = require("../controllers/userController");
const { auth, adminOnly } = require("../middlewares/auth");

const router = express.Router();

// Register a new user
router.post("/", adminOnly, async (req, res) => {
  try {
    const newUser = await userController.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Get all users (For admin users only, implement authorization middleware)
router.get("/", auth, async (req, res) => {
  try {
    const users = await userController.getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get a user by ID (For authorized users to fetch their own profile or admins to fetch all profiles)
router.get("/:userId", async (req, res) => {
  try {
    const user = await userController.getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user" });
  }
});

// Update a user (For authorized users to update their own profile or admins to update any profile)
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await userController.updateUser(
      req.params.userId,
      req.body
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user" });
  }
});

// Delete a user (For admin users only, implement authorization middleware)
router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await userController.deleteUser(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;
