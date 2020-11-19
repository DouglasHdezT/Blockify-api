const { check, param } = require("express-validator");

const validator = {};

validator.addRateValidator = [
    check("userID")
        .notEmpty().withMessage("UserID is required!")
        .isMongoId().withMessage("userID must be an Mongo ID"),
    check("rate")
        .notEmpty().withMessage("Rate is required!")
        .isFloat({ min: 0, max: 5 }).withMessage("Rate must be number and between 0 and 5"),
];

validator.deleteRateValidator = [
    check("userID")
        .notEmpty().withMessage("UserID is required!")
        .isMongoId().withMessage("userID must be an Mongo ID"),
];

validator.idInParamsValidator = [
    param("id")
        .notEmpty().withMessage("UserID is required!")
        .isMongoId().withMessage("userID must be an Mongo ID"),
];

validator.addCommentValidator = [
    check("userID")
        .notEmpty().withMessage("UserID is required!")
        .isMongoId().withMessage("userID must be an Mongo ID"),
    check("title")
        .notEmpty().withMessage("Title is required!"),
    check("message")
        .notEmpty().withMessage("Message is required!")
]

validator.removeCommentValidator = [
    check("userID")
        .notEmpty().withMessage("UserID is required!")
        .isMongoId().withMessage("userID must be an Mongo ID"),
    check("commentID")
        .notEmpty().withMessage("UserID is required!")
        .isMongoId().withMessage("userID must be an Mongo ID"),
]

module.exports = validator;