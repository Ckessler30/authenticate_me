import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editAnswer } from "../../store/answers";

import './editAnswer.css'

const EditAnswerForm = ({ answer }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showEditAnswer, setShowEditAnswer] = useState(false);
  const [answerText, setAnswerText] = useState(answer.answerText);
  const [answerImg, setAnswerImg] = useState(answer.answerImg);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAnswerDetails = {
      answerText,
      answerId: answer.id,
      answerImg,
    };

    const updatedAnswer = await dispatch(editAnswer(updatedAnswerDetails));

    if (updatedAnswer) {
      setShowEditAnswer(false);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowEditAnswer(false);
  };
  return (
    <div className="editQuestionFormBox">
      <button onClick={() => setShowEditAnswer(true)} className="questionButtons">
        <i className="fas fa-pen-alt"></i>Edit
      </button>
      {showEditAnswer && (
        <div className="editQuestionForm">
          <div className="editQuestionFormInner">
            <form onSubmit={handleSubmit} className="editQuestionInputs">
              <div className="editQuestionTop">
                <button onClick={() => setShowEditAnswer(false)} className="xButton">
                  <i className="fas fa-times"></i>
                </button>
                <h2>Edit Answer</h2>
                <input
                  type="text"
                  value={answerImg}
                  onChange={(e) => setAnswerImg(e.target.value)}
                />
                <textarea
                  required
                  className ="editAnswerTextArea"
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                ></textarea>
              </div>
              <div className="editQuestionButtons">
                <button type="button" onClick={() => setShowEditAnswer(false)} className="update-buttons2">Cancel</button>
                <button type="submit" disabled={answer.answerText === answerText && answer.answerImg === answerImg} className="update-buttons">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAnswerForm;
