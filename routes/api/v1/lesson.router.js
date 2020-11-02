const express = require("express");
const router = express.Router();

const lessonController = require("@internal/controllers-v1/lesson.controller");

const {
    createLessonValidator
} = require("@internal/validators-v1/lesson.validator");
const { runValidation } = require("@internal/validators-v1");

//Routes
router.get("/all", lessonController.findAll);

router.post("/", createLessonValidator, runValidation, lessonController.create);

module.exports = router;