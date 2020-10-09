const { validationResult } = require('express-validator');
const debug = require('debug')('validator');

const validators = {};

validators.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    debug(errors);
    return res
      .status(422)
      .json({ error: errors.array().map((item) => item.msg) });
  }
  next();
};

module.exports = validators;