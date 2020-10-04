const express = require("express");
const router = express.Router();

const tagController = require("@internal/controllers-v1/tag.controller");

const { runValidation } = require("@internal/validators-v1");
const {
    saveTagValidator,
    findByIdValidator,
} = require("@internal/validators-v1/tag.validator");

// Routes registration
router.post("/", saveTagValidator, runValidation, tagController.saveTag);

router.get("/all", tagController.findAll);
router.get("/one/:id", findByIdValidator, runValidation, tagController.findOneById);

module.exports = router;
