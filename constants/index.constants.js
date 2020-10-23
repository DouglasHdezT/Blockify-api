const rolesCtns = require("./roles.constants");
const TCCtns = require("./tagCategories.constants");

const constants = {};

constants.ROLES = { ...rolesCtns };
constants.TC = { ...TCCtns };

module.exports = constants;