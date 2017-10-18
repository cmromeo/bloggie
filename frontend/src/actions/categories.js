import {
    baseURL, 
    indicateServerCommunicationAction,
    errorCommunicatingWithServerAction
} from './common';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const SELECTED_CATEGORY = 'SELECTED_CATEGORY';
export const UPDATE_SELECTED_CATEGORY = 'UPDATE_SELECTED_CATEGORY';

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

export function selectCategory(category) {
    console.log("selectCategory action: ", category);
    return {
        type: SELECTED_CATEGORY,
        category
    };
}

export function updateSelectedCategory(category) {
    console.log("updateSelectedCategory action: ", category);
    return {
        type: UPDATE_SELECTED_CATEGORY,
        category
    };
}