const express = require("express");
const router = express.Router();

const authController = require("@internal/controllers-v1/auth.controller");
const { runValidation } = require("@internal/validators-v1");
const { registerValidator, loginValidator } = require("@internal/validators-v1/auth.validator");

router.post("/signup", registerValidator, runValidation, authController.register);
router.post("/signin", loginValidator, runValidation, authController.login);

module.exports = router;