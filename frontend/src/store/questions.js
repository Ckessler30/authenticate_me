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
   console.log(JSON.stringify({ userId, title, questionText, questionImg }));
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
    // console.log(response.body)
    // console.log('ABOUT TO HIT RESPONSE')
    const newQuestion = await response.json();
    // console.log('NEW QUESTION',newQuestion)
    dispatch(createQuestion(newQuestion));
    return newQuestion;
  
};

const initalState = {  };

const questionReducer = (state = initalState, action) => {
//   let newState;
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
            let newState = {...state, [action.question.id]: action.question}
            // newState.list = newStateList
            //  console.log("HERERERER", newState)
            
            // const questionList = []
            // for(let id in newState){
            //     const question = newState[id]
            //     // console.log("Anotha one",question)
            //     questionList.push(question)
            // }
            // // questionList.push(action.question)
            // newState.list = questionList
            newState.list.push(action.question)
            // console.log("MAYBE????", newState)
            return newState
        
    }
    default:
      return state;
  }
};

export default questionReducer;
