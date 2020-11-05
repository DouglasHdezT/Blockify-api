const Lesson = require("@internal/models/Lesson");
const ServiceResponse = require("@internal/classes/ServiceResponse");

const { sanitizeObject } = require("@internal/utils/objects.tools");

const service = {};

service.create = async (title, description ,content, creator, private = false) => {
    try {
        const lesson = new Lesson({
            title,
            description,
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
};

service.findAll = async () => { 
    try {
        const lessons =
            await Lesson.find({}).populate("creator", "name stars _id") || [];
        
        return new ServiceResponse(true, lessons);
    } catch (error) {
        throw error;
    }
}

service.findAllByUser = async (userID) => { 
    try {
        const lessons =
            await Lesson.find({ creator: userID }).populate("creator", "name stars _id") || [];

        return new ServiceResponse(true, lessons);
    } catch (error) {
        throw error;
    }
}

service.findById = async (id) => { 
    try {
        const lesson = await Lesson.findById(id)
            .populate("creator", "name stars _id");
        if (!lesson) return new ServiceResponse(false, { error: "Lesson not found" });

        return new ServiceResponse(true, lesson);
    } catch (error) {
        throw error;
    }
}

service.updateOneLesson = async (lessonID, { title, content, description, private }) => { 
    try {
        const sanitizedObject = sanitizeObject({ title, content, description, private });
        const lessonUpdated = await Lesson.findByIdAndRemove(lessonID, { ...sanitizedObject });
        
        if (!lessonUpdated) return new ServiceResponse(false, { error: "Lesson didn't updated" });

        return new ServiceResponse(true, { message: "Lesson updated!" });
    } catch (error) {
        throw error;
    }
}

service.deleteById = async (lessonID) => { 
    try {
        const lessonDeleted = await Lesson.findByIdAndDelete(lessonID);

        if (!lessonDeleted) return new ServiceResponse(false, { error: "Lesson didn't deleted" });
        
        return new ServiceResponse(true, { message: "Lesson deleted!" });
    } catch (error) {
        throw error;
    }
}

module.exports = service;