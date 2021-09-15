import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { removeComment, getComments, editComment } from "../../store/comments";
import DeleteForm from "../DeletePopup";

import "./answerComments.css"


const AnswerComments = ({ hideForm, answerId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const { questionId } = useParams();
    const [showEditArea, setShowEditArea] = useState(false)
    const [newCommentText, setNewCommentText] = useState(false)
    
  

    const comments = useSelector((state) => state.comments.commentsList);


     useEffect(() => {
       dispatch(getComments(answerId));
     }, [dispatch]);

    // const handleDelete = async(e) => {
    //     e.preventDefault()
    //      const deletedComment = await dispatch(removeComment(comment?.id));
    //     //  return hideForm();


    // }

     const handleSubmit = async ( comment) => {
       

       const {commentText} = comment
       console.log(commentText)

       const updatedCommentDetails = {
         commentText,
         commentId: comment.id
       };

       const updatedComment = await dispatch(editComment(updatedCommentDetails));

       if (updatedComment) {
         setShowEditArea(false);
       }
     };

     const handleCancelClick = (e) => {
       e.preventDefault();
       setShowEditArea(false);
     };


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
                {showEditArea ? 
                
                <div className="editCommentInput">
                    <form onSubmit={e=> { e.preventDefault(); handleSubmit( comment)}}>
                      <textarea required value={newCommentText ? newCommentText : comment.commentText} onChange={(e) => setNewCommentText(e.target.value)}></textarea>
                      <button type="submit">Save</button>
                    </form>
                </div>
                
                : <p>{comment.commentText}</p>}
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
                    {sessionUser?.id === comment.userId && (
                      <DeleteForm commentId={comment.id} deleteType="comment" />
                    )}
                    {sessionUser?.id === comment.userId &&
                      <button onClick={() => setShowEditArea(true)}></button>
                    }
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
}


export default AnswerComments