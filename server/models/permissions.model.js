const pool = require("../config/db.config");

class Permission {
  static async getAllPermissions() {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM Permissions");
      client.release();
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createPermission(name, description) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO Permissions (name, description) VALUES ($1, $2) RETURNING *",
        [name, description]
      );
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getPermissionById(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM Permissions WHERE id = $1",
        [id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Permission not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updatePermission(id, name, description) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE Permissions SET name = $1, description = $2 WHERE id = $3 RETURNING *",
        [name, description, id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Permission not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deletePermissionById(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "DELETE FROM Permissions WHERE id = $1 RETURNING *",
        [id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Permission not found");
      }
      return {
        message: {
          message: `Permission is successfully deleted`,
          data: result.rows[0],
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Permission;
