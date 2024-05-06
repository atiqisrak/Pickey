const express = require("express");
const router = express.Router();
const permissionsController = require("../controllers/permissions.controller");

// Middleware for authorization

// Get all permissions
router.get("/", permissionsController.getAllPermissions);

// Get a single permission
router.get("/:id", permissionsController.getPermissionById);

// Create a new permission
router.post("/", permissionsController.createPermission);

// Update a permission
router.put("/:id", permissionsController.updatePermission);

// Delete a permission
router.delete("/:id", permissionsController.deletePermission);

module.exports = router;
