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
        const tagCategory = await TagCategory.findOne({ name: name })

        if (!tagCategory) return new ServiceResponse(false, { error: "Tag category not found" });

        return new ServiceResponse(true, tagCategory);
    } catch (error) {
        throw error
    }
}

module.exports = service;