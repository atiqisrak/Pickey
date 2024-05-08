const pool = require("../config/db.config");

class RolePermission {
  static async getAllRolePermissions() {
    try {
      const client = await pool.connect();
      const result = await client.query(
        `
        SELECT rp.*,
         r.name AS role_name,
         p.name AS permission_name
        FROM RolePermissions AS rp
        INNER JOIN roles AS r ON rp.role_id = r.id
        INNER JOIN permissions AS p ON rp.permission_id = p.id
        ORDER BY rp.id DESC
        `
      );
      client.release();
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getRolePermissionsById(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        `
        SELECT rp.*,
            r.name AS role_name,
            p.name AS permissions
        FROM RolePermissions AS rp
        INNER JOIN roles AS r ON rp.role_id = r.id
        INNER JOIN permissions AS p ON rp.permission_id = p.id
        WHERE rp.id = $1
        `,
        [id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("RolePermission not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createRolePermissions(role_id, permission_id) {
    try {
      const client = await pool.connect();
      const role = await client.query("SELECT * FROM roles WHERE id = $1", [
        role_id,
      ]);
      if (role.rows.length === 0) {
        throw new Error("Role not found");
      }

      const permission = await client.query(
        "SELECT * FROM permissions WHERE id = $1",
        [permission_id]
      );
      if (permission.rows.length === 0) {
        throw new Error("Permission not found");
      }

      const result = await client.query(
        "INSERT INTO RolePermissions (role_id, permission_id, createdAt, updatedAt) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *",
        [role_id, permission_id]
      );
      client.release();
      return {
        message: {
          message: "RolePermission created successfully",
          data: {
            ...result.rows[0],
            role_name: role.rows[0].name,
            permission_name: permission.rows[0].name,
          },
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateRolePermissions(id, role_id, permission_id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE RolePermissions SET role_id = $1, permission_id = $2, updatedAt = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
        [role_id, permission_id, id]
      );
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteRolePermission(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "DELETE FROM RolePermissions WHERE id = $1 RETURNING *",
        [id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("RolePermission not found");
      }
      return {
        message: {
          message: "RolePermission deleted successfully",
          data: result.rows[0],
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getByRoleId(role_id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        `
        SELECT rp.*,
            r.name AS role_name,
            p.name AS permission_name
        FROM RolePermissions AS rp
        INNER JOIN roles AS r ON rp.role_id = r.id
        INNER JOIN permissions AS p ON rp.permission_id = p.id
        WHERE rp.role_id = $1
        `,
        [role_id]
      );
      client.release();
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getByPermissionId(permission_id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        `
        SELECT rp.*,
            r.name AS role_name,
            p.name AS permission_name
        FROM RolePermissions AS rp
        INNER JOIN roles AS r ON rp.role_id = r.id
        INNER JOIN permissions AS p ON rp.permission_id = p.id
        WHERE rp.permission_id = $1
        `,
        [permission_id]
      );
      client.release();
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = RolePermission;
