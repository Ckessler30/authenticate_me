import { csrfFetch } from "./csrf";

const LOAD = "answers/LOAD"
const ADD = "answers/ADD"
const REMOVE = "answers/REMOVE"

const load = (answerList) => ({
    type: LOAD,
    answerList,
})

const createAnswer = (answer) => ({
    type: ADD,
    answer
})

const remove = (answerId) => ({
  type: REMOVE,
  answerId
})

export const editAnswer = (answerDetails) => async dispatch => {
  const { answerId, answerText, answerImg } = answerDetails
  const response = await csrfFetch(`/api/answers/${answerId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      answerId,
      answerImg,
      answerText
    })
  })
  if(response.ok){
    const udpatedAnswer = await response.json()
    dispatch(createAnswer(udpatedAnswer))
    return udpatedAnswer
  }
}

export const removeAnswer = (answerId) => async dispatch => {
  const response = await csrfFetch(`/api/answers/${answerId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      answerId
    })
  })

  if(response.ok){
    const removedAnswerId = await response.json()
    dispatch(remove(removedAnswerId))
    return removedAnswerId
  }
}

export const getAnswers = () => async dispatch => {
    const response = await fetch('/api/answers/')

    if(response.ok){
        const list = await response.json()
        dispatch(load(list))
    }
}

export const createNewAnswer = (answerDetails) => async dispatch => {
    const { userId, answerText, questionId, answerImg} = answerDetails
    const response = await csrfFetch("/api/answers/new", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            userId,
            answerText,
            questionId,
            answerImg
        })
    })

    const newAnswer = await response.json()
    dispatch(createAnswer(newAnswer))
    return newAnswer
}

const initialState = {}
const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allAnswers = {};
      action.answerList.forEach((answer) => {
        allAnswers[answer.id] = answer;
      });

      return {
        ...allAnswers,
        ...state,
        answerList: action.answerList,
      };
    }
    case ADD: {
      if(!state[action.answer.id]){
        let newState = { ...state, [action.answer.id]: action.answer}
        newState.answerList.push(action.answer)
        return newState
      }else{
        let updatedState = { ...state }
        updatedState[action.answer.id] = action.answer
        const newAnswerList = [...updatedState.answerList]
        const removeAnswer = newAnswerList.filter(answer=> answer.id === action.answer.id)[0]
        newAnswerList.splice(newAnswerList.findIndex(answer=> answer.id === removeAnswer.id), 1, action.answer)
        updatedState.answerList = newAnswerList
        return updatedState
      }
    }
    case REMOVE: {
      const deleteState = { ...state }
      const newAnswersList = [...deleteState.answerList]
      const removeAnswer = newAnswersList.filter(answer => answer.id === action.answerId)
      removeAnswer.forEach(answer => newAnswersList.splice(newAnswersList.findIndex(answer2 => answer2.id === answer.id), 1))
      delete deleteState[action.answerId]
      deleteState.answerList = newAnswersList
      return deleteState
    }
    default:
      return state;
  }
};


export default answerReducer