const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const { User, Question, Answer } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");


router.get('/', asyncHandler(async(req, res) => {
    const { questionId} = req.body
    console.log('QUESTION ID',questionId)
    const answers = await Answer.findAll({
        include: User, Question
    })

    return res.json(answers)

}))


module.exports = router;
