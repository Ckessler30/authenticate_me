import { csrfFetch } from "./csrf";

const LOAD = "answers/LOAD"
const ADD = "answers/ADD"

const load = (answerList) => ({
    type: LOAD,
    answerList,
})

export const getAnswers = () => async dispatch => {
    const response = await fetch('/api/answers/')

    if(response.ok){
        const list = await response.json()
        dispatch(load(list))
    }
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
    default:
      return state;
  }
};


export default answerReducer