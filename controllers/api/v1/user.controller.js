const userService = require('@internal/services-v1/user.service');

const controller = {};

controller.update = async (req, res) => {
    try {

        const { _id } = req.user;
        const { firstname, lastname, username, email, avatar } = req.body;
        const { status: updated, content: oldUser } = await userService.update(_id, {
            firstname,
            lastname,
            username,
            email,
            avatar
        });

        console.log(updated, oldUser);

        if (!updated) {
            return res.status(409).json({ error: "Cant update!" })
        };

        return res.status(201).json({ message: "Updated" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

controller.delete = async (req, res) => {
    try {

        const { _id } = req.user;

        const { status: deleted } = await userService.deleteOne(_id);

        console.log(deleted);

        if (!deleted) {
            return res.status(409).json({ error: "Cant update!" })
        };

        return res.status(201).json({ message: "Deleted" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = controller;