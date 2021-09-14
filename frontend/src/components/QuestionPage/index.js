import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'
import './questionPage.css'

import { getQuestions } from "../../store/questions"
import { getAnswers } from "../../store/answers"
import CreateAnswerForm from "../CreateAnswer"


function QuestionPage () {
    const dispatch = useDispatch()
    const [showAnswerForm, setShowAnswerForm] = useState(false)

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
              {showAnswerForm && (
                <CreateAnswerForm hideForm={() => setShowAnswerForm(false)} />
              )}
            </div>
          </div>
          <div className="answerLengthBox">
            <h4>{answers.length} Answers</h4>
          </div>
          {answers &&
            answers.map((answer) => (
              <div className="answer" key={answer.id}>
                <h5>
                  <i class="fas fa-user-circle"></i>

                  {answer.User?.username}
                </h5>
                <p>{answer.answerText}</p>
                <p>{answer.votes}</p>
              </div>
            ))}
        </div>
      </main>
    );
}

export default QuestionPage