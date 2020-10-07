const mongoose = require("mongoose");

const tools = {};

tools.verifyMongoID = (id) => { 
    if (!id) return false;
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = tools;