const express = require("express");
const router = express.Router();

const rolesController = require("../controllers/roles.controller");

// Middleware for authorization

// Get all roles
router.get("/", rolesController.getAllRoles);

// Get a single role
router.get("/:id", rolesController.getRoleById);

// Create a new role
router.post("/", rolesController.createRole);

// Update a role
router.put("/:id", rolesController.updateRole);

// Delete a role
router.delete("/:id", rolesController.deleteRole);

module.exports = router;
