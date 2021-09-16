const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const { User, Question, Answer, Comment, Vote } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");

const questionValidations = require('../../validations/questions')




router.post('/new', questionValidations.validateCreate, requireAuth, asyncHandler(async(req, res) => {
    const { userId, title, questionText, questionImg} = req.body
    // console.log(typeof userId)
    const test = await Question.create({
        userId,
        title,
        questionText,
        questionImg
    })
    return res.json(test)
}))


router.delete("/:id(\\d+)", requireAuth, asyncHandler(async(req,res) => {
    const { questionId } = req.body

    const answers = await Answer.findAll({
        where: {
            questionId
        }
    })
    // console.log("HERe", answers)
    if(answers){
        answers.forEach(async(answer) => {
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

            const votes = await Vote.findAll({
                where:{
                    answerId: answer.id
                }
            })
            console.log("VOTES HERE", votes)

            if(votes){
                votes.forEach(async(vote) => {
                    await vote.destroy()
                })
            }

             await answer.destroy()
        })
    }

    const question = await Question.findOne({
        where:{
            id: questionId
        }
    })

    if(question){
        await question.destroy()
    }

    return res.json(questionId)
}));


router.put("/:id(\\d+)", requireAuth, asyncHandler(async(req, res) => {
    const { title, questionId, questionText} = req.body
    const question = await Question.findOne({
        where: {
            id: questionId
        }
    })
    const updatedQuestion = await question.update({
        title,
        questionText
    })
    // console.log(updatedQuestion)
    return res.json(updatedQuestion)
}));





module.exports = router