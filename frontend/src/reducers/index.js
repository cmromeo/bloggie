import { combineReducers } from 'redux';
import { dataIsLoading, serverCommunicationError } from './common';
import { categories, selectedCategory } from './categories';
import { posts, postSorterIndex, selectedPost, postsQuery } from './posts';
import { comments, selectedComment, commentsQuery } from './comments';

const rootReducer =  combineReducers({
    dataIsLoading,
    serverCommunicationError,
    postSorterIndex,
    categories,
    selectedCategory,
    posts,
    selectedPost,
    postsQuery,
    comments,
    selectedComment,
    commentsQuery
});

export default rootReducer;