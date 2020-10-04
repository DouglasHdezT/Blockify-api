const { check, param } = require('express-validator');

const validators = {};

validators.saveTagValidator = [
    check("name")
        .notEmpty().withMessage("Name is required!"),
    check("html")
        .notEmpty().withMessage("HTML is required!"),
    check("description")
        .notEmpty().withMessage("Description is required!"),
    check("category")
        .notEmpty().withMessage("Category is required!"),
];

validators.findByIdValidator = [
    param("id")
        .notEmpty().withMessage("ID is required")
        .isMongoId().withMessage("ID must be mongo id")
];

validators.addAttrValidator = [
    check("tagID")
        .notEmpty().withMessage("Tag id is required!")
        .isMongoId().withMessage("Tag id must be mongo id"),
    check("name")
        .notEmpty().withMessage("Name is required!"),
    check("description")
        .notEmpty().withMessage("Description is required!"),
    check("validOptions")
        .optional()
        .isArray().withMessage("Valid Options must be an array"),
    check("validOptions.*")
        .isString().withMessage("Valid Options must be a string array only")
];

validators.updateAttrValidator = [
    check("tagID")
        .notEmpty().withMessage("Tag id is required!")
        .isMongoId().withMessage("Tag id must be mongo id"),
    check("name")
        .notEmpty().withMessage("Name is required!"),
    check("description")
        .optional()
        .notEmpty().withMessage("Description is required!"),
    check("validOptions")
        .optional()
        .isArray().withMessage("Valid Options must be an array"),
    check("validOptions.*")
        .isString().withMessage("Valid Options must be a string array only")
];

validators.removeAttrValidator = [
    check("tagID")
        .notEmpty().withMessage("Tag id is required!")
        .isMongoId().withMessage("Tag id must be mongo id"),
    check('attrName')
        .notEmpty().withMessage("Attribute name is required!")
];

module.exports = validators;