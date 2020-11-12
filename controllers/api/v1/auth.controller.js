const userService = require("@internal/services-v1/user.service");

const { createToken } = require("@internal/utils/jwt.tools");

const controller = {};

controller.register = async (req, res, next) => {
    try {
        const { username, email } = req.body;

        const { status: userExists } = await userService.findOneByUsernameOrEmail(username, email);
        if (userExists) return res.status(409).json({ error: "User already exists" });

        const { status: userRegistered } = await userService.register(req.body);
        if (!userRegistered) return res.status(409).json({ error: "User cannot be registered" });

        return res.status(201).json({ message: "User registered" })
    } catch (error) {
        next(error);
    }
}

controller.login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;

        //User verification
        const { status: userExists, content: user } =
            await userService.findOneByUsernameOrEmail(identifier, identifier);

        if (!userExists) return res.status(404).json({ error: "User not found" });

        //Password verification
        const isPassCorrect = user.comparePassword(password);
        if (!isPassCorrect) return res.status(401).json({ error: "Password incorrect" });

        //Token creation
        const token = createToken(user._id);

        //Token registration
        const { status: tokenInserted } = await userService.insertValidToken(user, token);
        if (!tokenInserted) return res.status(409).json({ error: "Cannot login user" });

        return res.status(200).json({
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                avatar: user.avatar,
                active: user.active,
                lessonsFav: user.lessonsFav,
                lessonTaken: user.lessonTaken,
                roles: user.roles,
                _id: user._id,
                username: user.username,
                email: user.email,
                stars: user.stars,
            },
            token: token
        });
    } catch (error) {
        next(error)
    }
}

module.exports = controller;