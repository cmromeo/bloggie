import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {
    Col,
} from 'react-bootstrap';

import Categories from './Categories';
import Post from './Post';
import Sorter from './Sorter';
import sortBy from 'sort-by';
import SORTED_BY from './utils/Constants';
import Search from './Search';
import AddPostLink from './AddPostLink';
import color from './utils/ColorTools';
import {fetchPosts, selectPost} from './actions/posts';
import { connect } from 'react-redux';


class Posts extends Component {
    /**
    * @description Sorts posts dynamically
    */
    sortPosts(){
        const {postSorterIndex} = this.props;

        let sorterKey;
        if (SORTED_BY[postSorterIndex].type === 'desc'){
            sorterKey = `${"-"}${SORTED_BY[postSorterIndex].key}`
        }else{
            sorterKey = SORTED_BY[postSorterIndex].key
        }
        this.props.posts.sort(sortBy(sorterKey));
    }


    componentWillMount(){
        this.props.fetchPosts();
    }

    componentDidMount(){
        this.props.selectPost(null);
    }

    /**
    * @description Filter posts based on the user defined criteria
    */
    filterPosts(){
        const {posts, query} = this.props;
        return posts.filter((onePost) => {
                return onePost.title.toLowerCase().includes(query) || 
                onePost.author.toLowerCase().includes(query) ||
                onePost.body.toLowerCase().includes(query) ||
                onePost.category.toLowerCase().includes(query)
            });
    }

    
    render(){

        const { history, server_communication_error, isLoading, posts, query, displayPostDetails } = this.props;

        if (server_communication_error) {
            return <p>Sorry! There was an error while communicating with the server</p>;
        }

        if (isLoading) {
            return <p>Loading…</p>;
        }

        this.sortPosts();

        let filteredPosts = posts;
        if (query){
            filteredPosts = this.filterPosts();
        }

        return(
            <div className="container" style={{backgroundColor: color.whiteBackgroundColor}} >
                <Categories history={history} />
                <Col md={9} style={{textAlign: "left", verticalAlign: "middle"}} >
                    <Search></Search>
                    <Sorter></Sorter>
                    <AddPostLink />
                    {filteredPosts && filteredPosts.map((post) => {
                        return (
                            <Post 
                                post={post} 
                                key={post.id}
                                history={history}
                                parent={"Posts"}
                                displayPostDetails={displayPostDetails}
                            >
                            </Post>
                        );
                    })}
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        server_communication_error: state.server_communication_error,
        isLoading: state.isLoading,
        posts: state.posts,
        postSorterIndex: state.postSorterIndex,
        query: state.postsQuery
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        selectPost: (post) => dispatch(selectPost(post))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
