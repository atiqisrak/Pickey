const express = require("express");
const blogController = require("./controllers/blogController");
const keywordController = require("./controllers/keywordController");
const roleController = require("./controllers/roleController");
const categoryController = require("./controllers/categoryController");

const router = express.Router();

// Blog Routes (adjust paths as needed)
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.getBlogById);
router.post("/blogs", blogController.createBlog);
router.put("/blogs/:id", blogController.updateBlog);
router.delete("/blogs/:id", blogController.deleteBlog);

// Keyword Routes
router.get("/keywords", keywordController.getAllKeywords);
router.get("/keywords/:id", keywordController.getKeywordById);
router.post("/keywords", keywordController.createKeyword);
router.put("/keywords/:id", keywordController.updateKeyword);
router.delete("/keywords/:id", keywordController.deleteKeyword);

// Role Routes (if applicable)
router.get("/roles", roleController.getAllRoles); // Adjust as needed
router.get("/roles/:id", roleController.getRoleById); // Adjust as needed
router.post("/roles", roleController.createRole); // Adjust as needed
router.put("/roles/:id", roleController.updateRole); // Adjust as needed
router.delete("/roles/:id", roleController.deleteRole); // Adjust as needed

// Category Routes
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.post("/categories", categoryController.createCategory);
router.put("/categories/:id", categoryController.updateCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

module.exports = router;
