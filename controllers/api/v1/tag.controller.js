const TagService = require("@internal/services-v1/tag.service");

const controller = {};

controller.saveTag = async (req, res, next) => {
    try {
        const { name, html, description, category } = req.body;

        const { status: tagExist } = await TagService.findOneByHTML(html);
        if (tagExist) {
            return res.status(409).json({ error: "Tag already exists!" });
        }

        const { status: tagCreated } = await TagService.create(name, html, description, category);
        if (!tagCreated) { 
            return res.status(409).json({ error: "Tag not created!" });
        }

        return res.status(201).json({ message: "Post created!" });
    } catch (error) {
        return res.status(500).json({error: "Internal Server Error"});
    }
};

module.exports = controller;
