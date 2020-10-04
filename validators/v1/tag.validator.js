const { check, param } = require('express-validator');

const validators = {};

validators.saveTagValidator = [
    check("name").notEmpty().withMessage("Name is required!"),
    check("html").notEmpty().withMessage("HTML is required!"),
    check("description").notEmpty().withMessage("Description is required!"),
    check("category").notEmpty().withMessage("Category is required!"),
];

validators.findByIdValidator = [
    param("id")
        .notEmpty().withMessage("ID is required")
        .isMongoId().withMessage("ID must be mongo id")
]

module.exports = validators;