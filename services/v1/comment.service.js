const Comment = require("@internal/models/Comment");
const ServiceResponse = require("@internal/classes/ServiceResponse");

const service = {};

service.create = async ({ title, message }, creator) => { 
    try {
        const comment = new Comment({ title, message, creator });
        const commentSaved = await comment.save();

        if (!commentSaved) return new ServiceResponse(false, { error: "Cannot create comment" });

        return new ServiceResponse(true, commentSaved);
    } catch (error) {
        throw error;
    }
}

module.exports = service;