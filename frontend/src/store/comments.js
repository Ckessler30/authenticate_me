import { csrfFetch } from "./csrf";

const LOAD = "comments/LOAD"
const ADD = "comments/ADD"

const load = (commentsList) => ({
    type: LOAD,
    commentsList
})

const createComment = (comment) => ({
    type: ADD,
    comment
})

export const getComments = () => async dispatch => {
    const response = await fetch('/api/comments/')
    if(response.ok){
        const list = await response.json()
        dispatch(load(list))
    }
}

export const createNewComment = (commentDetails) => async dispatch => {
    const { userId, commentText, answerId } = commentDetails
    const response = await csrfFetch("/api/comments/new", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            userId,
            commentText,
            answerId
        })
    })

    const newComment = await response.json()
    dispatch(createComment(newComment))
    return newComment
}


const initialState = {}
const commentReducer = (state=initialState, action) => {
    switch(action.type){
        case LOAD: {
            const allComments = {}
            action.commentsList.forEach(comment => {
                allComments[comment.id] = comment
            })

            return {
                ...allComments,
                ...state,
                commentsList: action.commentsList
            }
        }
        default:
            return state
    }
}

export default commentReducer