const express = require("express");
const router = express.Router();

//Require routers
const userRouter = require("./user.router");
const tagRouter = require("./tag.router");
const authRouter = require("./auth.router");

//Register routes
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/tag", tagRouter);

module.exports = router;
