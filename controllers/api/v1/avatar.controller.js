const fs = require("fs/promises");
const path = require("path");

const controller = {};

const host = process.env.HOST || "localhost:3000";

controller.findAll = async (req, res) => {
    try {
        const files = await fs.readdir(path.join(process.cwd(), "public/avatars"));

        const avatars = files.map(file => `${host}/avatars/${file}`);

        return res.status(200).json(avatars);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = controller;