const { verifyToken } = require("@internal/utils/jwt.tools");
const userService = require("@internal/services-v1");

const middleware = {};

const tokenPrefix = process.env.TOKENPREFIX || "Bearer";

/**
 * @type import("express").RequestHandler
 */
middleware.authRequired = async (req, res, next) => { 
    try {
        const { authorization } = req.headers;

        //Authorization verification
        if (!authorization) { 
            return res.status(400).json({ error: "Authorization is required" });
        }

        //Fields spliting
        const [prefix, token] = authorization.split(" ");

        //Prefix verification
        if (prefix !== tokenPrefix) { 
            return res.status(400).json({ error: "Invalid token prefix" });
        }

        //Token exist validation
        if (!token) { 
            return res.status(400).json({ error: "Token is needed" });
        }



    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = middleware;