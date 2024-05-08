const RolePermission = require("../models/rolepermissions.model");

const getAllRolePermissions = async (req, res) => {
  try {
    const rolepermissions = await RolePermission.getAllRolePermissions();
    res.json(rolepermissions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error occurred" });
  }
};

const getRolePermissionsById = async (req, res) => {
  const id = req.params.id;
  try {
    const rolePermission = await RolePermission.getRolePermissionsById(id);
    res.json(rolePermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByRoleId = async (req, res) => {
  const id = req.params.id;
  try {
    const rolePermissions = await RolePermission.getByRoleId(id);
    res.json(rolePermissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByPermissionId = async (req, res) => {
  const id = req.params.id;
  try {
    const rolePermissions = await RolePermission.getByPermissionId(id);
    res.json(rolePermissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------- Create a new role permission ----------------------

const createRolePermissions = async (req, res) => {
  const { role_id, permission_id } = req.body;
  try {
    const newRolePermission = await RolePermission.createRolePermissions(
      role_id,
      permission_id
    );
    res.status(201).json(newRolePermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRolePermissions = async (req, res) => {
  const id = req.params.id;
  const { role_id, permission_id } = req.body;
  try {
    const rolePermission = new RolePermission(id, role_id, permission_id);
    const updatedRolePermission = await rolePermission.update();
    res.json(updatedRolePermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRolePermissions = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedRolePermission = await RolePermission.delete(id);
    res.json(deletedRolePermission.message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRolePermissions,
  getRolePermissionsById,
  createRolePermissions,
  updateRolePermissions,
  deleteRolePermissions,
  getByRoleId,
  getByPermissionId,
};
