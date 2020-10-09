const User = require("@internal/models/User"); 
const ServiceResponse = require("@internal/classes/ServiceResponse");
const { verifyToken } = require('@internal/utils/jwt.tools');

const service = {};

service.findOneByUsernameOrEmail = async (username, email) => { 
    try {
        const user = await User.findOne({
            $or: [{ username: username }, { email: email }]
        });

        if (!user) return new ServiceResponse(false, { error: "User not found" });

        return new ServiceResponse(true, user);
    } catch (error) {
        throw error;
    }
}

service.register = async ({ username, email, password, firstname, lastname, avatar }) => { 
    try {
        const user = new User({
            username,
            email,
            password,
            firstname,
            lastname, 
            avatar
        });

        const userSaved = await user.save();
        if (!userSaved) return new ServiceResponse(false, { error: "User not created" });

        return new ServiceResponse(true, { message: "User registered" });
    } catch (error) {
        throw error;
    }
}

service.insertValidToken = async (user, token) => { 
    try {
        //Cleaning uptime tokens
        user.validTokens = user.validTokens.filter(token => verifyToken(token));

        user.validTokens.push(token);

        const userSaved = await user.save();
        if (!userSaved) return new ServiceResponse(false, { error: "Token not inserted" });

        return new ServiceResponse(true, { message: "Token inserted" });
    } catch (error) {
        throw error;
    }
};

/**
 * Middleware verification methods
 */

service.findOneById = async (id) => { 
    try {
        const user = await User.findById(id)
            .select("-hashedPassword -validTokens -salt");
        
        if (!user) return new ServiceResponse(false, { error: "User not found" });

        return new ServiceResponse(true, user);
    } catch (error) {
        throw error;
    }
}

service.verifyTokenByID = async (id, token) => { 
    try {
        const user = await User.findById(id);
        
        if (!user) return new ServiceResponse(false, { error: "Cannot verify token" });
        
        const index = user.validTokens.findIndex(validToken => validToken === token);
        if (index < 0) return new ServiceResponse(false, { error: "Token not registered" });

        return new ServiceResponse(true, { message: "Valid token" });
    } catch (error) {
        
    }
}

module.exports = service;