const tagCategoryService = require('@internal/services-v1/tagCategory.service');

const controller = {};

controller.saveTagCategory = async (req, res, next) => {
    try {
        const { name, description, abbr } = req.body

        const { status: tagExist } = await tagCategoryService.findByAbbr(abbr);

        if (tagExist) return res.status(409).json({ error: "Tag Category already exist!" });

        const { status: tagCreated } = await tagCategoryService.create(name, description, abbr);

        if (!tagCreated) return res.status(409).json({ error: "Tag Category not created" });

        return res.status(201).json({ message: "Tag Category created" });
    } catch (error) {
        next(error);
    }
}

controller.findById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status: tagCategoryExist, content: tagCategory } = await tagCategoryService.findById(id);

        if (!tagCategoryExist) {
            return res.status(409).json({ error: "No results!" });
        }

        return res.status(201).json(tagCategory);
    } catch (error) {
        next(error);
    }
}

controller.findByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const { status: tagCategoryExist, content: tagCategory } = await tagCategoryService.findByName(name);

        if (!tagCategoryExist) {
            return res.status(409).json({ error: "No results!" });
        }

        return res.status(201).json(tagCategory);
    } catch (error) {
        next(error);
    }
}

controller.findAll = async (req, res, next) => {
    try {

        const { status: results, content: tagCategories } = await tagCategoryService.findAll();

        if (!results) {
            return res.status(409).json({ error: "No results!" });
        }

        return res.status(201).json(tagCategories);
    } catch (error) {
        next(error);
    }
}

controller.update = async (req, res, next) => {
    try {

        const { id, abbr } = req.body;
        const { status: existByName } = await tagCategoryService.findByAbbr(abbr);

        if (existByName) {
            return res.status(409).json({ error: "Already exists!" });
        }

        const { status: updated } = await tagCategoryService.updateOne(id, { ...req.body });

        if (!updated) {
            return res.status(409).json({ error: "Cant update!" });
        }

        return res.status(201).json({ message: "Updated" });
    } catch (error) {
        next(error);
    }
}

controller.delete = async (req, res, next) => {
    try {
        const { id } = req.body;

        const { status: deleted } = await tagCategoryService.deleteOne(id);

        if (!deleted) {
            return res.status(409).json({ error: "Cant delete!" });
        }

        return res.status(201).json({ message: "Deleted" });
    } catch (error) {
        next(error);
    }
}

module.exports = controller;