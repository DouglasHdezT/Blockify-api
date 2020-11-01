const Lesson = require("@internal/models/Lesson");
const ServiceResponse = require("@internal/classes/ServiceResponse");

const service = {};

service.create = async (title, content, creator, private = false) => { 
    try {
        const lesson = new Lesson({
            title,
            content,
            creator,
            private
        });

        const lessonSaved = await lesson.save();
        if (!lessonSaved) return new ServiceResponse(false, { error: "Lesson not Created" });
        
        return new ServiceResponse(true, { message: "Lesson created!" });
    } catch (error) {
        throw error;
    }
}

module.exports = service;