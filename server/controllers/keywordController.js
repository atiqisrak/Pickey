const Keyword = require("../models/keywordModel");

exports.getAllKeywords = async (req, res) => {
  try {
    const keywords = await Keyword.findAll();
    res.json(keywords);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getKeywordById = async (req, res) => {
  try {
    const { id } = req.params;
    const keyword = await Keyword.findByPk(id);
    if (keyword) {
      res.json(keyword);
    } else {
      res.status(404).send("Keyword not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.createKeyword = async (req, res) => {
  try {
    const { name } = req.body;
    const newKeyword = await Keyword.create({ name });
    res.status(201).json(newKeyword);
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad request"); // Handle validation errors or other issues
  }
};

exports.updateKeyword = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [updatedCount] = await Keyword.update({ name }, { where: { id } });
    if (updatedCount > 0) {
      const updatedKeyword = await Keyword.findByPk(id);
      res.json(updatedKeyword);
    } else {
      res.status(404).send("Keyword not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad request"); // Handle validation errors or other issues
  }
};

exports.deleteKeyword = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Keyword.destroy({ where: { id } });
    if (deletedCount > 0) {
      res.status(204).send(); // No content to return on successful deletion
    } else {
      res.status(404).send("Keyword not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
