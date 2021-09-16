const { check } = require("express-validator");
const { handleValidationErrors } = require("./utils");

const text = check("commentText")
  .notEmpty()
  .withMessage("Please enter a answer");

exports.validateCreate = [text];
