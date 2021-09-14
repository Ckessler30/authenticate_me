const { check } = require("express-validator");
const { handleValidationErrors } = require("./utils");


const text = check("answerText")
  .notEmpty()
  .withMessage("Please enter a answer");

exports.validateCreate = [text];
