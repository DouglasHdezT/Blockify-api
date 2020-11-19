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

service.findOneByID = async (id) => {
    try{
        const comment = await Comment.findById(id);

        if (!comment) return new ServiceResponse(false, { error: "Comment not found" });
        return new ServiceResponse(true, comment);
    } catch (error) {
        throw error;
    }
}

service.delete = async (comment) => {
    try{
        const commentDeleted = await Comment.findByIdAndDelete(comment._id);

        if (!commentDeleted) return new ServiceResponse(false, { error: "Comment not deleted" });
        return new ServiceResponse(true, { message: "Comment deleted" });
    } catch (error) {
        throw error;
    }
}

module.exports = service;