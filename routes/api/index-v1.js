const express = require("express");
const router = express.Router();

//Require routers
const userRouter = require("./v1/user");

//Register routes
router.use("/user", userRouter);

module.exports = router;