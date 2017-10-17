

export function categories (state = [], action) {
    switch (action.type) {
        case 'FETCH_CATEGORIES_SUCCESS':
            return action.categories;

        default:
            return state;
    }
}

export function selectedCategory (state = null, action) {
    switch (action.type) {
        case 'SELECTED_CATEGORY':
            return action.category;
        case 'UPDATE_SELECTED_CATEGORY':
            return action.category;
        default:
            return state;
    }
}