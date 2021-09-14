import { csrfFetch } from "./csrf";

const LOAD = "questions/LOAD";
const ADD = "questions/ADD";

const load = (list) => ({
  type: LOAD,
  list,
});

const createQuestion = (question) => ({
  type: ADD,
  question,
});

export const getQuestions = () => async (dispatch) => {
  const response = await fetch(`/api/`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const createNewQuestion = (questionDetails) => async (dispatch) => {
   const { userId, title, questionText, questionImg} = questionDetails
  const response = await csrfFetch("/api/questions/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        userId,
        title,
        questionText,
        questionImg
    }),
  });
  

  
    const newQuestion = await response.json();
    console.log('NEW QUESTION',newQuestion)
    dispatch(createQuestion(newQuestion));
    return newQuestion;
  
};

const initalState = { list: [] };

const questionReducer = (state = initalState, action) => {
  let newState;
  switch (action.type) {
    case LOAD: {
      const allQuestions = {};
      action.list.forEach((question) => {
        allQuestions[question.id] = question;
      });

      return {
        ...allQuestions,
        ...state,
        list: action.list,
      };
    }
    case ADD: {
       
            const newState = {
                ...state,
                [action.question.id]: action.question
            }
            const questionList = newState.list.map(id => newState[id])
            questionList.push(action.question)
            newState.list = questionList
            return newState
        
    }
    default:
      return state;
  }
};

export default questionReducer;
