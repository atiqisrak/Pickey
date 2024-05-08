const Permission = require("../models/permissions.model");

const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.getAllPermissions();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPermissionById = async (req, res) => {
  const id = req.params.id;
  try {
    const permission = await Permission.getPermissionById(id);
    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPermission = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newPermission = await Permission.createPermission(name, description);
    res.status(201).json(newPermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePermission = async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const updatedPermission = await Permission.updatePermission(
      id,
      name,
      description
    );
    res.json(updatedPermission.message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePermission = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedPermission = await Permission.deletePermissionById(id);
    res.json(deletedPermission.message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
};
