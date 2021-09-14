import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createNewComment, getComments } from "../../store/comments";


import "./newComment.css";

const CreateCommentForm = ({answerId, hideForm }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const {questionId} = useParams();
  const [commentText, setCommentText] = useState("");
  const comments = useSelector(state => {
      const comments = []
      for(let id in state.comments.commentsList){
          const comment = state.comments.commentsList[id]
          if(comment.answerId === +answerId){
              comments.push(comment)
          }
      }
      return comments
  })

//   console.log(allComments)

//   console.log(data)

  useEffect(() => {
    dispatch(getComments())
  },[dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentDetails = {
      userId: sessionUser.id,
      answerId,
      commentText,
    };

    const createdComment = await dispatch(createNewComment(commentDetails));
    
  };
  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return hideForm ? (
    <div className="commentsSection">
      <div className="createNewComment">
        <div className="createNewCommentInner">
          <form onSubmit={handleSubmit} className="createCommentInputs">
            <div className="commentProfileHead">
              <i className="fas fa-user-secret"></i>
            </div>
            <textarea
              placeholder="Write your answer"
              required
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="commentButtons">
              <button type="submit">Add Comment</button>
            </div>
          </form>
        </div>
      </div>
      <div className="commentsList">
        {comments &&
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <h4>
                <i className="fas fa-user-circle"></i>

                {comment.User.username}
              </h4>
              <p>{comment.commentText}</p>
              <div className="bottomCommentButtons">
                <div className="bottomCommentLeft">
                  <button>
                    <i class="fas fa-arrow-up"></i> UpVote
                  </button>
                  <button>
                    <i class="fas fa-reply"></i> Reply
                  </button>
                </div>
                <div className="bottomCommentRight">
                  <button>
                    <i class="fas fa-arrow-down"></i>
                  </button>
                  <button>
                    <i class="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  ) : (
    ""
  );
};

export default CreateCommentForm;
