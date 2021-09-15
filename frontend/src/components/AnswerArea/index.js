import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CreateCommentForm from "../CreateComment";


const AnswerArea = ({ answer }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const { questionId } = useParams();
    const [showComments, setShowComments] = useState(false)



    return (
      <div className="answer" key={answer.id}>
        <h5>
          <i className="fas fa-user-circle"></i>

          {answer.User?.username}
        </h5>
        <p>{answer.answerText}</p>
        <div className="answerImg">
          <img src={answer.answerImg} alt="" />
        </div>
        <p>{answer.votes}</p>
        <div className="bottomAnswerButtons">
          <div className="bottomAnswerButtonsLeft">
            <button>
              <i className="fas fa-arrow-up"></i>
            </button>
            <button>
              <i className="fas fa-arrow-down"></i>
            </button>
            <button>
              <i className="fas fa-sync"></i>
            </button>
            <button>
              <i className="fas fa-comment"></i>
            </button>
          </div>
          <div className="bottomAnswerButtonsRight">
            <button>
              <i className="fas fa-share"></i>
            </button>
            {sessionUser?.id === answer.userId ? <button> </button> : ""}
          </div>
        </div>
        <CreateCommentForm answerId={answer.id} />
        {/* <div className="commentsSection">
          <button onClick={() => setShowComments(!showComments)}>
            comments
          </button>
          {showComments && (
            <CreateCommentForm
              hideForm={() => setShowComments(false)}
              answerId={answer.id}
            />
          )}
        </div> */}
      </div>
    );
}


export default AnswerArea