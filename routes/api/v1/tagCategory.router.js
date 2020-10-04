const express = require("express");
const router = express.Router();

const userController = require("@internal/controllers-v1/tagCategory.controller");
const { runValidation } = require('@internal/validators-v1');
const { saveTagCategoryValidator } = require("@internal/validators-v1/tagCategory.validator");

// Routes registration
router.post('/', saveTagCategoryValidator, runValidation, userController.saveTagCategory);

module.exports = router;