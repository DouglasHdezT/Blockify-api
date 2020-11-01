const express = require("express");
const router = express.Router();

const userController = require("@internal/controllers-v1/tagCategory.controller");

const { ROLES } = require('@internal/constants');
const { roleValidatorHelper } = require('@internal/middlewares-v1/auth.middleware');

const { runValidation } = require('@internal/validators-v1');
const { saveTagCategoryValidator, isMongoIdParam, updateCategoryTagValidator } = require("@internal/validators-v1/tagCategory.validator");


//Read
router.get("/all", userController.findAll);
router.get("/byName/:name",userController.findByName);
router.get("/one/:id", isMongoIdParam, runValidation, userController.findById);

//Only for admins
router.use(roleValidatorHelper(ROLES.ADMIN));

//Create
router.post('/', saveTagCategoryValidator, runValidation, userController.saveTagCategory);

//Update
router.put("/", updateCategoryTagValidator, runValidation,userController.update);

//Delete
router.delete("/:id", isMongoIdParam, runValidation, userController.delete);

module.exports = router;