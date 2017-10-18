import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import unixToDate from './utils/DateTools'

import {selectComment} from './actions/comments';
import { connect } from 'react-redux';

class Comment extends Component {
        
    /**
    * @description Called just after the component is mounted
    */
    componentWillMount(){
    }

    render(){
        let {comment, deleteComment, voteComment, history} = this.props;
        return(
            <div 
                className="row row-bottom-bordered"
                onClick={() => {
                    //console.log("on click tapped will call displaycommentdetails: ", displayCommentDetails);
                    //displayPostDetails is passed only when displaying multiple posts
                    //displayCommentDetails && displayCommentDetails(comment);
                }} >
                <div className="comment-body">
                    { comment.body }
                </div>
                <div>
                    <div className="comment-author" >
                        <span>- by <span style={{fontStyle: "italic", "color": "red"}}>{ comment.author }</span>
                        &nbsp; on { unixToDate(comment.timestamp) }</span>
                    </div>
                    <div 
                        className="trash"
                        
                        style={{cursor: "pointer", hover: "hand"}}
                    >
                    </div>
                    <div 
                        className="add-vote" 
                        style={{cursor: "pointer", hover: "hand"}}
                        >
                    </div>
                    <div className="post-votes">
                        { comment.voteScore }
                    </div>
                    <div 
                        className="minus-vote" 
                        style={{cursor: "pointer", hover: "hand"}}
                        
                        >
                    </div>
                   
                </div>
            </div> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        server_communication_error: state.server_communication_error,
        isLoading: state.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectComment: (comment) => dispatch(selectComment(comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);