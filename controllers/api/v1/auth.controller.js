const userService = require("@internal/services-v1/user.service");

const { createToken } = require("@internal/utils/jwt.tools");

const controller = {};

controller.register = async (req, res) => { 
    try {
        const { username, email } = req.body;
        
        const { status: userExists } = await userService.findOneByUsernameOrEmail(username, email);
        if (userExists) return res.status(409).json({ error: "User already exists" });

        const { status: userRegistered } = await userService.register(req.body);
        if (!userRegistered) return res.status(409).json({ error: "User cannot be registered" });

        return res.status(201).json({ message: "User registered" })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

controller.login = async (req, res) => { 
    try {
        const { identifier, password } = req.body;

        const { status: userExists, content: user } =
            await userService.findOneByUsernameOrEmail(identifier, identifier);
        
        if (!userExists) return res.status(404).json({ error: "User not found" });
        
        const isPassCorrect = user.comparePassword(password);
        if (!isPassCorrect) return res.status(401).json({ error: "Password incorrect" });

        const token = createToken(user._id);

        return res.status(200).json({token: token});
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = controller;