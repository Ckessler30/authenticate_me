import { csrfFetch } from "./csrf";

const LOAD = "answers/LOAD"
const ADD = "answers/ADD"

const load = (list) => ({
    type: LOAD,
    list,
})

export const getAnswers = () => async dispatch => {
    const response = await fetch()
}

const initialState = {}
const answerReducer = ( state=initalState , action ) => {
    switch (action.type) {
        default:
            return this.state.
    }

}


export default answerReducer