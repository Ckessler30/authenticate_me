const { check } = require("express-validator");
const { handleValidationErrors } = require("./utils");

const title = check('title')
    .notEmpty()
    .withMessage('Please enter a title')
    .isLength({max: 255})
    .withMessage('Title must be less than 255 characters')
const text = check("questionText")
  .notEmpty()
  .withMessage("Please enter a question");

  exports.validateCreate = [
      title,
      text
  ]
