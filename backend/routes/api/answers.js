const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const { User, Question, Answer, Comment, Vote } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require('../../utils/validation')

const answerValidations = 
[  check("answerText")
    .notEmpty()
    .withMessage("Please enter an answer"),
   handleValidationErrors
  ]


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
  answerValidations,
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
    // console.log("ABOUT TO HIT")
    const votes = await Vote.findAll({
      where: {answerId: 1}
    })
    // console.log("VOTES HERE", votes)

    if(votes){
      votes.forEach(async(vote) => {
        await vote.destroy()
      })
    }


    await answer.destroy()
  }

  return res.json(answerId)
}))


router.put("/:id(\\d+)", answerValidations, requireAuth, asyncHandler(async(req,res) => {
  const { answerId, answerText, answerImg} = req.body
  const answer = await Answer.findOne({
    where: {
      id: answerId
    }
  })
  const updatedAnswer = await answer.update({
    answerText,
    answerImg
  })
  return res.json(updatedAnswer)
}));


module.exports = router;
