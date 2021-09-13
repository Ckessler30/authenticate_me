
const LOAD = 'questions/LOAD'

const load = list => ({
    type: LOAD,
    list
})

export const getQuestions = () => async dispatch => {
    const response = await fetch(`/api/`)

    if(response.ok){
        const list = await response.json()
        dispatch(load(list))
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