const userService = require('@internal/services-v1/user.service');

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

module.exports = controller;