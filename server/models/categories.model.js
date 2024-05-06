const pool = require("../config/db.config");

class Category {
  static async getAll() {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM Categories");
      client.release();
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async create(name, description) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO Categories (name, description, createdAt, updatedAt) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *",
        [name, description]
      );
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getById(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM Categories WHERE id = $1",
        [id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Category not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(id, name, description) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE Categories SET name = $1, description = $2, updatedAt = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
        [name, description, id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Category not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "DELETE FROM Categories WHERE id = $1 RETURNING *",
        [id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Category not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Category;
