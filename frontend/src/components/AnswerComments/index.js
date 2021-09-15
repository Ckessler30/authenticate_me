import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { removeComment } from "../../store/comments";


const AnswerComments = ({ comment, hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const { questionId } = useParams();

    const handleDelete = async(e) => {
        e.preventDefault()
         const deletedComment = await dispatch(removeComment(comment.id));
        //  return hideForm();
    }


    return (
          <div className="comment" key={comment.id}>
              <h4>
                <i className="fas fa-user-circle"></i>

                {comment.User.username}
              </h4>
              <p>{comment.commentText}</p>
              <div className="bottomCommentButtons">
                <div className="bottomCommentLeft">
                  <button>
                    <i className="fas fa-arrow-alt-circle-up"></i>
                    UpVote
                  </button>
                  <button>
                    <i className="fas fa-reply"></i> Reply
                  </button>
                </div>
                <div className="bottomCommentRight">
                  <button>
                    <i className="fas fa-arrow-down"></i>
                  </button>
                  <button>
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                  {sessionUser?.id === comment.userId ? <button onClick={handleDelete}></button> : ''}
                </div>
              </div>
            </div>
    )
}


export default AnswerComments