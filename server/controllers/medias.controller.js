const express = require("express");
const app = express();
const Media = require("../models/medias.model");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("media");

const createMedia = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    try {
      const media = await Media.create(
        req.body.media_name,
        req.file.originalname,
        req.file.path,
        req.file.mimetype,
        req.file.size
      );
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

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

const updateMedia = async (req, res) => {
  const id = req.params.id;

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const updatedMedia = await Media.updateById(
      id,
      req.body.media_name,
      req.file.originalname,
      req.file.media_path,
      req.file.mimetype,
      req.file.size
    );

    res.json(updatedMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const detachMedia = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      // return res.status(500).json({ message: err.message });
      res.status(500).json({ message: err.message });
      return res.json("File could not be deleted");
    } else {
      res.json("File was deleted");
    }
  });
};

const deleteMedia = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedMedia = await Media.deleteById(id);
    if (!deletedMedia || !deletedMedia.media_path) {
      return res.status(404).json({ message: "Media deleted" });
    }
    const filePath = path.join(__dirname, "..", deletedMedia.media_path);
    res.json("Deleting file: ", deletedMedia);

    detachMedia(filePath);

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
