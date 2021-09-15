const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const { User, Question, Answer, Comment } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const commentValidators = require('../../validations/comments')

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const answerId = req.url.split('/')[1]
    const comments = await Comment.findAll({
      where:{
        answerId
      },
      include: User,
    });
    return res.json(comments);
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

router.delete("/:id(\\d+)", requireAuth, asyncHandler(async(req, res) => {
  const { commentId } = req.body
  // console.log("LOOK",commentId)
  const comment = await Comment.findOne({
    where: {
      id:commentId
    }
  })
  // console.log('HERE',comment)

  if(comment){
   await comment.destroy()
  }
  return res.json(commentId)
}));

module.exports = router;
