const express = require("express");
const router = express.Router();

const tagController = require("@internal/controllers-v1/tag.controller");

const { roleValidatorHelper } = require("@internal/middlewares-v1/auth.middleware");
const { ROLES } = require("@internal/constants");

const { runValidation } = require("@internal/validators-v1");
const {
    saveTagValidator,
    updateTagValidator,
    findByIdValidator,
    findByHTMLValidator,
    addAttrValidator,
    removeAttrValidator,
    updateAttrValidator,
    deleteTagValidator
} = require("@internal/validators-v1/tag.validator");

// Routes registration
router.get("/all", tagController.findAll);
router.get("/one/:id", findByIdValidator, runValidation, tagController.findOneById);
router.get("/byHTML/:html", findByHTMLValidator, runValidation, tagController.findOneByHTML);

//Only for admins
router.use(roleValidatorHelper(ROLES.ADMIN));

router.post("/", saveTagValidator, runValidation, tagController.saveTag);
router.put("/", updateTagValidator, runValidation, tagController.updateOneById);
router.delete("/", deleteTagValidator, runValidation, tagController.deleteOneByID);

router.post("/attr", addAttrValidator, runValidation, tagController.addValidAttr);
router.put("/attr", updateAttrValidator, runValidation, tagController.updateValidAttr);
router.delete("/attr", removeAttrValidator, runValidation, tagController.removeValidAttr);

module.exports = router;
