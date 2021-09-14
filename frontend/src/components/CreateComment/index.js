import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import "./newComment.css";

const CreateCommentForm = ({ hideForm }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { questionId } = useParams();
  const [commentText, setCommentText] = useState("");

  // console.log(sessionUser)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const answerDetails = {
      userId: sessionUser.id,
      answerText,
      commentText,
    };

    const createdAnswer = await dispatch((answerDetails));
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
        <div className="answerProfileHead">
          <i class="fas fa-user-secret"></i>
          <h3>{sessionUser.username}</h3>
        </div>
        <form onSubmit={handleSubmit} className="createAnswerInputs">
          <textarea
            placeholder="Write your answer"
            required
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
          <div className="answerButtons">
            <button type="submit">Submit</button>
            <button type="button">Save Draft</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CreateCommentForm;
