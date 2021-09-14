import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createNewAnswer } from "../../store/answers";



import "./newAnswer.css";

const CreateAnswerForm = ({ hideForm }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { questionId } = useParams()
  const [answerText, setAnswerText] = useState("");
  
  // console.log(sessionUser)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const answerDetails = {
      userId: sessionUser.id,
      answerText,
      questionId
    };

    const createdAnswer = await dispatch(createNewAnswer(answerDetails));
    if (createdAnswer) {
      //need to update this before final
      // history.push('/')
      hideForm();
    }
  };
  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return hideForm ? (
    <div className="createNewAnswer">
      <div className="createNewAnswerInner">
        <form onSubmit={handleSubmit} className="createAnswerInputs">
          <input
            type="text"
            placeholder="Write your answer"
            required
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
          <button type="submit">Submit</button>
          <button type="button">Save Draft</button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CreateAnswerForm;
