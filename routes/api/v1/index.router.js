const express = require("express");
const router = express.Router();

const { authRequired } = require("@internal/middlewares-v1/auth.middleware");

//Require routers
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const avatarRouter = require("./avatar.router");
const tagCategoryRouter = require("./tagCategory.router");
const tagRouter = require('./tag.router');

//Register routes

//Public routes
router.use("/auth", authRouter);
router.use("/avatar", avatarRouter);
//router.use("/user", userRouter);

//User verification middleware
router.use(authRequired);

//User only routes
router.use("/user", userRouter);
router.use("/tagCategory", tagCategoryRouter);
router.use('/tag', tagRouter);

module.exports = router;
