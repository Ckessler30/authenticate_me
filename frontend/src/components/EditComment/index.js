import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editComment } from "../../store/comments";

import "./editComment.css"

const EditCommentForm = ({ comment }) => {
  const [newCommentText, setNewCommentText] = useState(comment.commentText);
  const [showEditArea, setShowEditArea] = useState(false);
   const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

    const handleErrors = async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    };

  const handleSubmit = async () => {
    // console.log(commentText);

    const updatedCommentDetails = {
      commentText: newCommentText,
      commentId: comment.id,
    };

    try{
      const updatedComment = await dispatch(editComment(updatedCommentDetails));
  
      if (updatedComment) {
        setShowEditArea(false);
      }
    }catch(res){
      handleErrors(res)
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowEditArea(false);
  };
  return (
    <div className="editCommentBox">
      {showEditArea && (
        <div className="editCommentInput">
          <form
            className="editCommentForm"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(comment);
            }}
          >
            {errors.length > 0 && (
              <ul className="commentErrors">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            )}
            <textarea
              required
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            ></textarea>
            <div className="editCommentButtons">
              <button>Cancel</button>
              <button
                type="submit"
                disabled={comment.commentText === newCommentText}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
      <button onClick={() => setShowEditArea(true)}>Edit</button>
    </div>
  );
};

export default EditCommentForm;
