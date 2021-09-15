import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editQuestion } from "../../store/questions";

import './editQuestion.css'

const EditQuestionForm = ({question}) => {
    const dispatch = useDispatch()

    const [showEditQuestion, setShowEditQuestion] = useState(false)
    const [title, setTitle] = useState(question.title)
    const [questionText, setQuestionText] = useState(question.questionText)

    const handleSubmit = async(e) => {
        e.preventDefault()

        const updatedQuestionDetails = {
            title,
            questionId: question.id,
            questionText
        }

        const updatedQuestion = await dispatch(editQuestion(updatedQuestionDetails))

        if(updatedQuestion){
            setShowEditQuestion(false)
        }
    }

      const handleCancelClick = (e) => {
        e.preventDefault();
        setShowEditQuestion(false);
      };

  return (
    <div className="editQuestionFormBox">
      <button onClick={() => setShowEditQuestion(true)}>
        <i class="fas fa-pen-alt"></i> Edit
      </button>

      {showEditQuestion && (
        <div className="editQuestionForm">
          <div className="editQuestionFormInner">
            <form className="editQuestionInputs" onSubmit={handleSubmit}>
              <button onClick={() => setShowEditQuestion(false)}>
                <i class="fas fa-times"></i>
              </button>
              <h2>Edit Question</h2>
              <input type="text" value={title} onChange={(e)=> setTitle(e.target.value) } required/>
              <div className="editQuestionButtons">
                <button type="button" onClick={handleCancelClick}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditQuestionForm;
