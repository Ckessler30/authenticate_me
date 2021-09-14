import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import './questionPage.css'

import { getQuestions } from "../../store/questions"

function QuestionPage () {
    const dispatch = useDispatch()

    const {questionId} = useParams()
    const question = useSelector(state => {
        return state.questions[questionId]
        
    })

    useEffect(() => {
      dispatch(getQuestions());
    }, [dispatch]);

    console.log(question)

    return(
        <main>
            <div className="QandABox">


            </div>

        </main>
    )
}

export default QuestionPage