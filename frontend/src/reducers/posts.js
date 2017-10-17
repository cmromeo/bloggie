export function posts (state = [], action) {
    
    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS':
            return action.posts;
        default:
            return state;
    }
}

export function postsQuery (state = null, action) {
    switch (action.type) {
        case 'QUERY_POSTS':
            return action.query;
        default:
            return state;
    }
}