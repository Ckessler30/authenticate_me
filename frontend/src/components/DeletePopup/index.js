import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeQuestion } from "../../store/questions";

import "./deleteForm.css"

const DeleteForm = ({questionId}) => {
    const dispatch = useDispatch()
    const [showDelete, setShowDelete] = useState(false)


    const handleCancelClick = (e) => {
            e.preventDefault()
            setShowDelete(false)
        }
  return (
    <div className="deleteFormBox">
      <button onClick={() => setShowDelete(true)}>
        <i className="fas fa-trash-alt"></i>
      </button>
      {showDelete && (
        <div className="deleteForm">
          <div className="deleteFormInner">
            <h2>Delete</h2>
            <p>Are sure you want to delete this question?</p>
            <div className="deleteFormButtons">
              <button onClick={handleCancelClick} className="delete-buttons">
                Cancel
              </button>
              <button
                className="delete-buttons"
                onClick={async (e) => {
                  e.preventDefault();
                  const deletedQuestion = await dispatch(
                    removeQuestion(questionId)
                  );
                  if (deletedQuestion) {
                    setShowDelete(false);
                  }
                }}
              >
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
