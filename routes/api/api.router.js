const express = require("express");
const router = express.Router();

const v1Router = require("@internal/routes-v1");

router.use("/v1", v1Router);

module.exports = router;