const express = require("express");
const router = express.Router();
const rolePermissionController = require("../controllers/rolepermissions.controller");

// Middleware for authorization

// Get all rolepermissions
router.get("/", rolePermissionController.getAllRolePermissions);

// Get a single rolepermission
router.get("/:id", rolePermissionController.getRolePermissionsById);

// Create a new rolepermission
router.post("/", rolePermissionController.createRolePermissions);

// Update a rolepermission
router.put("/:id", rolePermissionController.updateRolePermissions);

// Delete a rolepermission
router.delete("/:id", rolePermissionController.deleteRolePermissions);

// Get all rolepermissions by role id
router.get("/role/:id", rolePermissionController.getByRoleId);

// Get all rolepermissions by permission id
router.get("/permission/:id", rolePermissionController.getByPermissionId);

module.exports = router;
