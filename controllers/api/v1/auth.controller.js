const userService = require("@internal/services-v1/user.service");

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
        
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = controller;