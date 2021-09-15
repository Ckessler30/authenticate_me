import { csrfFetch } from "./csrf";

const LOAD = "questions/LOAD";
const ADD = "questions/ADD";
const REMOVE = "questions/REMOVE";

const load = (list) => ({
  type: LOAD,
  list,
});

const createQuestion = (question) => ({
  type: ADD,
  question,
});

const remove = (questionId) => ({
  type: REMOVE,
  questionId,
});

export const removeQuestion = (questionId) => async dispatch => {
  const response = await csrfFetch(`/api/questions/${questionId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      questionId
    })
  })

  if(response.ok){
    const removedQuestionId = await response.json()
    dispatch(remove(removedQuestionId))
    return removedQuestionId
  }
}

export const getQuestions = () => async (dispatch) => {
  const response = await fetch(`/api/`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const createNewQuestion = (questionDetails) => async (dispatch) => {
   const { userId, title, questionText, questionImg} = questionDetails
  //  console.log(JSON.stringify({ userId, title, questionText, questionImg }));
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
    case REMOVE: {
      const deleteState = {  ...state }
      const newQuestionsList = [...deleteState.list]
      const removeQuestion = newQuestionsList.filter(question => question.id === action.questionId)
      removeQuestion.forEach(question => newQuestionsList.splice(newQuestionsList.findIndex(question2 => question2.id === question.id), 1))
      delete deleteState[action.questionId]
      deleteState.list = newQuestionsList
      return deleteState
    }
    default:
      return state;
  }
};

export default questionReducer;
