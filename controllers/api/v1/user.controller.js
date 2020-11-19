const userService = require('@internal/services-v1/user.service');
const commentService = require('@internal/services-v1/comment.service');
const lessonService = require('@internal/services-v1/lesson.service');

const controller = {};

controller.update = async (req, res, next) => {
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
        next(error);
    }
}

controller.addTakenLesson = async (req, res, next) => {
    try {
        const { lessonId } = req.body;
        const { status: exist } = await lessonService.findById(lessonId);
        if (!exist) { return res.status(409).json({ error: "No existe la leccion" }) }

        const user = await userService.findOneById(req.user_id);
        if (!user) {
            return res.status(409).json({ error: "No se pudo agregar" });
        }

        if (!user.content.lessonsTaken.includes(lessonId)) {

            const { status: added } = await userService.addTakenLesson(req.user._id, lessonId);

            if (!added) return res.status(409).json({ error: "No se pudo agregar" });
        }

        return res.status(201).json({ message: "Added!" });
    } catch (error) {
        next(error);
    }
}

controller.delete = async (req, res, next) => {
    try {

        const { _id } = req.user;

        const { status: deleted } = await userService.deleteOne(_id);

        console.log(deleted);

        if (!deleted) {
            return res.status(409).json({ error: "Cant update!" })
        };

        return res.status(201).json({ message: "Deleted" });
    } catch (error) {
        next(error);
    }
}

/**
 * Rate methods
 */

controller.addRate = async (req, res, next) => {
    try {
        const { _id: myUserID } = req.user;
        const { userID, rate } = req.body;

        const { status: userExists, content: user } = await userService.findOneById(userID);
        if (!userExists) return res.status(404).json({ error: "User not found" });

        const alreadyRated = user.isUserInStars(myUserID);
        if (alreadyRated) return res.status(409).json({ error: "Already rated!" });

        const { status: rateAdded } = await userService.addStar(user, myUserID, rate);
        if (!rateAdded) return res.status(409).json({ error: "Cannot rate" });

        return res.status(201).json({ message: "Rate added!" });
    } catch (error) {
        next(error);
    }
}

controller.getRate = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { status: userExists, content: user } = await userService.findOneById(id);
        if (!userExists) return res.status(404).json({ error: "User not found" });

        return res.status(200).json({
            username: user.username,
            rate: user.stars
        });
    } catch (error) {
        next(error);
    }
}

controller.deleteRate = async (req, res, next) => {
    try {
        const { _id: myUserID } = req.user;
        const { userID } = req.body;

        const { status: userExists, content: user } = await userService.findOneById(userID);
        if (!userExists) return res.status(404).json({ error: "User not found" });

        const alreadyRated = user.isUserInStars(myUserID);
        if (!alreadyRated) return res.status(409).json({ error: "didn't rated!" });

        const { status: rateDeleted } = await userService.deleteStar(user, myUserID);
        if (!rateDeleted) return res.status(409).json({ error: "Cannot delete rate" });

        return res.status(200).json({ message: "Rate deleted" });
    } catch (error) {
        next(error);
    }
}

controller.updateRate = async (req, res, next) => {
    try {
        const { _id: myUserID } = req.user;
        const { userID, rate } = req.body;

        const { status: userExists, content: user } = await userService.findOneById(userID);
        if (!userExists) return res.status(404).json({ error: "User not found" });

        const alreadyRated = user.isUserInStars(myUserID);
        if (!alreadyRated) return res.status(409).json({ error: "didn't rated!" });

        const { status: rateUpdated } = await userService.updateStar(user, myUserID, rate);
        if (!rateUpdated) return res.status(409).json({ error: "Cannot update rate" });

        return res.status(200).json({ message: "Rate Updated" });
    } catch (error) {
        next(error);
    }
}

/**
 * Comments methods
 */

controller.getComments = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { status: userExists, content: user } = await userService.findOneById(id);
        if (!userExists) return res.status(404).json({ error: "User not found" });

        return res.status(200).json({
            username: user.username,
            comments: user.comments
        });
    } catch (error) {
        next(error);
    }
}

controller.addComment = async (req, res, next) => {
    try {
        const { _id: myUserID } = req.user;
        const { userID } = req.body;

        const { status: userExists, content: user } = await userService.findOneById(userID);
        if (!userExists) return res.status(404).json({ error: "User not found" });

        const { status: commentCreated, content: comment }
            = await commentService.create(req.body, myUserID);

        if (!commentCreated) return res.status(409).json({ error: "Comment not created" });

        const { status: commentAdded } = await userService.addComment(user, comment);
        if (!commentAdded) return res.status(409).json({ error: "Comment not added" });

        return res.status(200).json({ message: "Comment added" });
    } catch (error) {
        next(error);
    }
}

controller.removeComment = async (req, res, next) => {
    try {
        const { commentID, userID } = req.body;
        const { _id: myUserID } = req.user;

        const { status: userExists, content: user }
            = await userService.findOneById(userID);

        if (!userExists) return res.status(404).json({ error: "User not found" });

        const { status: commentExists, content: comment }
            = await commentService.findOneByID(commentID);

        if (!commentExists) return res.status(404).json({ error: "Comment not found" });

        if (!comment.creator.equals(myUserID))
            return res.status(403).json({ error: "This comment doesn't belong to you" });

        const { status: commentRemoved } = await userService.removeComment(user, comment);
        if (!commentRemoved) return res.status(409).json({ error: "Comment not removed" });

        const { status: commentDeleted } = await commentService.delete(comment);
        if (!commentDeleted) return res.status(409).json({ error: "Comment not deleted" });

        return res.status(200).json({ message: "Comment Deleted" });
    } catch (error) {
        next(error);
    }
}

module.exports = controller;