const tagCategoryService = require('@internal/services-v1/tagCategory.service');

const controller = {};

controller.saveTagCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body

        const { status: tagExist } = await tagCategoryService.findByName(name);

        if (tagExist) return res.status(409).json({ error: "Tag Category already exist!" });

        const { status: tagCreated } = await tagCategoryService.create(name, description);

        if (!tagCreated) return res.status(409).json({ error: "Tag Category not created" });

        return res.statud(201).json({ message: "Tag Category created" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = controller;