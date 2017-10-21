

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Post from './Post';
import {
    Col,
} from 'react-bootstrap';
import AddCommentLink from './AddCommentLink';
import NotFound from './NotFound';
import { connect } from 'react-redux';
import {fetchComments, updateSelectedComment} from './actions/comments';
import sortBy from 'sort-by';
import {Link} from 'react-router-dom';
import Comment from './Comment';

class PostComments extends Component {
    /**
    * @description Sorts comments by voteScore with highest on top
    */
    sortComments(){
        this.props.comments.sort(sortBy("-voteScore"));
    }

    /**
    * @description Called just before the component is mounted
    */
    componentWillMount(){
        //remove previously selected  comments when coming back to this component
        this.props.updateSelectedComment(null);
    }

    /**
    * @description Called just after the component is mounted
    */
    componentDidMount(){
        //fetch all comments for this post
        this.props.selectedPost && this.props.fetchComments(this.props.selectedPost.id);
    }


    render(){
        let {selectedPost, comments, history} = this.props;
        if (!selectedPost){
            return <NotFound />
        }
        comments && this.sortComments();

        return(
            <div className="container">
                <Col mdOffset={1} md={10} style={{textAlign: "left", marginBottom: "10px", paddingLeft: "0px"}}>
                    <Link to={{pathname: `/`}}><h4>HOME</h4></Link>
                </Col>
                <Col md={8} mdOffset={2} style={{textAlign: "left", verticalAlign: "middle"}}>
                    <Post 
                        post={selectedPost} 
                        history={history} 
                        displayPostDetails={this.displayPostDetails}
                        parent={"PostComments"}
                    />
                </Col>
                <Col md={7} mdOffset={3} style={{textAlign: "left", verticalAlign: "middle"}}>
                    <div className="row row-bottom-bordered" >
                        <div style={{display: "inlineBlock"}}>
                            <span className="comment-heading">Comments<AddCommentLink post={selectedPost} /></span>
                        </div>
                    </div>
                    
                    {comments && comments.map((comment) => {
                        return (
                            <Comment 
                                comment={comment} 
                                key={comment.id}
                                post={selectedPost}
                                history={this.props.history}
                                displayCommentDetails={this.displayCommentDetails}
                            >
                            </Comment>
                        );
                    })}
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedPost: state.selectedPost,
        comments: state.comments,
        server_communication_error: state.server_communication_error,
        isLoading: state.isLoading,
        query: state.commentsQuery
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchComments: (postId) => dispatch(fetchComments(postId)),
        updateSelectedComment: (comment) => dispatch(updateSelectedComment(comment)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComments);
