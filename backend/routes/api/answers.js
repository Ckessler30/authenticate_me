const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const { User, Question, Answer } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const answerValidations = require('../../validations/answers')


router.get('/', asyncHandler(async(req, res) => {
    const { questionId} = req.body
    console.log('QUESTION ID',questionId)
    const answers = await Answer.findAll({
        include: User, Question
    })

    return res.json(answers)

}))

router.post(
  "/new",
  answerValidations.validateCreate,
  requireAuth,
  asyncHandler(async (req, res) => {
       const { userId, questionId, answerText } = req.body;
    //    console.log(typeof userId);
       const answer = await Answer.create({
         userId,
         answerText,
         questionId
       });
       return res.json(answer);
  })
);


module.exports = router;
