const lessonService = require("@internal/services-v1/lesson.service");

const controller = {};

controller.create = async (req, res) => {
    try {
        const { user } = req;
        const { title, content, private } = req.body;

        const { status: lessonCreated } =
            await lessonService.create(title, content, user._id, private);

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
        const { content: lesson } = await lessonService.findById(id);

        return res.status(200).json(lesson);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

controller.update = async () => {
    try {
        const { id } = req.body;
        const { status: exist } = await lessonService.findById(id);

        if (!exist) {
            return res.status(409).json({ error: "Lesson not found!" });
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

//TODO: Implement other methods 

module.exports = controller;