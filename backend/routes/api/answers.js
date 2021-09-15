const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const { User, Question, Answer, Comment } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const answerValidations = require('../../validations/answers')


router.get('/', asyncHandler(async(req, res) => {
    const { questionId} = req.body
    // console.log('QUESTION ID',questionId)
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
       const { userId, questionId, answerText, answerImg } = req.body;
    //    console.log(typeof userId);
       const answer = await Answer.create({
         userId,
         answerText,
         questionId,
         answerImg
       });
       return res.json(answer);
  })
);


router.delete("/:id(\\d+)", requireAuth, asyncHandler(async(req, res) => {
  const { answerId } = req.body
  const answer = await Answer.findOne({
    where:{
      id: answerId
    }
  })


  if(answer){
    const comments = await Comment.findAll({
      where:{
        answerId: answer.id
      }
    })
    if(comments){
      comments.forEach(async(comment) => {
        await comment.destroy()
      })
    }

    await answer.destroy()
  }

  return res.json(answerId)
}))


module.exports = router;
