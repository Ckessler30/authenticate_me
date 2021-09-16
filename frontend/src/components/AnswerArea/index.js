import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CreateCommentForm from "../CreateComment";
import DeleteForm from "../DeletePopup";
import EditAnswerForm from "../EditAnswer";

import './answerArea.css'

const AnswerArea = ({ answer }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const { questionId } = useParams();
    const [showComments, setShowComments] = useState(false)



    return (
      <div className="answer" key={answer.id}>
        <h5>
          <i className="fas fa-user-tie" id="astro"></i>

          {answer.User?.username}
        </h5>
        <p>{answer.answerText}</p>
        <div
          className="questionImg"
          style={{
            backgroundImage: `url(${answer.answerImg}) `,
          }}
        >
          {/* <img src={answer.answerImg} alt="" /> */}
        </div>
        <p>{answer.votes}</p>
        <div className="bottomAnswerButtons">
          <div className="bottomAnswerButtonsLeft">
            <button className="questionButtons">
              <i className="fas fa-arrow-up"></i>
            </button>
            <button className="questionButtons">
              <i className="fas fa-arrow-down"></i>
            </button>
            <button className="questionButtons">
              <i className="fas fa-sync"></i>
            </button>
            <button className="questionButtons">
              <i className="fas fa-comment"></i>
            </button>
          </div>
          <div className="bottomAnswerButtonsRight">
            <button className="questionButtons">
              <i className="fas fa-share"></i>
            </button>
            {sessionUser?.id === answer.userId && (
              <DeleteForm answerId={answer.id} deleteType={"answer"} />
            )}
            {sessionUser?.id === answer.userId && (
              <EditAnswerForm answer={answer} />
            )}
          </div>
        </div>
        <CreateCommentForm answerId={answer.id} />
      </div>
    );
}


export default AnswerArea