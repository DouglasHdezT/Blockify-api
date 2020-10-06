const express = require("express");
const router = express.Router();

const authController = require("@internal/controllers-v1/auth.controller");
const { runValidation } = require("@internal/validators-v1");
const { registerValidator } = require("@internal/validators-v1/auth.validator");

router.post("/signin", registerValidator, runValidation, authController.register);

module.exports = router;