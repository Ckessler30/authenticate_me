import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getQuestions } from "../../store/questions";
import './HomePage.css'


import CreateQuestionForm from "../CreateQuestion";
import DeleteForm from "../DeletePopup";
import EditQuestionForm from "../EditQuestionForm";

function HomePage () {
    const dispatch = useDispatch()
    const data = useParams()
    const sessionUser = useSelector((state) => state.session.user);
    const questions = useSelector(state => {
      // console.log("STATE", state)
        return state.questions.list
    })
    // console.log("USER", sessionUser)

    const [showForm, setShowForm] = useState(false)
   


    // console.log("TARGET", questions[0].User)
   

    useEffect(() => {
        dispatch(getQuestions())
    },[dispatch])

    if(!questions){
        // console.log('NONE')
        return null
    }

    return (
      <main>
        <div className="mainHome">
          <div className="leftHomeBar">Left</div>
          <div className="mainHomeBar">
            {sessionUser && (
              <div className="questionButton">
                <button onClick={() => setShowForm(true)}>
                  <div className="questionProfile">
                    <i className="far fa-user-circle"></i>

                    {" "+sessionUser.username}
                  </div>
                  <h3>What is your question or link</h3>
                </button>
                {showForm && (
                  <CreateQuestionForm hideForm={() => setShowForm(false)} />
                )}
              </div>
            )}
            {questions.map((question) => {
              // console.log("questions", questions)
              const dateParts = question.createdAt.split("-");
              const day = dateParts[2].split("T")[0];
              // console.log(dateParts)
              // console.log(day)
              const newDate = new Date(dateParts[0], dateParts[1] - 1, day);
              let finalDate = newDate
                .toDateString()
                .split(" ")[1]
                .concat(newDate.toDateString().split(" ")[2]);

              // console.log(finalDate)

              return (
                <div className="questionBox" key={question.id}>
                  <NavLink key={question.id} to={`/questions/${question.id}`}>
                    <div className="questionHeader">
                      <div className="questionUser">
                        <h3>
                          <i className="fas fa-user-astronaut" id="astro"></i>

                          {" "+question?.User?.username}
                        </h3>
                        <p>{finalDate ? finalDate : "now"}</p>
                      </div>
                      <h3 className="questionTitle">{question.title}</h3>
                      <p className="questionText">{question.questionText}</p>
                    </div>
                    <div
                      className="questionImg"
                      style={{
                        backgroundImage: `url(${question.questionImg}) `,
                      }}
                    >
                      {/* <img src={question.questionImg} alt="" /> */}
                    </div>
                  </NavLink>
                  <div className="questionFooter">
                    <div className="questionFootButtonsLeft">
                      <button className="questionButtons">
                        <i className="fas fa-arrow-alt-circle-up"></i>

                        {question.votes}
                      </button>
                      <button className="questionButtons">
                        <i className="fas fa-arrow-down"></i>
                      </button>
                      <button className="questionButtons">
                        <i className="fas fa-sync-alt"></i>
                      </button>
                      <button className="questionButtons">
                        <i class="fas fa-comment"></i>
                      </button>
                    </div>
                    <div className="questionFootButtonsRight">
                      <button className="questionButtons">
                        <i className="fas fa-share"></i>
                      </button>

                      {sessionUser?.id === +question.userId && (
                        <DeleteForm
                          questionId={question.id}
                          deleteType={"question"}
                        />
                      )}
                      {sessionUser?.id === +question.userId && (
                        <EditQuestionForm question={question} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="rightHomeBar">
            <div className="improveFeed">
              <div className="improveFeedHead">
                <h3>Improve your feed</h3>
              </div>
              <ul className="improveFeedList">
                <li className="improveListItems">
                  <input type="checkbox" /> Visit your feed
                </li>
                <li className="improveListItems">
                  <input type="checkbox" /> Follow 5 more Spaces
                </li>
                <li className="improveListItems">
                  <input type="checkbox" /> Upvote 4 more good pieces of content
                </li>
                <li className="improveListItems">
                  <input type="checkbox" /> Ask a question
                </li>
                <li className="improveListItems">
                  <input type="checkbox" /> Add 3 credentials about where you
                  live, work or study
                </li>
                <li className="improveListItems">
                  <input type="checkbox" /> Answer a question
                </li>
              </ul>
            </div>
            <div className="spaceToFollow">
              <div className="spaceToFollowHead">
                <h3>Spaces to follow</h3>
              </div>
              <ul className="stfList">
                <li className="stfListItems">
                  <h4>Seo And Digital Marketing</h4>
                  <p>Share And Discuss Everything Seo and Digital Marketing</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    );

}

export default HomePage