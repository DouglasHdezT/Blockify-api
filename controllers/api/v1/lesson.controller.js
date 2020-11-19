const lessonService = require("@internal/services-v1/lesson.service");
const userService = require("@internal/services-v1/user.service");

const controller = {};

controller.create = async (req, res, next) => {
    try {
        const { user } = req;
        const { title, content, description, private, difficulty, learningPath } = req.body;

        const { status: lessonCreated } =
            await lessonService.create(title, description, content, user._id, private, difficulty, learningPath);

        if (!lessonCreated) return res.status(409).json({ error: "Lesson didn't created" });

        return res.status(201).json({ message: "Lesson created!" });
    } catch (error) {
        next(error);
    }
};

controller.findAll = async (req, res, next) => {
    try {
        const { content: lessons } = await lessonService.findAll();

        return res.status(200).json(lessons);
    } catch (error) {
        next(error);
    }
}

controller.findById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {status: lessonExists, content: lesson } = await lessonService.findById(id);

        if (!lessonExists) return res.status(404).json({ error: "Lesson not found" });

        return res.status(200).json(lesson);
    } catch (error) {
        next(error);
    }
}

controller.findByUserID = async (req, res, next) => { 
    try {
        const { id: userID } = req.params;

        const { status: userExists } = await userService.findOneById(userID);
        if (!userExists) return res.status(404).json({ error: "User not found" });

        const { content: userLessons } = await lessonService.findAllByUser(userID);

        return res.status(200).json(userLessons);
    } catch (error) {
        next(error);
    }
}

controller.findMyLessons = async (req, res, next) => { 
    try {
        const { _id: userID } = req.user;
        const { content: userLessons } = await lessonService.findAllByUser(userID);

        return res.status(200).json(userLessons);
    } catch (error) {
        next(error);
    }
}

controller.update = async (req, res, next) => {
    try {
        const { id } = req.body;
        const { _id: userID } = req.user;

        const { status: exist, content: lesson } = await lessonService.findById(id);
        if (!exist) {
            return res.status(404).json({ error: "Lesson not found!" });
        }

        if (!lesson.creator._id.equals(userID)) { 
            return res.status(403).json({ error: "You can only update your own Lessons" })
        }

        const { status: updated } = await lessonService.updateOneLesson(id, { ...req.body });

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
        const { _id: userID } = req.user;

        const { status: exist, content: lesson } = await lessonService.findById(id);
        if (!exist) {
            return res.status(404).json({ error: "Lesson not found!" });
        }

        if (!lesson.creator._id.equals(userID)) {
            return res.status(403).json({ error: "You can only update your own Lessons" })
        }

        const { status: lessonDeleted } = await lessonService.deleteById(id);
        if (!lessonDeleted) return res.status(409).json({ error: "Lesson not deleted" });

        return res.status(200).json({ message: "Lesson deleted" });
    } catch (error) {
        next(error);
    }
}

/**
 * Rate methods
 */

controller.addRate = async (req, res, next) => {
    try{
        const { _id: myUserID } = req.user;
        const { lessonID, rate } = req.body;

        const { status: lessonExists, content: lesson } = await lessonService.findById(lessonID);
        if (!lessonExists) return res.status(404).json({ error: "Lesson not found" });

        const alreadyRated = lesson.isUserInStars(myUserID);
        if (alreadyRated) return res.status(409).json({ error: "Already rated" });

        const { status: rateAdded } = await lessonService.addStar(lesson, myUserID, rate);
        if (!rateAdded) return res.status(409).json({ error: "Cannot rate" });

        return res.status(201).json({ message: "Rate added!" });
    } catch (error) {
        next(error);
    }
}

controller.deleteRate = async (req, res, next) => {
    try{
        const { _id: myUserID } = req.user;
        const { lessonID } = req.body;

        const { status: lessonExists, content: lesson } = await lessonService.findById(lessonID);
        if (!lessonExists) return res.status(404).json({ error: "Lesson not found" });

        const alreadyRated = lesson.isUserInStars(myUserID);
        if (!alreadyRated) return res.status(409).json({ error: "Didn't rate yet" });

        const { status: rateDeleted } = await lessonService.deleteStar(lesson, myUserID);
        if (!rateDeleted) return res.status(409).json({ error: "Cannot delete rate" });

        return res.status(201).json({ message: "Rate deleted!" });        
    } catch (error) {
        next(error);
    }
}

controller.updateRate = async (req, res, next) => {
    try{
        const { _id: myUserID } = req.user;
        const { lessonID, rate } = req.body;

        const { status: lessonExists, content: lesson } = await lessonService.findById(lessonID);
        if (!lessonExists) return res.status(404).json({ error: "Lesson not found" });

        const alreadyRated = lesson.isUserInStars(myUserID);
        if (!alreadyRated) return res.status(409).json({ error: "Didn't rate yet" });

        const { status: rateUpdated } = await lessonService.updateStar(lesson, myUserID, rate);
        if (!rateUpdated) return res.status(409).json({ error: "Cannot update rate" });

        return res.status(201).json({ message: "Rate updated!" });
    } catch (error) {
        next(error);
    }
}

module.exports = controller;