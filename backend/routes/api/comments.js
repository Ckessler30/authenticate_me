const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const { User, Question, Answer, Comment } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const commentValidators = require('../../validations/comments')

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const comments = await Comment.findAll()
    return res.json(comments)
  })
);

router.post(
  "/new", commentValidators.validateCreate,
  requireAuth,
  asyncHandler(async (req, res) => {
      const { userId, answerId, commentText} = req.body
      const newComment = await Comment.create({
          userId,
          commentText,
          answerId
      })

      return res.json(newComment)
   
  })
);

module.exports = router;
