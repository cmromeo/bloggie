import { combineReducers } from 'redux';
import { dataIsLoading, serverCommunicationError } from './common';
import { categories } from './categories';
import { posts } from './posts';

const rootReducer =  combineReducers({
    dataIsLoading,
    serverCommunicationError,
    categories,
    posts
});

export default rootReducer;