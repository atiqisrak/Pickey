const express = require("express");
const router = express.Router();
const permissionRouter = require("./permissions.routes");
const userRouter = require("./users.routes");
const roleRouter = require("./roles.routes");
const categoryRouter = require("./categories.routes");
const mediaRouter = require("./medias.routes");
const blogRouter = require("./blogs.routes");

router.use("/permissions", permissionRouter);
router.use("/users", userRouter);
router.use("/roles", roleRouter);
router.use("/categories", categoryRouter);
router.use("/medias", mediaRouter);
router.use("/blogs", blogRouter);

module.exports = router;
