import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'
import './questionPage.css'

import { getQuestions } from "../../store/questions"
import { getAnswers } from "../../store/answers"
import CreateAnswerForm from "../CreateAnswer"
import CreateCommentForm from "../CreateComment"


function QuestionPage () {
    const dispatch = useDispatch()
    const [showAnswerForm, setShowAnswerForm] = useState(false)
    const [showComments, setShowComments] = useState(false)

    const {questionId} = useParams()
    const question = useSelector(state => {
        return state.questions[questionId]
        
    })
    const answers = useSelector(state => {
        const answers = []
        for(let id in state.answers.answerList){
            const answer = state.answers.answerList[id]
            if(answer.questionId === +questionId){
                answers.push(answer)
            }
        }
        return answers
    })
    console.log(answers)
    useEffect(() => {
      dispatch(getAnswers())  
      dispatch(getQuestions());
    }, [dispatch]);

    // console.log(question)

    return (
      <main>
        <div className="QandABox">
          <div className="questionArea">
            <h3>{question?.title}</h3>
            <div className="questionLinks">
              <div className="questionLinksLeft">
                <button onClick={() => setShowAnswerForm(true)}>
                  <i class="fas fa-edit"></i> Answer
                </button>
                <button>
                  <i class="fas fa-wifi"></i>
                  Follow
                </button>
                <button>
                  <i class="fas fa-user-astronaut"></i>Request
                </button>
              </div>
              <div className="questionLinksRight">
                <button>
                  <i class="fas fa-comment"></i>
                </button>
                <button>
                  <i class="fas fa-arrow-circle-down"></i>
                </button>
                <button>
                  <i class="fas fa-share"></i>
                </button>
              </div>
            </div>
            {showAnswerForm && (
              <CreateAnswerForm hideForm={() => setShowAnswerForm(false)} />
            )}
          </div>
          <div className="answerLengthBox">
            <h4>{answers.length} Answers</h4>
          </div>
          {answers &&
            answers.map((answer) => (
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
                  </div>
                </div>
                <div className="commentsSection">
                  <button onClick={() => setShowComments(!showComments)}>comments</button>
                  {showComments && 
                    <CreateCommentForm hideForm={() => setShowAnswerForm(false)} answerId={answer.id} />
                  }
                </div>
              </div>
            ))}
        </div>
      </main>
    );
}

export default QuestionPage