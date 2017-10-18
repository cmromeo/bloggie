import { combineReducers } from 'redux';
import { dataIsLoading, serverCommunicationError } from './common';
import { categories } from './categories';
import { posts, postSorterIndex, postsQuery, selectedPost } from './posts';

const rootReducer =  combineReducers({
    dataIsLoading,
    serverCommunicationError,
    categories,
    posts,
    postSorterIndex,
    selectedPost,
    postsQuery
});

export default rootReducer;