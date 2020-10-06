const service = {};
const TagCategory = require("@internal/models/TagCategory");
const ServiceResponse = require("@internal/classes/ServiceResponse");

service.create = async (name, description) => {
    try {
        const tagCategory = new TagCategory({
            name,
            description,
        });

        const savedTagCategory = await tagCategory.save();

        if (!savedTagCategory) return new ServiceResponse(false, { error: "TagCategory not created" });

        return new ServiceResponse(true, { message: "Tag Category created" });
    } catch (error) {
        throw error
    }
}

service.findById = async (id) => {
    try {
        const tagCategory = await TagCategory.findById(id);

        if (!tagCategory) return new ServiceResponse(false, { error: "Tag category not found" });

        return new ServiceResponse(true, tagCategory);
    } catch (error) {
        throw error
    }
}

service.findByName = async (name) => {
    try {
        console.log(name);
        const tagCategory = await TagCategory.findOne({ name: name })

        if (!tagCategory) return new ServiceResponse(false, { error: "Tag category not found" });

        return new ServiceResponse(true, tagCategory);
    } catch (error) {
        throw error
    }
}

service.findAll = async () => {
    try {
        const tagCategories = await TagCategory.find({});

        if (tagCategories.length <= 0) return new ServiceResponse(false, { error: "No results!" });

        return new ServiceResponse(true, tagCategories);
    } catch (error) {
        throw error
    }
}

service.updateOne = async (id, fieldsToUpdate) => {
    try {
        //console.log(id);
        const tagCategoryUpdated = await TagCategory.findByIdAndUpdate(id, { ...fieldsToUpdate });
        console.log(tagCategoryUpdated);
        if (!tagCategoryUpdated) return new ServiceResponse(false, { error: "Tag didn't update" });

        return new ServiceResponse(true, tagCategoryUpdated);
    } catch (error) {
        throw error
    }
}

service.deleteOne = async (id) => {
    try {
        const tagCategoryDeleted = await TagCategory.findByIdAndDelete(id);

        if (!tagCategoryDeleted) return new ServiceResponse(false, { error: "Tag didn't delete" });

        return new ServiceResponse(true, tagCategoryDeleted);
    } catch (error) {
        throw error
    }
}

module.exports = service;