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
        const commentId2 = await response.json()
        dispatch(remove(commentId2))
        // console.log(data)
        return commentId2
    }
}

export const getComments = (answerId) => async dispatch => {
    // console.log("JJJJJJJ",answerId)
    const response = await fetch(`/api/comments/${answerId}`)
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
                // console.log("LOOK HERE", action.commentsList)
            return {
                ...allComments,
                ...state,
                commentsList: action.commentsList
            }
        }
        case REMOVE: {
            const newState = {...state}
            // console.log("HEREE",newState.commentsList)
            const newCommentsList = [...newState.commentsList]
            const removeComment = newCommentsList.filter(comment =>  comment.id === action.commentId)
            removeComment.forEach(comment => newCommentsList.splice(newCommentsList.findIndex(comment2 => comment2.id === comment.id), 1))
            // console.log("HERE2", newCommentsList)
            delete newState[action.commentId]
            newState.commentsList = newCommentsList
            return newState
        }
        case ADD: {
            const newestState = { ...state, [action.comment.id]: action.comment}
            newestState.commentsList.push(action.comment)
            return newestState
        }
        default:
            return state
    }
}

export default commentReducer