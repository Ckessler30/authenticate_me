import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewQuestion } from "../../store/questions";

import './newQuestion.css'

const CreateQuestionForm = ({ hideForm }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState('')
    const [questionText, setQuestionText] = useState('')
    const [questionImg, setQuestionImg] = useState("https://cdn.vox-cdn.com/thumbor/HWPOwK-35K4Zkh3_t5Djz8od-jE=/0x86:1192x710/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg");
    console.log(sessionUser)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const questionDetails = {
            userId: sessionUser.id,
            title,
            questionText,
            questionImg
        }

        let createdQuestion = await dispatch(createNewQuestion(questionDetails))
        if(createdQuestion){
            //need to update this before final
            history.push('/')
            hideForm()
        }
    }
        const handleCancelClick = (e) => {
            e.preventDefault()
            hideForm()
        }

        return hideForm ? (
          <div className="createNewQuestion">
            <div className="createNewQuestionInner">
              <form onSubmit={handleSubmit} className="createQuestionInputs">
                <input
                  type="text"
                  placeholder="Question Title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Question?"
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Wanna put an image in?"
                  required
                  value={questionImg}
                  onChange={(e) => setQuestionImg(e.target.value)}
                />
                <button type="submit">Post your question</button>
                <button type="button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        ) : (
          ""
        );
    }


export default CreateQuestionForm