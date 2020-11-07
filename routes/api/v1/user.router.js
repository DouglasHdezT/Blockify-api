const express = require("express");
const router = express.Router();

const userController = require("@internal/controllers-v1/user.controller");

const { 
    addRateValidator,
    deleteRateValidator,
    idInParamsValidator
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

module.exports = router;