const pool = require("../config/db.config");

class Media {
  static async getAll() {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM medias");
      client.release();
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /* 
   id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    mime_type VARCHAR(255) NOT NULL,
    size INTEGER NOT NULL,
    uploaded_by INTEGER REFERENCES Users(id) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  */
  static async create(
    media_name,
    original_filename,
    media_path,
    mime_type,
    size
  ) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO medias (media_name, original_filename, media_path, mime_type, size) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [media_name, original_filename, media_path, mime_type, size]
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
      const result = await client.query("SELECT * FROM medias WHERE id = $1", [
        id,
      ]);
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Media not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateById(
    id,
    name,
    original_filename,
    path,
    mime_type,
    size,
    uploaded_by
  ) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE medias SET name = $1, original_filename = $2, path = $3, mime_type = $4, size = $5, uploaded_by = $6, updatedAt = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *",
        [name, original_filename, path, mime_type, size, uploaded_by, id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Media not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteById(id) {
    try {
      const client = await pool.connect();
      const result = await client.query("DELETE FROM medias WHERE id = $1", [
        id,
      ]);
      client.release();
      if (result.rowCount === 0) {
        throw new Error("Media not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Media;
