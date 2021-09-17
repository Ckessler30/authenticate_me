import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { removeComment, getComments, editComment } from "../../store/comments";
import DeleteForm from "../DeletePopup";
import EditCommentForm from "../EditComment";

import "./answerComments.css"


const AnswerComments = ({ hideForm, answerId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const { questionId } = useParams();
    
    
  

    const comments = useSelector((state) => state.comments.commentsList);


     useEffect(() => {
       dispatch(getComments(answerId));
     }, [dispatch]);

    // const handleDelete = async(e) => {
    //     e.preventDefault()
    //      const deletedComment = await dispatch(removeComment(comment?.id));
    //     //  return hideForm();


    // }

  


    return (
      <div className="commentsList">
        {comments &&
          comments.map((comment) => {
            return (
              <div className="comment" key={comment.id}>
                <h4>
                  <i className="fas fa-user-circle"></i>

                  {comment.User?.username}
                </h4>
                <div className="bottomHalfComments">
                  <p>{comment.commentText}</p>
                  <EditCommentForm comment={comment}/>
                  <div className="bottomCommentButtons">
                    <div className="bottomCommentLeft">
                      <button className="newCommentButtons">
                        <i className="fas fa-arrow-alt-circle-up"></i>
                        UpVote
                      </button>
                      <button className="newCommentButtons">
                        <i className="fas fa-reply"></i> Reply
                      </button>
                    </div>
                    <div className="bottomCommentRight">
                      <button className="newCommentButtons">
                        <i className="fas fa-arrow-down"></i>
                      </button>
                      <button className="newCommentButtons">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                      {sessionUser?.id === comment.userId && (
                        <DeleteForm commentId={comment.id} deleteType="comment" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
}


export default AnswerComments