import {
    baseURL, 
    indicateServerCommunicationAction,
    errorCommunicatingWithServerAction
} from './common';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const QUERY_POSTS = 'QUERY_POSTS';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const SELECTED_POST = 'SELECTED_POST';
export const UPDATE_SELECTED_POST = 'UPDATE_SELECTED_POST';
export const POST_SORTER_INDEX = 'POST_SORTER_INDEX';

export function fetchPostsSuccessAction(posts) {
    return {
        type: FETCH_POSTS_SUCCESS,
        posts
    };
}

export function fetchPosts() {
    const url = `${baseURL}/posts`;
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
            .then((posts) => {
                    dispatch(fetchPostsSuccessAction(posts))
                }
            )
            .catch((error) => dispatch(errorCommunicatingWithServerAction(error, "Error while downloading posts. ", error)));
    };
}

export function queryPosts(query) {
    return {
        type: QUERY_POSTS,
        query
    };
}

export function selectPost(post) {
    return {
        type: SELECTED_POST,
        post
    };
}

export function updateSelectedPost(post) {
    return {
        type: UPDATE_SELECTED_POST,
        post
    };
}

export function addPost (newPost) {
    const url = `${baseURL}/posts`;
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
                body: JSON.stringify(newPost)
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
        .then((post) => dispatch(addPostSuccessAction(post)))
        .catch((error) => dispatch(errorCommunicatingWithServerAction(error, "Error while adding a post.")));
    };
}

export function addPostSuccessAction(post) {
    return {
        type: ADD_POST_SUCCESS,
        post
    };
}

export function updatePost (updatedPost, postId) {
    const url = `${baseURL}/posts/${postId}`;
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
                body: JSON.stringify(updatedPost)
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
        .then((post) => {
                dispatch(updatePostSuccessAction(post));
                dispatch(updateSelectedPost(post));
            }
        )
        .catch((error) => dispatch(errorCommunicatingWithServerAction(error, "Error while editing a post.")));
    };
}

export function updatePostSuccessAction(post) {
    return {
        type: UPDATE_POST_SUCCESS,
        post
    };
}

export function postSorterIndex(sorterIndex) {
    return {
        type: POST_SORTER_INDEX,
        sorterIndex
    };
}


