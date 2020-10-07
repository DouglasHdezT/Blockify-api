const express = require("express");
const router = express.Router();

//Require routers
const userRouter = require("./user.router");
const avatarRouter = require("./avatar.router");
const tagCategoryRouter = require("./tagCategory.router");
const tagRouter = require('./tag.router');

//Register routes
router.use("/user", userRouter);
router.use("/avatar", avatarRouter);
router.use("/tagCategory", tagCategoryRouter);
router.use('/tag', tagRouter);

module.exports = router;