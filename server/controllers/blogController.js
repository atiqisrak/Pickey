const Blog = require("../models/blogModel"); // Import blog model
const User = require("../models/userModel"); // Import user model (optional)
const Category = require("../models/categoryModel"); // Import category model (optional)

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        // Include User model for author details (optional)
        { model: User, as: "author" },
        // Include Category model for category details (optional)
        { model: Category, as: "category" },
      ],
      // Add any filters, sorting, or pagination options here
    });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id, {
      include: [
        // Include User model for author details (optional)
        { model: User, as: "author" },
        // Include Category model for category details (optional)
        { model: Category, as: "category" },
      ],
    });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.createBlog = async (req, res) => {
  try {
    const {
      title_en,
      title_bn,
      slug,
      category_id,
      cover_image,
      seo_title,
      seo_description,
      seo_keywords,
      content,
      author_id,
    } = req.body;
    const newBlog = await Blog.create({
      title_en,
      title_bn,
      slug,
      category_id,
      cover_image,
      seo_title,
      seo_description,
      seo_keywords,
      content,
      author_id, // Assuming user is authenticated and author_id is set
    });
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad request"); // Handle validation errors or other issues
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title_en,
      title_bn,
      slug,
      category_id,
      cover_image,
      seo_title,
      seo_description,
      seo_keywords,
      content,
    } = req.body;
    const [updatedCount] = await Blog.update(
      {
        title_en,
        title_bn,
        slug,
        category_id,
        cover_image,
        seo_title,
        seo_description,
        seo_keywords,
        content,
      },
      {
        where: { id },
      }
    );
    if (updatedCount > 0) {
      const updatedBlog = await Blog.findByPk(id);
      res.json(updatedBlog);
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad request"); // Handle validation errors or other issues
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Blog.destroy({
      where: { id },
    });
    if (deletedCount > 0) {
      res.status(204).send(); // No content to return on successful deletion
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
