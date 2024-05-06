const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogs.controller");

// Middleware for authorization

// Get all blogs
router.get("/", blogController.getAllBlogs);

// Get a single blog
router.get("/:id", blogController.getBlogById);

// Create a new blog
router.post("/", blogController.createBlog);

// Update a blog
router.put("/:id", blogController.updateBlog);

// Delete a blog
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
