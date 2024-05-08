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

// const createRolePermissions = async (req, res) => {
//   const { role_id, permission_id } = req.body;
//   try {
//     const newRolePermission = await RolePermission.createRolePermissions(
//       role_id,
//       permission_id
//     );
//     res.status(201).json(newRolePermission);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const createRolePermissions = async (req, res) => {
  const { role_id, permission_id } = req.body; // Modify to handle array
  try {
    // Check if the role-permission relationship already exists
    const existingRolePermission =
      await RolePermission.getByRoleIdAndPermissionId(role_id, permission_id);
    if (existingRolePermission.length > 0) {
      return res
        .status(400)
        .json({ message: "Role already has these permissions." });
    }

    // Validate permission IDs
    const validPermissionIds = await RolePermission.validatePermissionIds();
    if (!validPermissionIds.includes(permission_id)) {
      return res.status(400).json({ message: "Invalid permission ID" });
    }

    const newRolePermission = await RolePermission.createRolePermissions(
      role_id,
      permission_id // Pass the array of permission IDs
    );
    res.status(201).json(newRolePermission.message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRolePermissions = async (req, res) => {
  const id = req.params.id;
  const { role_id, permission_id } = req.body;
  try {
    //  Check if the role-permission relationship already exists
    const existingRolePermission =
      await RolePermission.getByRoleIdAndPermissionId(role_id, permission_id);
    if (existingRolePermission.length > 0) {
      return res
        .status(400)
        .json({ message: "Role-Permission relationship already exists" });
    }

    // Validate permission IDs
    const validPermissionIds = await RolePermission.validatePermissionIds();
    if (!validPermissionIds.includes(permission_id)) {
      return res.status(400).json({ message: "Invalid permission ID" });
    }

    const updatedRolePermission = await RolePermission.update(
      id,
      role_id,
      permission_id
    );
    res.json(updatedRolePermission.message);
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
