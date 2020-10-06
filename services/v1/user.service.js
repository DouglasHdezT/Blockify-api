const User = require("@internal/models/User"); 
const ServiceResponse = require("@internal/classes/ServiceResponse");

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

module.exports = service;