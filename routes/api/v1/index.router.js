const express = require("express");
const router = express.Router();

//Require routers
const userRouter = require("./user.router");
const tagCategoryRouter = require("./tagCategory.router");

//Register routes
router.use("/user", userRouter);
router.use("/tagCategory", tagCategoryRouter);

module.exports = router;