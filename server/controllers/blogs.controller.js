const Blog = require("../models/blogs.model");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.getAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

const createBlog = async (req, res) => {
  const {
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
  } = req.body;
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
      content_en,
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
    content_en,
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
      content_en,
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
