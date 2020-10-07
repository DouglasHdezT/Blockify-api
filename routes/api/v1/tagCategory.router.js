const express = require("express");
const router = express.Router();

const userController = require("@internal/controllers-v1/tagCategory.controller");
const { runValidation } = require('@internal/validators-v1');
const { saveTagCategoryValidator, isMongoIdParam, updateCategoryTagValidator } = require("@internal/validators-v1/tagCategory.validator");

//Create
router.post('/', saveTagCategoryValidator, runValidation, userController.saveTagCategory);

//Read
router.get("/", userController.findAll);
router.get("/byName/:name",userController.findByName);
router.get("/:id",isMongoIdParam,runValidation,userController.findById);

//Update
router.put("/", updateCategoryTagValidator, runValidation,userController.update);

//Delete
router.delete("/:id", isMongoIdParam, runValidation, userController.delete);

module.exports = router;