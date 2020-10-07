const { verifyToken } = require("@internal/utils/jwt.tools");
const { verifyMongoID } = require("@internal/utils/mongo.tools");

const userService = require("@internal/services-v1/user.service");

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

        //token strong validation
        const tokenObject = verifyToken(token);
        if (!tokenObject) return res.status(403).json({ error: "Invalid token" });

        const { _id: userID } = tokenObject;

        //Id validation
        if (!verifyMongoID(userID)) return res.status(403).json({ error: "Invalid token" });

        //User existence
        const { status: userExist, content: user } = await userService.findOneById(userID);
        if (!userExist) return res.status(403).json({ error: "Any user match" });

        //TOken in ValidTokens
        const { status: isValidToken } = await userService.verifyTokenByID(userID, token);
        if (!isValidToken) return res.status(403).json({ error: "Token not registered" });
        
        //User doc asignation
        req.user = user;
        
        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = middleware;