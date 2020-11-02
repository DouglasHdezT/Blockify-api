const { check } = require("express-validator");

const validator = {};

validator.createLessonValidator = [
    check("title")
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 8 }).withMessage("Title min length is 4 chars"),
    check("content")
        .notEmpty().withMessage("Content is required"),
    check("private")
        .notEmpty().withMessage("Private is required")
        .isBoolean().withMessage("Private must be boolean")
];

module.exports = validator;