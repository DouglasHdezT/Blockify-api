const ServiceResponse = require("@internal/classes/ServiceResponse");
const Tag = require("@internal/models/Tag");

const service = {};

service.create = async (name, html, description, category) => {
    try {
        const tag = new Tag({
            name,
            html,
            description,
            category,
        });

        const savedTag = await tag.save();
        
        if (!savedTag) return new ServiceResponse(false, { error: "Tag not created" });

        return new ServiceResponse(true, {message: "Tag created"});
    } catch (error) {
        throw error;
    }
};

service.addValidAttr = (tag , name, description, validOptions = ["Cualquier cadena de texto"]) => { 
    try {
        tag.validAttrs.push({
            name,
            description,
            validOptions
        });

        const updatedTag = await tag.save();
        if (!updatedTag) return new ServiceResponse(false, { error: "Cannot update tag" });
        
        return new ServiceResponse(true, {message: "Attr added!"});
    } catch (error) {
        throw error;
    }
}

service.findOneByID = async (id) => { 
    try {
        const tag = await Tag.findById(id);
        if (!tag) return new ServiceResponse(false, { error: "Tag not found" });

        return new ServiceResponse(true, tag);
    } catch (error) {
        throw error;
    }
}

service.findOneByHTML = async (html) => { 
    try {
        const tag = await Tag.findOne({ html: html });
        if (!tag) return new ServiceResponse(false, { error: "Tag not found" });

        return new ServiceResponse(true, tag);
    } catch (error) {
        throw error;
    }
}

module.exports = service;
