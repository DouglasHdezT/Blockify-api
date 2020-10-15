const fs = require("fs");
const path = require("path");

const controller = {};

const host = process.env.HOSTURL || "localhost:3000";

controller.findAll = async (req, res) => {
    try {
        fs.readdir(path.join(process.cwd(), "public/avatars"), (err, files) => { 
            if(err) return res.status(500).json({ error: "Internal Server Error" });
            
            const avatars = files.map(file => ({ avatar: encodeURI(`${host}/avatars/${file}`) }));
            
            return res.status(200).json(avatars);
        } );
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

controller.random = async (req, res) => { 
    fs.readdir(path.join(process.cwd(), "public/avatars"), (err, files) => { 
        if(err) return res.status(500).json({ error: "Internal Server Error" });
        
        const index = Math.floor(Math.random() * (files.length));
        
        return res.status(200).json({avatar: encodeURI(`${host}/avatars/${files[index]}`)});
    } );
}

module.exports = controller;