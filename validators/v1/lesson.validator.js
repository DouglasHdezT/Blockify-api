const { check, param } = require("express-validator");

const validator = {};

validator.createLessonValidator = [
    check("title")
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 8 }).withMessage("Title min length is 4 chars"),
    check("description")
        .notEmpty().withMessage("Description is required"),
    check("content")
        .notEmpty().withMessage("Content is required"),
    check("private")
        .notEmpty().withMessage("Private is required")
        .isBoolean().withMessage("Private must be boolean")
];

validator.idAsParam = [
    param("id")
        .notEmpty().withMessage("Id is required")
        .isMongoId().withMessage("Id must be Mongo id")
];

validator.updateLessonValidator = [
    check("id")
        .notEmpty().withMessage("Id is required")
        .isMongoId().withMessage("Id must be Mongo id"),
    check("title")
        .optional()
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 8 }).withMessage("Title min length is 4 chars"),
    check("description")
        .optional()
        .notEmpty().withMessage("Description is required"),
    check("content")
        .optional()
        .notEmpty().withMessage("Content is required"),
    check("private")
        .optional()
        .notEmpty().withMessage("Private is required")
        .isBoolean().withMessage("Private must be boolean")
]   

validator.deleteLessonValidator = [
    check("id")
        .notEmpty().withMessage("Id is required")
        .isMongoId().withMessage("Id must be Mongo id"),
]

/**
 * Rate validators
 */

validator.addRateValidator = [
    check("lessonID")
        .notEmpty().withMessage("LessonID is required!")
        .isMongoId().withMessage("LessonID must be an Mongo ID"),
    check("rate")
        .notEmpty().withMessage("Rate is required!")
        .isFloat({ min: 0, max: 5 }).withMessage("Rate must be number and between 0 and 5"),
];

validator.deleteRateValidator = [
    check("lessonID")
        .notEmpty().withMessage("LessonID is required!")
        .isMongoId().withMessage("LessonID must be an Mongo ID"),
];

module.exports = validator;