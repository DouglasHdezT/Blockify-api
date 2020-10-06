const express = require('express');
const router = express.Router();

const avatarController = require("@internal/controllers-v1/avatar.controller");

router.get("/all", avatarController.findAll);
router.get("/random", avatarController.random);

module.exports = router;