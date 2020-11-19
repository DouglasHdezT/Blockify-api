const express = require("express");
const router = express.Router();

const userController = require("@internal/controllers-v1/user.controller");

const { 
    addRateValidator,
    deleteRateValidator,
    idInParamsValidator,
    addCommentValidator,
    removeCommentValidator
} = require("@internal/validators-v1/user.validator");
const { runValidation } = require("@internal/validators-v1");

//Update
router.put('/', userController.update);

//Delete
router.delete('/', userController.delete);

//Rate methods
router.get("/rate/:id", idInParamsValidator, runValidation, userController.getRate);
router.post("/rate", addRateValidator, runValidation, userController.addRate);
router.delete("/rate", deleteRateValidator, runValidation, userController.deleteRate);
router.put("/rate", addRateValidator, runValidation, userController.updateRate);

//Comment methods
router.get("/comments/:id", idInParamsValidator, runValidation, userController.getComments);
router.post("/comment", addCommentValidator, runValidation, userController.addComment);
router.delete("/comment", removeCommentValidator, runValidation, userController.removeComment);

module.exports = router;