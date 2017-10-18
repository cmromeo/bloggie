

export function comments (state = [], action) {
    
    switch (action.type) {
        case 'FETCH_COMMENTS_SUCCESS':
            return action.comments;
        case 'ADD_COMMENT_SUCCESS':
            return [action.comment, ...state.filter((oneComment) => {
                return oneComment.id !== action.comment.id;
            })];
        case 'REMOVE_COMMENT_SUCCESS':
            return [...state.filter((oneComment) => {
                return oneComment.id !== action.commentId;
            })];
        case 'UPDATE_COMMENT_SUCCESS':
            return [...state.filter((oneComment) => {
                return oneComment.id !== action.comment.id;
            }), action.comment];
        case 'VOTE_COMMENT_SUCCESS':
            return [...state.filter((oneComment) => {
                return oneComment.id !== action.comment.id;
            }), action.comment];
        default:
            return state;
    }
}


export function selectedComment (state = null, action) {
    switch (action.type) {
        case 'SELECTED_COMMENT':
            return action.comment;
        case 'UPDATE_SELECTED_COMMENT':
            return action.comment;
        default:
            return state;
    }
}

export function commentsQuery (state = null, action) {
    switch (action.type) {
        case 'QUERY_COMMENTS':
            return action.query;
        default:
            return state;
    }
}
