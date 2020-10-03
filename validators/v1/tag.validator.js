const { check } = require('express-validator');

const validators = {};

validators.createTagValodator = [
    check("name").notEmpty().withMessage("Name is required!"),
    check("html").notEmpty().withMessage("HTML is required!"),
    check("description").notEmpty().withMessage("Description is required!"),
    check("category").notEmpty().withMessage("Category is required!"),
];

module.exports = validators;