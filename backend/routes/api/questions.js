const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const { User, Question, Answer } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");

const questionValidations = require('../../validations/questions')




router.post('/new', questionValidations.validateCreate, requireAuth, asyncHandler(async(req, res) => {
    const { userId, title, questionText, questionImg} = req.body
    console.log(typeof userId)
    const test = await Question.create({
        userId,
        title,
        questionText,
        questionImg
    })
    return res.redirect('/')
}))



module.exports = router