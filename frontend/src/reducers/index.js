import { combineReducers } from 'redux';
import { dataIsLoading, serverCommunicationError } from './common';
import { categories } from './categories';


const rootReducer =  combineReducers({
    dataIsLoading,
    serverCommunicationError,
    categories,
});

export default rootReducer;