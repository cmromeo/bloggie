import {
    baseURL, 
    indicateServerCommunicationAction,
    errorCommunicatingWithServerAction
} from './common';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export function fetchCategoriesSuccessAction(categories) {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        categories
    };
}

export function fetchCategories() {
    const url = `${baseURL}/categories`;
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
            .then((data) => {
                    dispatch(fetchCategoriesSuccessAction(data.categories))
                }
            )
            .catch((error) => dispatch(errorCommunicatingWithServerAction(error, "Error while downloading categories.")));
    };
}