const lessonService = require("@internal/services-v1/lesson.service");
const userService = require("@internal/services-v1/user.service");

const controller = {};

controller.create = async (req, res) => {
    try {
        const { user } = req;
        const { title, content, description, private } = req.body;

        const { status: lessonCreated } =
            await lessonService.create(title, description, content, user._id, private);

        if (!lessonCreated) return res.status(409).json({ error: "Lesson didn't created" });

        return res.status(201).json({ message: "Lesson created!" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

controller.findAll = async (req, res) => {
    try {
        const { content: lessons } = await lessonService.findAll();

        return res.status(200).json(lessons);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

controller.findById = async (req, res) => {
    try {
        const { id } = req.params;
        const {status: lessonExists, content: lesson } = await lessonService.findById(id);

        if (!lessonExists) return res.status(404).json({ error: "Lesson not found" });

        return res.status(200).json(lesson);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

controller.findByUserID = async (req, res) => { 
    try {
        const { id: userID } = req.params;

        const { status: userExists } = await userService.findOneById(userID);
        if (!userExists) return res.status(404).json({ error: "User not found" });

        const { content: userLessons } = await lessonService.findAllByUser(userID);

        return res.status(200).json(userLessons);
    } catch (error) {
        return res.status(500).json({error: "Internal server error"})
    }
}

controller.findMyLessons = async (req, res) => { 
    try {
        const { _id: userID } = req.user;
        const { content: userLessons } = await lessonService.findAllByUser(userID);

        return res.status(200).json(lessonService);
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
}

controller.update = async (req, res) => {
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
        return res.status(500).json({ error: "Internal server error" });
    }
}

controller.delete = async (req, res) => { 
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
        return res.status(500).json({ error: "Internal server error" });
    }
}

//TODO: Implement other methods 

module.exports = controller;