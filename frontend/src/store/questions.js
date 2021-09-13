
const LOAD = 'questions/LOAD'
const ADD = 'questions/ADD'

const load = list => ({
    type: LOAD,
    list
})

const createQuestion = question => ({
    type: ADD,
    question
})

export const getQuestions = () => async dispatch => {
    const response = await fetch(`/api/`)

    if(response.ok){
        const list = await response.json()
        dispatch(load(list))
    }
}

export const createNewQuestion = (questionDetails) => async dispatch => {
    const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(questionDetails)
    })

    if(response.ok){
        const newQuestion = await response.json()
        dispatch(createQuestion(newQuestion))
        return newQuestion
    }
}



const initalState = { list: []}

const questionReducer = (state=initalState, action) => {
    let newState;
    switch(action.type){
        case LOAD: {
            const allQuestions = {}
            action.list.forEach(question => {
                allQuestions[question.id] = question
            })
            return {
                ...allQuestions,
                ...state,
                list: action.list
            }
        }
        default:
            return state
    }
}


export default questionReducer