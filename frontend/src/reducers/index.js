import { combineReducers } from 'redux';
import { dataIsLoading, serverCommunicationError } from './common';
import { categories, selectedCategory } from './categories';
import { posts, postSorterIndex, selectedPost, postsQuery } from './posts';


const rootReducer =  combineReducers({
    dataIsLoading,
    serverCommunicationError,
    postSorterIndex,
    categories,
    posts,
    selectedPost,
    selectedCategory, 
    postsQuery,
});

export default rootReducer;