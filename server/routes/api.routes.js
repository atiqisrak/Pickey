const express = require("express");
const router = express.Router();
const permissionRouter = require("./permissions.routes");
const userRouter = require("./users.routes");
const roleRouter = require("./roles.routes");

router.use("/permissions", permissionRouter);
router.use("/users", userRouter);
router.use("/roles", roleRouter);

module.exports = router;
