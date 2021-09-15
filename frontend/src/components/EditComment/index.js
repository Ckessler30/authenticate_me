import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editComment } from "../../store/comments";

import "./editComment.css"

const EditCommentForm = ({ comment }) => {
  const [newCommentText, setNewCommentText] = useState(comment.commentText);
  const [showEditArea, setShowEditArea] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // console.log(commentText);

    const updatedCommentDetails = {
      commentText: newCommentText,
      commentId: comment.id,
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
    <div className="editCommentBox">
      {showEditArea && (
          <div className="editCommentInput">
            <form
            className='editCommentForm'
              onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(comment);
              }}
            >
            <textarea
              required
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            ></textarea>
            <div className="editCommentButtons">
              <button>Cancel</button>
              <button type="submit" disabled={comment.commentText === newCommentText}>Update</button>
            </div>
          </form>
        </div>
      )}
      <button onClick={() => setShowEditArea(true)}>Edit</button>
    </div>
  );
};

export default EditCommentForm;
