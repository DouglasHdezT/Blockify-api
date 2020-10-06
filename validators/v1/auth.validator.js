const { check } = require("express-validator");

const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})";
const urlRegex = "^(https?|chrome):\/\/[^\s$.?#].[^\s]*$";

const validator = {};

validator.registerValidator = [
    check("firstname")
        .notEmpty().withMessage("Firstname is required"),
    check("lastname")
        .notEmpty().withMessage("Lastname is required"),
    check("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 4 }).withMessage("Username minimun length is 4"),
    check("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email incorrect format")
        .normalizeEmail(),
    check("avatar")
        .notEmpty().withMessage("Avatar is required"),
    check("password")
        .notEmpty().withMessage("Password is required")
        .matches(new RegExp(passwordRegex)).withMessage("Password must contain at least 1 uppercase, 1 lowercase and 1 number")
        .isLength({ min: 8, max: 32 }).withMessage("Pasword length must be between 8 and 32 characters")
]

validator.loginValidator = [
    check("password")
        .notEmpty().withMessage("Password is required"),
    check("identifier")
        .notEmpty().withMessage("Identifier is required")
];

module.exports = validator;