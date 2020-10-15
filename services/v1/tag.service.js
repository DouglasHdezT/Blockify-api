const debug = require('debug')('app:tag-service');
const { sanitizeObject } = require("@internal/utils/objects.tools");

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

service.addValidAttr = async (tag , name, description, validOptions = ["Cualquier cadena de texto"]) => { 
    try {
        const lowerName = name.toLowerCase().trim();
        const attrExists = tag.validAttrs.some(attr => attr.name === lowerName);
        
        if (attrExists) return new ServiceResponse(false, { error: "Attr already exists!" });
        
        tag.validAttrs.push({
            name: lowerName,
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

service.updateValidAttr = async (tag, name, fieldsToUpdate) => { 
    try {
        const sanitizedFields = sanitizeObject(fieldsToUpdate);

        const attrIndex = tag.validAttrs.findIndex(attr => attr.name === name);
        if (attrIndex < 0) return new ServiceResponse(false, { error: "Attribute doesn't exists" });

        Object.keys(sanitizedFields).forEach(key => {
            tag.validAttrs[attrIndex][key] = sanitizedFields[key];
        })

        await tag.save();
        
        return new ServiceResponse(true, { message: "Tag updated" })
    } catch (error) {
        throw error;
    }
}

service.deleteValidAttr = async (tag, name) => { 
    try {
        const attrIndex = tag.validAttrs.findIndex(el => el.name === name);
        if (attrIndex < 0) return new ServiceResponse(false, { error: "Attribute doesn't exist" });

        tag.validAttrs = tag.validAttrs.filter(attr => attr.name !== name);
        await tag.save();

        return new ServiceResponse(true, { message: "Attribute removed" });
    } catch (error) {
        throw error;
    }
}

service.findAll = async () => { 
    try {
        const tags = await Tag.find({}) || [];
        
        return new ServiceResponse(true, tags);
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

service.updateOneTag = async (tag, fieldsToUpdate) => { 
    try {
        const sanitizedFields = sanitizeObject(fieldsToUpdate);

        Object.keys(sanitizedFields).forEach(key => {
            tag[key] = sanitizedFields[key];
        })

        const tagUpdated = await tag.save();
        if (!tagUpdated) return new ServiceResponse(false, { error: "Tag didn't update" });

        return new ServiceResponse(true, { message: "Tag updated!" });
    } catch (error) {
        throw error;
    }
}

service.deleteOneById = async (id) => { 
    try {
        const tagDeleted = await Tag.findByIdAndDelete(id);

        if (!tagDeleted) return new ServiceResponse(false, { error: "Cannot detele tag" });

        return new ServiceResponse(true, { message: "Tag deleted!" });
    } catch (error) {
        throw error;
    }
}

module.exports = service;
