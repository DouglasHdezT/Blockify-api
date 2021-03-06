const tagService = require("@internal/services-v1/tag.service");
const tagCategoryService = require("@internal/services-v1/tagCategory.service");

const controller = {};

controller.findAll = async (req, res, next) => {
    try {
        const { content: tags } = await tagService.findAll();

        return res.status(200).json(tags);
    } catch (error) {
        next(error);
    }
};

controller.findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { status: tagExist, content: tag } = await tagService.findOneByID(id);
        if (!tagExist) return res.status(404).json({ error: "Tag not found!" });

        return res.status(200).json(tag);
    } catch (error) {
        next(error);
    }
};

controller.findOneByHTML = async (req, res, next) => { 
    try {
        const { html } = req.params;

        const { status: tagExist, content: tag } = await tagService.findOneByHTML(html);
        if (!tagExist) return res.status(404).json({ error: "Tag not found!" });

        return res.status(200).json(tag);
    } catch (error) {
        next(error);
    }
}

controller.saveTag = async (req, res, next) => {
    try {
        const { name, html, description, category } = req.body;

        const { status: tagExist } = await tagService.findOneByHTML(html);
        if (tagExist) {
            return res.status(409).json({ error: "Tag already exists!" });
        }

        const { status: tagCategoryExist, content: tagCategory } =
            await tagCategoryService.findByAbbr(category);
        
        if (!tagCategoryExist) return res.status(404).json({ error: "Tag category doesn't exists" });
            
        const { status: tagCreated } = await tagService.create(
            name,
            html,
            description,
            tagCategory._id
        );
        if (!tagCreated) {
            return res.status(409).json({ error: "Tag not created!" });
        }

        return res.status(201).json({ message: "Post created!" });
    } catch (error) {
        next(error);
    }
};

controller.updateOneById = async (req, res, next) => { 
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
        next(error)
    }
}

controller.deleteOneByID = async (req, res, next) => { 
    try {
        const { tagID } = req.body;

        const { status: tagExist } = await tagService.findOneByID(tagID); 
        if (!tagExist) return res.status(404).json({ error: "Tag doesn't exists" });

        const { status: tagDeleted } = await tagService.deleteOneById(tagID);
        if (!tagDeleted) return res.status(409).json({ error: "Tag cannot be deleted" });

        return res.status(200).json({ message: "Tag deleted!" });
    } catch (error) {
        next(error);
    }
}

/** @type {import('express').RequestHandler} */
controller.addValidAttr = async (req, res, next) => { 
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
        next(error);
    }
}

controller.updateValidAttr = async (req, res, next) => { 
    try {
        const { tagID, name, description, validOptions } = req.body; 
        
        const { status: tagExists, content: tag } = await tagService.findOneByID(tagID);
        if (!tagExists) return res.status(404).json({ error: "Tag not found" });

        const { status: tagUpdated } = await tagService.updateValidAttr(tag, name, { description, validOptions });
        if (!tagUpdated) return res.status(404).json({ error: "Attribute doesn't exists" });

        return res.status(200).json({ message: "Attribute updated" });
    } catch (error) {
        next(error);
    }
}

controller.removeValidAttr = async (req, res, next) => { 
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
        next(error);
    }
}

module.exports = controller;
