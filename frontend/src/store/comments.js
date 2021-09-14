import { csrfFetch } from "./csrf";

const LOAD = "comments/LOAD"
const ADD = "comments/ADD"
const REMOVE = "comments/REMOVE"

const load = (commentsList) => ({
    type: LOAD,
    commentsList
})

const createComment = (comment) => ({
    type: ADD,
    comment
})

const remove = (commentId) => ({
    type: REMOVE,
    commentId
})

export const removeComment = (commentId) => async dispatch => {
    
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            commentId
        })
    })

    if(response.ok){
        const commentId2 = response.json()
        dispatch(remove(commentId2))
        // console.log(data)
    }
}

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
        case REMOVE: {
            const newState = {}
            delete newState[action.commentId]
            return newState
        }
        default:
            return state
    }
}

export default commentReducer