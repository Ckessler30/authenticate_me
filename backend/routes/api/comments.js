const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

const { User, Question, Answer, Comment } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");


const commentValidators = [
    check("commentText")
      .notEmpty()
      .withMessage("Please enter a comment below"),
    handleValidationErrors
  ]

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
  "/new", commentValidators,
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

router.put("/:id(\\d+)", commentValidators ,requireAuth, asyncHandler(async(req,res) => {
  const { commentText, commentId} = req.body
  const comment = await Comment.findOne({
    where:{
      id: commentId
    }
  })

  const updatedComment = await comment.update({
    commentText
  })
  return res.json(updatedComment)

}));

module.exports = router;
