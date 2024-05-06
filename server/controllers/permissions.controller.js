const Permission = require("../models/permission.model");

const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.getAll();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPermissionById = async (req, res) => {
  const id = req.params.id;
  try {
    const permission = await Permission.getById(id);
    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPermission = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newPermission = await Permission.create(name, description);
    res.status(201).json(newPermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePermission = async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const permission = new Permission(id, name, description);
    const updatedPermission = await permission.update();
    res.json(updatedPermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePermission = async (req, res) => {
  const id = req.params.id;
  try {
    const permission = new Permission(id);
    const deletedPermission = await permission.delete();
    res.json(deletedPermission);
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
