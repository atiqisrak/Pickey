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
    media_name,
    original_filename,
    media_path,
    mime_type,
    size
  ) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE medias SET media_name = $1, original_filename = $2, media_path = $3, mime_type = $4, size = $5 WHERE id = $6 RETURNING *",
        [media_name, original_filename, media_path, mime_type, size, id]
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
