// models/permission.model.js
const pool = require("../config/db.config");

class Permission {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
  static async getAll() {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM Permissions");
      client.release();
      return result.rows.map(
        ({ id, name, description, createdAt, updatedAt }) =>
          new Permission(id, name, description, createdAt, updatedAt)
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async create(name, description) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO Permissions (name, description, createdAt, updatedAt) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *",
        [name, description]
      );
      client.release();
      const {
        id,
        name: createdName,
        description: createdDescription,
        createdAt,
        updatedAt,
      } = result.rows[0];
      return new Permission(
        id,
        createdName,
        createdDescription,
        createdAt,
        updatedAt
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getById(id) {
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
      const { name, description } = result.rows[0];
      return new Permission(id, name, description);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update() {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE Permissions SET name = $1, description = $2, updatedAt = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
        [this.name, this.description, this.id]
      );
      client.release();
      const { name, description, updatedAt } = result.rows[0];
      return new Permission(this.id, name, description, updatedAt);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete() {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "DELETE FROM Permissions WHERE id = $1 RETURNING *",
        [this.id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Permission not found");
      }
      const { name, description } = result.rows[0];
      return new Permission(this.id, name, description);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Permission;
