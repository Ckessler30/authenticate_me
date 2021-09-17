import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editQuestion } from "../../store/questions";

import './editQuestion.css'

const EditQuestionForm = ({question}) => {
    const dispatch = useDispatch()

    const [showEditQuestion, setShowEditQuestion] = useState(false)
    const [title, setTitle] = useState(question.title)
    const [questionText, setQuestionText] = useState(question.questionText)
    const [errors, setErrors] = useState([]);

     const handleErrors = async (res) => {
       const data = await res.json();
       if (data && data.errors) setErrors(data.errors);
     };

    const handleSubmit = async(e) => {
        e.preventDefault()
        setErrors([])
        const updatedQuestionDetails = {
            title,
            questionId: question.id,
            questionText
        }

        if(title.length < 3){
          setTitle(question.title)
        }

        try{
           const updatedQuestion = await dispatch(editQuestion(updatedQuestionDetails))

           if(updatedQuestion){
               setShowEditQuestion(false)
           }
        }catch(res){
          handleErrors(res)
        }
    }

      const handleCancelClick = (e) => {
        e.preventDefault();
        setShowEditQuestion(false);
      };

  return (
    <div className="editQuestionFormBox">
      <button
        onClick={() => setShowEditQuestion(true)}
        className="questionButtons"
      >
        <i className="fas fa-pen-alt"></i> Edit
      </button>

      {showEditQuestion && (
        <div className="editQuestionForm">
          <div className="editQuestionFormInner">
            <form className="editQuestionInputs" onSubmit={handleSubmit}>
              <div className="editQuestionTop">
                <button
                  onClick={() => setShowEditQuestion(false)}
                  className="xButton"
                >
                  <i className="fas fa-times"></i>
                </button>
                <h2>Edit Question</h2>
                {errors.length > 0 && (
                  <ul className="commentErrors">
                    {errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                )}
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="editQuestionButtons">
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="update-buttons2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="update-buttons"
                  disabled={question.title === title}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditQuestionForm;
