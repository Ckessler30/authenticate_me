import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeQuestion } from "../../store/questions";
import { removeComment } from "../../store/comments";

import "./deleteForm.css";
import { removeAnswer } from "../../store/answers";

const DeleteForm = ({ questionId, deleteType, commentId, answerId }) => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);

  // console.log(deleteType)

  const handleDelete = async (e) => {
    e.preventDefault();
    if (deleteType === "question") {
      const deletedQuestion = await dispatch(removeQuestion(questionId));
      if (deletedQuestion) {
        setShowDelete(false);
      }
    }
    if (deleteType === "comment") {
      const deletedComment = await dispatch(removeComment(commentId));
      if (deletedComment) {
        setShowDelete(false);
      }
    }
    if(deleteType === "answer"){
      const deletedAnswer = await dispatch(removeAnswer(answerId))
      if(deletedAnswer){
        setShowDelete(false)
      }
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowDelete(false);
  };
  return (
    <div className="deleteFormBox">
      <button onClick={() => setShowDelete(true)}>
        <i className="fas fa-trash-alt"></i>
      </button>
      {showDelete && (
        <div className="deleteForm">
          <div className="deleteFormInner">
            <h2>Delete</h2>
            <p>Are sure you want to delete this {deleteType}?</p>
            <div className="deleteFormButtons">
              <button onClick={handleCancelClick} className="delete-buttons">
                Cancel
              </button>
              <button className="delete-buttons" onClick={handleDelete}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteForm;
