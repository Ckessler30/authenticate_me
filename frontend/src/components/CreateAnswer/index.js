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
  const [answerImg, setAnswerImg] = useState("")
  const [errors, setErrors] = useState([]);
  
  // console.log(sessionUser)
  
  const handleErrors = async (res) => {
    const data = await res.json();
    if (data && data.errors) setErrors(data.errors);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const answerDetails = {
      userId: sessionUser.id,
      answerText,
      questionId,
      answerImg
    };
    try{
      const createdAnswer = await dispatch(createNewAnswer(answerDetails));
      if (createdAnswer) {
        //need to update this before final
        // history.push('/')
        hideForm();
      }
      
    }catch(res){
      handleErrors(res)
    }
  };
  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return hideForm && sessionUser ? (
    <div className="createNewAnswer">
      <div className="createNewAnswerInner">
        <div className="answerProfileHead">
          <i className="fas fa-user-secret"></i>
          <h3>{sessionUser.username}</h3>
        </div>
        <form onSubmit={handleSubmit} className="createAnswerInputs">
          {errors.length > 0 && (
            <ul className="commentErrors">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          )}
          <input
            type="text"
            placeholder="Image URL"
            value={answerImg}
            onChange={(e) => setAnswerImg(e.target.value)}
          />
          <textarea
            placeholder="Write your answer"
            required
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />

          <div className="answerButtons">
            <button type="submit" className="addAnswerButtons">
              Submit
            </button>
            <button type="button" className="addAnswerButton1">
              Save Draft
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="addAnswerButton1"
            >
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

export default CreateAnswerForm;
