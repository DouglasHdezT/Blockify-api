const express = require("express");
const router = express.Router();

const lessonController = require("@internal/controllers-v1/lesson.controller");

const {
    createLessonValidator,
    idAsParam,
    updateLessonValidator,
    deleteLessonValidator,
    addRateValidator,
    deleteRateValidator
} = require("@internal/validators-v1/lesson.validator");
const { runValidation } = require("@internal/validators-v1");

//Routes
router.get("/all", lessonController.findAll);
router.get("/one/:id", idAsParam, runValidation, lessonController.findById);
router.get("/byUser/:id", idAsParam, runValidation, lessonController.findByUserID);
router.get("/myLessons", lessonController.findMyLessons);

router.post("/", createLessonValidator, runValidation, lessonController.create);
router.put("/", updateLessonValidator, runValidation, lessonController.update);
router.delete("/", deleteLessonValidator, runValidation, lessonController.delete);

//Rate methods
router.post("/rate", addRateValidator, runValidation, lessonController.addRate);
router.put("/rate", addRateValidator, runValidation, lessonController.updateRate);
router.delete("/rate", deleteRateValidator, runValidation, lessonController.deleteRate);

module.exports = router;