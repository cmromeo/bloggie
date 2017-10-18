import { combineReducers } from 'redux';
import { dataIsLoading, serverCommunicationError } from './common';
import { categories } from './categories';
import { posts, postsQuery, selectedPost } from './posts';

const rootReducer =  combineReducers({
    dataIsLoading,
    serverCommunicationError,
    categories,
    posts,
    selectedPost,
    postsQuery
});

export default rootReducer;