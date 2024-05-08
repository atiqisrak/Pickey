const Category = require("../models/categories.model");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.getById(id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = await Category.create(name, description);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const category = new Category(id, name, description);
    const updatedCategory = await category.update();
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCategory = await Category.delete(id);
    res.json(deletedCategory.message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
