const Media = require("../models/medias.model");
const fs = require("fs");
const path = require("path");

const getAllMedias = async (req, res) => {
  try {
    const medias = await Media.getAll();
    res.json(medias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMediaById = async (req, res) => {
  const id = req.params.id;
  try {
    const media = await Media.getById(id);
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMedia = async (req, res) => {
  const { name, original_filename, path, mime_type, size } = req.file
    ? req.file
    : req.body;
  const { id: uploaded_by } = req.user;

  const filename = `${DATE.now()}-${original_filename}`;
  const imagePath = path.join(__dirname, `../public/images/${filename}`);

  try {
    fs.writeFileSync(imagePath, req.file.buffer);

    const newMedia = new Media.Create(
      name,
      original_filename,
      imagePath,
      mime_type,
      size,
      uploaded_by
    );

    res.status(201).json(newMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMedia = async (req, res) => {
  const id = req.params.id;
  const { name, originalname, mimetype, size } = req.file;
  const { id: uploaded_by } = req.user; // Assuming you have user authentication middleware

  // Generate unique filename
  const filename = `${Date.now()}_${originalname}`;
  const imagePath = path.join(__dirname, "../public/images", filename);

  try {
    // Move the uploaded file to the public/images folder
    fs.writeFileSync(imagePath, req.file.buffer);

    // Update media details in the database
    const updatedMedia = await Media.updateById(
      id,
      name,
      originalname,
      imagePath, // Save the updated file path
      mimetype,
      size,
      uploaded_by
    );

    res.json(updatedMedia);
  } catch (error) {
    // If an error occurs, delete the uploaded file
    fs.unlinkSync(imagePath);
    res.status(500).json({ message: error.message });
  }
};

const deleteMedia = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedMedia = await Media.deleteById(id);
    // Delete the file from the public/images folder
    fs.unlinkSync(deletedMedia.path);
    res.json(deletedMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMedias,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
};
