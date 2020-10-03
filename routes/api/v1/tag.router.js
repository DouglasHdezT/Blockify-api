const express = require('express');
const router = express.Router();

const tagController = require("@internal/controllers-v1/tag.controller");

const { runValidation } = require('@internal/validators-v1');
const { saveTagValidator } = require("@internal/validators-v1/tag.validator");

// Routes registration
router.post('/', saveTagValidator, runValidation, tagController.saveTag);

module.exports = router;