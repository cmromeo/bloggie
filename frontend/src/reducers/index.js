import { combineReducers } from 'redux';
import { dataIsLoading, serverCommunicationError } from './common';
import { categories } from './categories';
import { posts, postsQuery } from './posts';

const rootReducer =  combineReducers({
    dataIsLoading,
    serverCommunicationError,
    categories,
    posts,
    postsQuery
});

export default rootReducer;