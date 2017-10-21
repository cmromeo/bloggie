import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {
    Col,
} from 'react-bootstrap';
import Search from './Search';
import Post from './Post';
import color from './utils/ColorTools';
import Sorter from './Sorter';
import {Link} from 'react-router-dom';
import AddPostLink from './AddPostLink';
import NotFound from './NotFound';
import sortBy from 'sort-by';
import SORTED_BY from './utils/Constants';

import { selectPost } from './actions/posts';

import { connect } from 'react-redux';

class Category extends Component {

    componentWillMount(){
        //remove previously selected  post when coming back to this component
        this.props.selectPost(null);
    }

    /**
    * @description sort Post objects 
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

    
    render(){
        let { posts, selectedCategory, history, displayPostDetails, query } = this.props;
        if (!selectedCategory){
            return <NotFound />
        }
        this.sortPosts();

        // let postsOfCategory = posts.filter((post) => {
        //     return post.category === selectedCategory.path;
        // });

        let filteredPosts = posts.filter((onePost) => {
            return onePost.category === selectedCategory.name;
        });
        if (query){
            filteredPosts = filteredPosts.filter((onePost) => {
                return (
                    (onePost.title.toLowerCase().includes(query)) || 
                    (onePost.author.toLowerCase().includes(query)) ||
                    (onePost.body.toLowerCase().includes(query)) ||
                    (onePost.category.toLowerCase().includes(query))
                );
            });
        }

        return(
            <div className="container" style={{backgroundColor: color.whiteBackgroundColor}}>
                <Col mdOffset={1} md={10} style={{textAlign: "left", marginBottom: "10px", paddingLeft: "0px"}}>
                    <Link to={{pathname: `/`}}><h4>HOME</h4></Link>
                </Col>

                <div style={{textAlign: "center", textTransform: "uppercase"}}>
                    <h3>Category: <span style={{color: "red"}}>{selectedCategory.name}</span></h3>
                </div>
                <Col mdOffset={1} md={10} style={{textAlign: "left", verticalAlign: "middle"}}>
                    <Search></Search>
                    <Sorter
                        selectSorter={this.props.selectSorter}
                        postSorterIndex={this.props.postSorterIndex}>
                        >
                    </Sorter>
                    <AddPostLink intent="add" />
                    {filteredPosts && filteredPosts.map((post) => {
                        return (
                            <Post 
                                post={post} 
                                key={post.id}
                                history={history}
                                displayPostDetails={displayPostDetails}
                                parent={"Category"}
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
        posts: state.posts,
        postSorterIndex: state.postSorterIndex,
        selectedCategory: state.selectedCategory,
        server_communication_error: state.server_communication_error,
        isLoading: state.isLoading,
        query: state.postsQuery,
        post: state.selectedPost,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectPost: (post) => dispatch(selectPost(post)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);

