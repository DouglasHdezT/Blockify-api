const express = require("express");
const router = express.Router();

//Require routers
const userRouter = require("./user.router");

//Register routes
router.use("/user", userRouter);

module.exports = router;