const tagService = require("@internal/services-v1/tag.service");

const controller = {};

controller.findAll = async (req, res) => {
    try {
        const { content: tags } = await tagService.findAll();

        return res.status(200).json(tags);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

controller.findOneById = async (req, res) => {
    try {
        const { id } = req.params;

        const { status: tagExist, content: tag } = tagService.findOneByID(id);
        if (!tagExist) return res.status(404).json({ error: "Tag not found!" });

        return res.status(200).json(tag);
    } catch (error) {
        throw error;
    }
};

controller.saveTag = async (req, res) => {
    try {
        const { name, html, description, category } = req.body;

        const { status: tagExist } = await tagService.findOneByHTML(html);
        if (tagExist) {
            return res.status(409).json({ error: "Tag already exists!" });
        }

        const { status: tagCreated } = await tagService.create(
            name,
            html,
            description,
            category
        );
        if (!tagCreated) {
            return res.status(409).json({ error: "Tag not created!" });
        }

        return res.status(201).json({ message: "Post created!" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = controller;
