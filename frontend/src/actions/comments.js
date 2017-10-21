import {
    baseURL, 
    indicateServerCommunicationAction,
    errorCommunicatingWithServerAction
} from './common';

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const SELECTED_COMMENT = 'SELECTED_COMMENT';
export const UPDATE_SELECTED_COMMENT = 'UPDATE_SELECTED_COMMENT';
export const QUERY_COMMENTS = 'QUERY_COMMENTS';

export function fetchCommentsSuccessAction(comments) {
    return {
        type: FETCH_COMMENTS_SUCCESS,
        comments
    };
}

export function fetchComments(postId) {
    const url = `${baseURL}/posts/${postId}/comments`;
    return (dispatch) => {
        dispatch(indicateServerCommunicationAction(true));
        fetch(url, { "headers": { "Authorization": "temporarily-whatever" }})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(indicateServerCommunicationAction(false));
                return response;
            })
            .then((response) => response.json())
            .then((comments) => {
                    dispatch(fetchCommentsSuccessAction(comments))
                }
            )
            .catch((error) => dispatch(errorCommunicatingWithServerAction(error, "Error while downloading comments. ", error)));
    };
}

export function addComment (newComment) {
    const url = `${baseURL}/comments`;
    return (dispatch) => {
        dispatch(indicateServerCommunicationAction(true));
        fetch(
            url, 
            {
                method: 'POST',
                headers: {
                    "Authorization": "temporarily-whatever",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newComment)
            }
        )
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(indicateServerCommunicationAction(false));
            return response;
        })
        .then((response) => response.json())
        .then((comment) => dispatch(addCommentSuccessAction(comment)))
        .catch((error) => dispatch(errorCommunicatingWithServerAction(error, "Error while adding a comment.")));
    };
}

export function addCommentSuccessAction(comment) {
    return {
        type: ADD_COMMENT_SUCCESS,
        comment
    };
}

export function deleteComment (commentId) {
    const url = `${baseURL}/comments/${commentId}`;
    return (dispatch) => {
        dispatch(indicateServerCommunicationAction(true));
        fetch(
            url, 
            {
                method: 'DELETE',
                headers: {
                    "Authorization": "temporarily-whatever",
                }
            }
        )
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(indicateServerCommunicationAction(false));
            return response;
        })
        .then((response) => response.json())
        .then(() => dispatch(removeCommentSuccessAction(commentId)))
        .catch((error) => dispatch(errorCommunicatingWithServerAction(error, "Error while deleting a comment.")));
    };
}

export function removeCommentSuccessAction ( commentId ) {
  return {
        type: REMOVE_COMMENT_SUCCESS,
        commentId
    }
}


export function updateComment (updatedComment, commentId) {
    const url = `${baseURL}/comments/${commentId}`;
    return (dispatch) => {
        dispatch(indicateServerCommunicationAction(true));
        fetch(
            url, 
            {
                method: 'PUT',
                headers: {
                    "Authorization": "temporarily-whatever",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedComment)
            }
        )
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(indicateServerCommunicationAction(false));
            return response;
        })
        .then((response) => response.json())
        .then((comment) => {
                dispatch(updateCommentSuccessAction(comment));
                dispatch(updateSelectedComment(comment));
            }
        )
        .catch((error) => dispatch(errorCommunicatingWithServerAction(error, "Error while editing a comment.")));
    };
}

export function updateCommentSuccessAction(comment) {
    return {
        type: UPDATE_COMMENT_SUCCESS,
        comment
    };
}


export function voteComment (commentId, voteType) {

    const url = `${baseURL}/comments/${commentId}`;
    return (dispatch) => {
        dispatch(indicateServerCommunicationAction(true));
        fetch(
            url, 
            {
                method: 'POST',
                headers: {
                    "Authorization": "temporarily-whatever",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "option": voteType })
            }
        )
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(indicateServerCommunicationAction(false));
            return response;
        })
        .then((response) => response.json())
        .then((comment) => {
                dispatch(voteCommentSuccessAction(comment))
                dispatch(updateSelectedComment(comment));
            }
        )
        .catch((error) => dispatch(errorCommunicatingWithServerAction(error, "Error while voting for a comment.")));
    };
}

export function voteCommentSuccessAction(comment) {
    return {
        type: VOTE_COMMENT_SUCCESS,
        comment
    };
}


export function selectComment(comment) {
    return {
        type: SELECTED_COMMENT,
        comment
    };
}

export function updateSelectedComment(comment) {
    return {
        type: UPDATE_SELECTED_COMMENT,
        comment
    };
}

export function queryComments(query) {
    return {
        type: QUERY_COMMENTS,
        query
    };
}