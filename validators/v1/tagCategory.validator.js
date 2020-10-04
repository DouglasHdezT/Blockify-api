const { check } = require('express-validator');

const validators = {};

validators.saveTagCategoryValidator = [
    check("name").notEmpty().withMessage("Name is required!"),
    check("description").notEmpty().withMessage("Description is required!"),
];

module.exports = validators;