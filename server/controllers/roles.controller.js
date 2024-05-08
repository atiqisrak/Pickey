const Role = require("../models/roles.model");

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.getAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRoleById = async (req, res) => {
  const id = req.params.id;
  try {
    const role = await Role.getById(id);
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRole = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newRole = await Role.create(name, description);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const updatedRole = await Role.update(id, name, description);
    res.json(updatedRole.message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRole = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedRole = await Role.deleteRoleById(id);
    res.json(deletedRole.message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
