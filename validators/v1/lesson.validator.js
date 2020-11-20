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
        .optional()
        .notEmpty().withMessage("Private is required")
        .isBoolean().withMessage("Private must be boolean"),
    check("difficulty")
        .optional()
        .notEmpty().withMessage("Difficulty is required")
        .isIn([0, 1, 2]).withMessage("Difficulty must be 0, 1, 2"),
    check("learningPath")
        .optional()
        .notEmpty().withMessage("Learning path is required")
        .isArray().withMessage("Learning path must be an array")
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
    check("indications")
        .optional()
        .notEmpty().withMessage("Indications is required"),
    check("private")
        .optional()
        .notEmpty().withMessage("Private is required")
        .isBoolean().withMessage("Private must be boolean"),
    check("difficulty")
        .optional()
        .notEmpty().withMessage("Difficulty is required")
        .isIn([0, 1, 2]).withMessage("Difficulty must be 0, 1, 2"),
    check("learningPath")
        .optional()
        .notEmpty().withMessage("Learning path is required")
        .isArray().withMessage("Learning path must be an array")
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

validator.addCommentValidator = [
    check("lessonID")
        .notEmpty().withMessage("LessonID is required!")
        .isMongoId().withMessage("LessonID must be an Mongo ID"),
    check("title")
        .notEmpty().withMessage("Title is required!"),
    check("message")
        .notEmpty().withMessage("Message is required!")
]

validator.removeCommentValidator = [
    check("lessonID")
        .notEmpty().withMessage("LessonID is required!")
        .isMongoId().withMessage("lessonID must be an Mongo ID"),
    check("commentID")
        .notEmpty().withMessage("CommentID is required!")
        .isMongoId().withMessage("CommentID must be an Mongo ID"),
]

module.exports = validator;