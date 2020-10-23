const { check , param} = require('express-validator');

const validators = {};

validators.saveTagCategoryValidator = [
    check("name").notEmpty().withMessage("Name is required!"),
    check("abbr").notEmpty().withMessage("Name is required!"),
    check("description").notEmpty().withMessage("Description is required!")
];

validators.isMongoIdParam = [
    check("id").isMongoId().withMessage("Its not a mongo ID!")
]

validators.updateCategoryTagValidator = [
    check("id").notEmpty().withMessage("At least, ID is requiered"),
    check("id").isMongoId().withMessage("Its not a mongo ID!")
]

module.exports = validators;