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

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

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

/*
id SERIAL PRIMARY KEY,
    media_name VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    media_path VARCHAR(255) NOT NULL,
    mime_type VARCHAR(255) NOT NULL,
    size INTEGER NOT NULL,
    uploaded_by INTEGER REFERENCES Users(id) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
*/

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

const deleteMedia = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedMedia = await Media.deleteById(id);
    // Delete the file from the public/images folder
    fs.unlinkSync(deletedMedia.media_path);
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
