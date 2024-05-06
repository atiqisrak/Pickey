const pool = require("../config/db.config");

class Blog {
  static async getAll() {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM Blogs");
      client.release();
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async create(
    title_en,
    title_bn,
    slug,
    category_id,
    cover_image_id,
    seo_title,
    seo_description,
    seo_keywords,
    content_en,
    author_id
  ) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO Blogs (title_en, title_bn, slug, category_id,cover_image_id,seo_title,seo_description,seo_keywords, content_en,author_id,createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *",
        [
          title_en,
          title_bn,
          slug,
          category_id,
          cover_image_id,
          seo_title,
          seo_description,
          seo_keywords,
          content_en,
          author_id,
        ]
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
      const result = await client.query("SELECT * FROM Blogs WHERE id = $1", [
        id,
      ]);
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Blog not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(
    id,
    title_en,
    title_bn,
    slug,
    category_id,
    cover_image_id,
    seo_title,
    seo_description,
    seo_keywords,
    content_en,
    author_id
  ) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE Blogs SET title_en = $1, title_bn = $2, slug = $3, category_id = $4, cover_image_id = $5, seo_title = $6, seo_description = $7, seo_keywords = $8, content_en = $9, author_id = $10, updatedAt = CURRENT_TIMESTAMP WHERE id = $11 RETURNING *",
        [
          title_en,
          title_bn,
          slug,
          category_id,
          cover_image_id,
          seo_title,
          seo_description,
          seo_keywords,
          content_en,
          author_id,
          id,
        ]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Blog not found");
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
        "DELETE FROM Blogs WHERE id = $1 RETURNING *",
        [id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Blog not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Blog;
