const Lesson = require("@internal/models/Lesson");
const ServiceResponse = require("@internal/classes/ServiceResponse");

const { sanitizeObject } = require("@internal/utils/objects.tools");

const service = {};

service.create = async (title, description, indications, content, creator, private = false, difficulty=0, learningPath=[]) => {
    try {
        const lesson = new Lesson({
            title,
            description,
            content,
            indications,
            creator,
            private,
            difficulty,
            learningPath
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
            await Lesson.find({}).populate({
                path: "creator",
                select: "username _id avatar",
            }).populate("comments") || [];
        
        return new ServiceResponse(true, lessons);
    } catch (error) {
        throw error;
    }
}

service.findAllByUser = async (userID) => { 
    try {
        const lessons =
            await Lesson.find({ creator: userID }).populate("creator", "username _id avatar").populate("comments") || [];

        return new ServiceResponse(true, lessons);
    } catch (error) {
        throw error;
    }
}

service.findById = async (id) => { 
    try {
        const lesson = await Lesson.findById(id)
            .populate("creator", "username _id avatar")
            .populate({
                path: "comments",
                populate: {
                    path: "creator",
                    select: "username avatar"
                }
            });
        if (!lesson) return new ServiceResponse(false, { error: "Lesson not found" });

        return new ServiceResponse(true, lesson);
    } catch (error) {
        throw error;
    }
}

service.updateOneLesson = async (lessonID, { title, content, indications, description, private, difficulty, learningPath }) => { 
    try {
        const sanitizedObject = sanitizeObject({ title, content, indications, description, private, difficulty, learningPath });
        const lessonUpdated = await Lesson.findByIdAndUpdate(lessonID, { ...sanitizedObject });
        
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

/**
 * Stars Methods
 */

service.addStar = async (lesson, userID, rate) => { 
    try {
        const lessonUpdated = await Lesson.findByIdAndUpdate(lesson._id, {
            $push: {
                stars: {
                    userID,
                    rate
                }
            }
        });

        if (!lessonUpdated) return new ServiceResponse(false, { error: "Cannot push rate" });

        return new ServiceResponse(true, { message: "Rate added" });

    } catch (error) {
        throw error;
    }
}

service.deleteStar = async (lesson, userID) => { 
    try {
        const stars = lesson.get("stars", null, { getters: false });
        const indexOf = stars.findIndex(star => star.userID.equals(userID));

        stars.splice(indexOf, 1);

        const lessonUpdated = await lesson.save();

        if (!lessonUpdated) return new ServiceResponse(false, { error: "Cannot delete Star" });

        return new ServiceResponse(true, { message: "Star deleted" });
    } catch (error) {
        throw error;
    }
}

service.updateStar = async (lesson, userID, rate) => { 
    try {
        const stars = lesson.get("stars", null, { getters: false });
        const indexOf = stars.findIndex(star => star.userID.equals(userID));

        stars[indexOf].rate = rate;

        const lessonUpdated = await lesson.save();

        if (!lessonUpdated) return new ServiceResponse(false, { error: "Cannot update Star" });

        return new ServiceResponse(true, { message: "Rate updated" });
    } catch (error) {
        throw error;
    }
}

/**
 * Comments methods
 */

service.addComment = async (lesson, comment) => {
    try {
        lesson.comments = [...lesson.comments, comment._id];
        const lessonSaved = await lesson.save();

        if (!lessonSaved) return new ServiceResponse(false, { error: "Cannot add comment" });
        return new ServiceResponse(true, { message: "Comment added" });
    } catch (error) {
        throw error;
    }
}

service.removeComment = async (lesson, comment) => {
    try {
        lesson.comments = lesson.comments.filter(commentA => !commentA._id.equals(comment._id));
        const lessonSaved = await lesson.save();

        if (!lessonSaved) return new ServiceResponse(false, { error: "Cannot remove comment" });
        return new ServiceResponse(true, { message: "Comment deleted" });
    } catch (error) {
        throw error;
    }
}

module.exports = service;