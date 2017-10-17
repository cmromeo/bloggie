import {
    baseURL, 
    indicateServerCommunicationAction,
    errorCommunicatingWithServerAction
} from './common';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const QUERY_POSTS = 'QUERY_POSTS';


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



