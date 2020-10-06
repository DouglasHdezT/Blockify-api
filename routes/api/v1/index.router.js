const express = require("express");
const router = express.Router();

//Require routers
const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const tagRouter = require('./tag.router');
const avatarRouter = require("./avatar.router");

//Register routes
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/avatar", avatarRouter);
router.use('/tag', tagRouter);

module.exports = router;
