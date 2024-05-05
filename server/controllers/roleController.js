const Role = require("../models/roleModel"); // Adjust path as needed

// Similar structure to keywordController.js

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (role) {
      res.json(role);
    } else {
      res.status(404).send("Role not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const newRole = await Role.create({ name, permissions });
    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad request"); // Handle validation errors or other issues
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;
    const [updatedCount] = await Role.update(
      { name, permissions },
      { where: { id } }
    );
    if (updatedCount > 0) {
      const updatedRole = await Role.findByPk(id);
      res.json(updatedRole);
    } else {
      res.status(404).send("Role not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad request"); // Handle validation errors or other issues
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Role.destroy({ where: { id } });
    if (deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send("Role not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
