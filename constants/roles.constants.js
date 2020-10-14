const constants = {};

constants.DEFAULT = process.env.DEFAULT_ROLE || "default";
constants.ADMIN = process.env.ADMIN_ROLE || "admin";

module.exports = constants;