

export function posts (state = [], action) {
    
    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS':
            return action.posts;
        case 'ADD_POST_SUCCESS':
            return [action.post, ...state.filter((onePost) => {
                return onePost.id !== action.post.id;
            })];
        case 'UPDATE_POST_SUCCESS':
            return [...state.filter((onePost) => {
                return onePost.id !== action.post.id;
            }), action.post];
        case 'VOTE_POST_SUCCESS':
            return [...state.filter((onePost) => {
                return onePost.id !== action.post.id;
            }), action.post];
        default:
            return state;
    }
}

export function postSorterIndex (state = 0, action) {
    switch (action.type) {
        case 'POST_SORTER_INDEX':
            return action.sorterIndex;

        default:
            return state;
    }
}

export function selectedPost (state = null, action) {
    switch (action.type) {
        case 'SELECTED_POST':
            return action.post;
        case 'UPDATE_SELECTED_POST':
            return action.post;
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

