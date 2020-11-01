const debug = require('debug')("app:tag-controller");
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

        const { status: tagExist, content: tag } = await tagService.findOneByID(id);
        if (!tagExist) return res.status(404).json({ error: "Tag not found!" });

        return res.status(200).json(tag);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

controller.findOneByHTML = async (req, res) => { 
    try {
        const { html } = req.params;

        const { status: tagExist, content: tag } = await tagService.findOneByHTML(html);
        if (!tagExist) return res.status(404).json({ error: "Tag not found!" });

        return res.status(200).json(tag);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

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

controller.updateOneById = async (req, res) => { 
    try {
        const { tagID, name, html, description, category } = req.body;

        const { status: tagExist, content: tag } = await tagService.findOneByID(tagID);
        if (!tagExist) return res.status(404).json({ error: "Tag not found" });

        const { status: tagRepeated } = await tagService.findOneByHTML(html);
        if (tagRepeated) return res.status(409).json({ error: "Tag with that HTML already exists" });
        
        const { status: tagUpdated } = await tagService.updateOneTag(tag, { name, html, description, category });
        if (!tagUpdated) return res.status(409).json({ error: "Tag cannot update" });

        return res.status(200).json({ message: "Tag updated!" });
    } catch (error) {
        
    }
}

controller.deleteOneByID = async (req, res) => { 
    try {
        const { tagID } = req.body;

        const { status: tagExist } = await tagService.findOneByID(tagID); 
        if (!tagExist) return res.status(404).json({ error: "Tag doesn't exists" });

        const { status: tagDeleted } = await tagService.deleteOneById(tagID);
        if (!tagDeleted) return res.status(409).json({ error: "Tag cannot be deleted" });

        return res.status(200).json({ message: "Tag deleted!" });
    } catch (error) {
        throw error;
    }
}

/** @type {import('express').RequestHandler} */
controller.addValidAttr = async (req, res) => { 
    try {
        const { tagID, name, description, validOptions } = req.body;
        
        const { status: tagExists, content: tag } = await tagService.findOneByID(tagID);
        if (!tagExists) { 
            return res.status(404).json({ error: "Tag not found!" });
        }

        const { status: attrAdded, content: message } =
            await tagService.addValidAttr(tag, name, description, validOptions);
        
        if (!attrAdded) { 
            return res.status(409).json(message);
        }

        return res.status(200).json({ message: "Attr added" })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

controller.updateValidAttr = async (req, res) => { 
    try {
        const { tagID, name, description, validOptions } = req.body; 
        
        const { status: tagExists, content: tag } = await tagService.findOneByID(tagID);
        if (!tagExists) return res.status(404).json({ error: "Tag not found" });

        const { status: tagUpdated } = await tagService.updateValidAttr(tag, name, { description, validOptions });
        if (!tagUpdated) return res.status(404).json({ error: "Attribute doesn't exists" });

        return res.status(200).json({ message: "Attribute updated" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

controller.removeValidAttr = async (req, res) => { 
    try {
        const { tagID, attrName } = req.body;

        const { status: tagExist, content: tag } = await tagService.findOneByID(tagID);
        if (!tagExist) { 
            return res.status(404).json({ error: "Tag not found" });
        }

        const { status: attrRemoved } = await tagService.deleteValidAttr(tag, attrName);
        if (!attrRemoved) { 
            return res.status(404).json({ error: "Attribute not found" });
        }

        return res.status(200).json({ message: "Attribute removed" });        
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = controller;
