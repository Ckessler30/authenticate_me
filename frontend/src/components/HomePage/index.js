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
          <div className="leftHomeBar">
            <div className="spaces">
              <div className="createSpaceButton">
                {/* <i className="far fa-plus-square"></i> */}
                Spaces
              </div>
              <button className="spaceButtons">
                <div
                  className="spacesLogos"
                  style={{
                    backgroundImage: `url(https://sports.cbsimg.net/fly/images/nfl/logos/team/light/433.svg) `,
                  }}
                ></div>
                Washington Football Team
              </button>
              <button className="spaceButtons">
                <div
                  className="spacesLogos"
                  style={{
                    backgroundImage: `url(data:image/png;base64,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) `,
                  }}
                ></div>
                Star Wars
              </button>
              <button className="spaceButtons">
                <div
                  className="spacesLogos"
                  style={{
                    backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1200px-Marvel_Logo.svg.png) `,
                  }}
                ></div>
                Marvel
              </button>
              <button className="spaceButtons">
                <div
                  className="spacesLogos"
                  style={{
                    backgroundImage: `url(https://wallpaperaccess.com/full/2216462.jpg) `,
                  }}
                ></div>
                SpaceX
              </button>
              <button className="spaceButtons">
                <div
                  className="spacesLogos"
                  style={{
                    backgroundImage: `url(https://www.kindpng.com/picc/m/410-4105079_decent-memes-png-logo-harry-potter-starbucks-transparent.png) `,
                  }}
                ></div>
                Memes
              </button>
            </div>
          </div>
          <div className="mainHomeBar">
            {sessionUser && (
              <div className="questionButton">
                <button onClick={() => setShowForm(true)}>
                  <div className="questionProfile">
                    <i className="far fa-user-circle"></i>

                    {" " + sessionUser?.username}
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

                          {" " + question?.User?.username}
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
                    {/* <div className="questionFootButtonsLeft">
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
                    </div> */}
                    <div className="questionFootButtonsRight">
                      {/* <button className="questionButtons">
                        <i className="fas fa-share"></i>
                      </button> */}

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
            <div className="leftSideGit">
              <a href="https://github.com/Ckessler30" target="_blank" className="gitHubChase">
                <div className="gitHubPic2"></div>
                GitHub
              </a>
            </div>
            <div className="leftSideGit">
              <a
                href="https://www.linkedin.com/in/chase-kessler-97a135221/"
                target="_blank"
                className="gitHubChase"
              >
                <div className="linkedInPic"></div>
                LinkedIn
              </a>
            </div>
            {/* <div className="improveFeed">
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
            </div> */}
          </div>
        </div>
      </main>
    );

}

export default HomePage