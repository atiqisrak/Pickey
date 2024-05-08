const Blog = require("../models/blogs.model");
const pool = require("../config/db.config");

const getAllBlogs = async (req, res) => {
  try {
    const client = await pool.connect();
    const results = await client.query(
      `
      SELECT b.*,
       c.name AS category_name,
       m.media_path AS cover_image_filepath,
       u.username AS author_username
      FROM blogs AS b
      INNER JOIN categories AS c ON b.category_id = c.id
      LEFT JOIN medias AS m ON b.cover_image_id = m.id
      INNER JOIN users AS u ON b.author_id = u.id
      ORDER BY b.id DESC
      `
    );
    client.release();
    res.json(results.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error occurred" });
  }
};

const getBlogById = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.getById(id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const slugify = (string) => {
  const a = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const b = "aaaaeeeeiiiioooouuuunc------";
  const p = new RegExp(a.split("").join("|"), "g");
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const createBlog = async (req, res) => {
  const {
    title_en,
    title_bn,
    category_id,
    cover_image_id,
    seo_title,
    seo_description,
    seo_keywords,
    content,
    author_id,
  } = req.body;
  const slug = slugify(title_en);
  try {
    const newBlog = await Blog.create(
      title_en,
      title_bn,
      slug,
      category_id,
      cover_image_id,
      seo_title,
      seo_description,
      seo_keywords,
      content,
      author_id
    );
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  const id = req.params.id;
  const {
    title_en,
    title_bn,
    slug,
    category_id,
    cover_image_id,
    seo_title,
    seo_description,
    seo_keywords,
    content,
    author_id,
  } = req.body;
  try {
    const blog = new Blog(
      id,
      title_en,
      title_bn,
      slug,
      category_id,
      cover_image_id,
      seo_title,
      seo_description,
      seo_keywords,
      content,
      author_id
    );
    const updatedBlog = await blog.update();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = new Blog(id);
    const deletedBlog = await blog.delete();
    res.json(deletedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
