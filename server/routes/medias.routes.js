const express = require("express");
const router = express.Router();
const mediasController = require("../controllers/medias.controller");

// Middleware for authorization

// Get all medias
router.get("/", mediasController.getAllMedias);

// Get a single media
router.get("/:id", mediasController.getMediaById);

// Create a new media
router.post("/", mediasController.createMedia);

// Update a media
router.put("/:id", mediasController.updateMedia);

// Delete a media
router.delete("/:id", mediasController.deleteMedia);

module.exports = router;
