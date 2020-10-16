const express = require("express");
const router = express.Router();

const userController = require("@internal/controllers-v1/user.controller");

//Update
router.put('/', userController.update);

//Delete
router.delete('/', userController.delete);

module.exports = router;