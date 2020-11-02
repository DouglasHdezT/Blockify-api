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

//TODO: Implement other methods 

module.exports = controller;