const User = require("@internal/models/User");
const ServiceResponse = require("@internal/classes/ServiceResponse");
const { verifyToken } = require('@internal/utils/jwt.tools');
const { sanitizeObject } = require("@internal/utils/objects.tools");

const { ROLES } = require("@internal/constants");

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

service.register = async ({ username, email, password, firstname, lastname, avatar }, isAdmin=false) => {
    try {
        const user = new User({
            username,
            email,
            password,
            firstname,
            lastname,
            avatar
        });

        if (isAdmin) { 
            user.roles = [ROLES.DEFAULT, ROLES.ADMIN];
        }

        const userSaved = await user.save();
        if (!userSaved) return new ServiceResponse(false, { error: "User not created" });

        return new ServiceResponse(true, { message: "User registered" });
    } catch (error) {
        throw error;
    }
}

service.update = async (id, fieldsToUpdate) => { // los nombres, el username y el correo
    try {
        //Clean up undefined fields 
        const sanitizedObject = sanitizeObject(fieldsToUpdate);

        const userUpdated = await User.findByIdAndUpdate(id, { ...sanitizedObject });
        if (!userUpdated) return new ServiceResponse(false, { error: "User didn't update" });

        return new ServiceResponse(true, userUpdated);
    } catch (error) {
        throw error;
    }
}

service.deleteOne = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return new ServiceResponse(false, { error: "User didn't delete" });

        return new ServiceResponse(true, deletedUser);
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

/**
 * Stars Methods
 */

service.addStar = async (user, userID, rate) => { 
    try {
        const userUpdated = await User.findByIdAndUpdate(user._id, {
            $push: {
                stars: {
                    userID,
                    rate
                }
            }
        });

        if (!userUpdated) return new ServiceResponse(false, { error: "Cannot push rate" });

        return new ServiceResponse(true, { message: "Rate added" });

    } catch (error) {
        throw error;
    }
}

service.deleteStar = async (user, userID) => { 
    try {
        const stars = user.get("stars", null, { getters: false });
        const indexOf = stars.findIndex(star => star.userID.equals(userID));

        stars.splice(indexOf, 1);

        const userUpdated = await user.save();

        if (!userUpdated) return new ServiceResponse(false, { error: "Cannot delete Star" });

        return new ServiceResponse(true, { message: "Rate deleted" });
    } catch (error) {
        throw error;
    }
}

service.updateStar = async (user, userID, rate) => { 
    try {
        const stars = user.get("stars", null, { getters: false });
        const indexOf = stars.findIndex(star => star.userID.equals(userID));

        stars[indexOf].rate = rate;

        const userUpdated = await user.save();

        if (!userUpdated) return new ServiceResponse(false, { error: "Cannot update Star" });

        return new ServiceResponse(true, { message: "Rate updated" });
    } catch (error) {
        throw error;
    }
}

/**
 * Comments methods
 */

service.addComment = async (user, comment) => {
    try{
        user.comments = [...user.comments, comment._id];
        const userSaved = await user.save();

        if (!userSaved) return new ServiceResponse(false, { error: "Cannot add comment" });
        return new ServiceResponse(true, { message: "Comment added" });
    } catch (error) {
        throw error;
    }
}

service.removeComment = async (user, comment) => {
    try{
        user.comments = user.comments.filter(commentA => !commentA._id.equals(comment._id));
        const userSaved = await user.save();

        if (!userSaved) return new ServiceResponse(false, { error: "Cannot remove comment" });
        return new ServiceResponse(true, { message: "Comment deleted" });
    } catch (error) {   
        throw error;
    }
}
module.exports = service;