import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {
    Col,
} from 'react-bootstrap';

import Categories from './Categories';
import Post from './Post';
import {fetchPosts} from './actions/posts';
import { connect } from 'react-redux';

class Posts extends Component {


    componentWillMount(){
        this.props.fetchPosts();
    }

    componentDidMount(){
    }

    
    render(){

        const { history, server_communication_error, isLoading, posts } = this.props;

        if (server_communication_error) {
            return <p>Sorry! There was an error while communicating with the server</p>;
        }

        if (isLoading) {
            return <p>Loading…</p>;
        }
        return(
            <div className="container" >
                <Categories history={history} />
                <Col md={9} >
                    {posts && posts.map((post) => {
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
        posts: state.posts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
