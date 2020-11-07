const middleware = {};
const debug = require("debug")("app:error");

/**
 * @type {import("express").ErrorRequestHandler}
 */
middleware.errorHandler = (error, req, res, next) => { 
    debug(error);
    return res.status(500).json({ error: "Internal server error" });
}

module.exports = middleware;