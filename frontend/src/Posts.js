import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {
    Col,
} from 'react-bootstrap';

import Categories from './Categories';
import Post from './Post';
import Search from './Search';
import color from './utils/ColorTools';
import {fetchPosts} from './actions/posts';
import { connect } from 'react-redux';

class Posts extends Component {


    componentWillMount(){
        this.props.fetchPosts();
    }

    componentDidMount(){
    }

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

        const { history, server_communication_error, isLoading, posts, query } = this.props;

        if (server_communication_error) {
            return <p>Sorry! There was an error while communicating with the server</p>;
        }

        if (isLoading) {
            return <p>Loading…</p>;
        }

        let filteredPosts = posts;
        if (query){
            filteredPosts = this.filterPosts();
        }

        return(
            <div className="container" style={{backgroundColor: color.whiteBackgroundColor}} >
                <Categories history={history} />
                <Col md={9} style={{textAlign: "left", verticalAlign: "middle"}} >
                    <Search></Search>
                    {filteredPosts && filteredPosts.map((post) => {
                        return (
                            <Post 
                                post={post} 
                                key={post.id}
                                history={history}
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
        query: state.postsQuery
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
