import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import unixToDate from './utils/DateTools'
import EditCommentLink from './EditCommentLink';

import {selectComment, voteComment, deleteComment} from './actions/comments';
import { connect } from 'react-redux';

class Comment extends Component {
        

    render(){
        let {comment, deleteComment, voteComment, history} = this.props;
        return(
            <div className="row row-bottom-bordered">
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
                        onClick={()=>{
                            deleteComment(comment.id);
                        }}
                    >
                    </div>
                    <div 
                        className="add-vote" 
                        style={{cursor: "pointer", hover: "hand"}}
                        onClick={() => {
                            voteComment(comment.id, "upVote")
                        }}
                        >
                    </div>
                    <div className="post-votes">
                        { comment.voteScore }
                    </div>
                    <div 
                        className="minus-vote" 
                        style={{cursor: "pointer", hover: "hand"}}
                        onClick={() => {
                            voteComment(comment.id, "downVote")
                        }}
                        >
                    </div>
                    <EditCommentLink 
                        intent="edit" 
                        comment={comment}
                        history={history}
                     />
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
        selectComment: (comment) => dispatch(selectComment(comment)),
        voteComment: (commentId, voteType) => dispatch(voteComment(commentId, voteType)),
        deleteComment: (commentId) => dispatch(deleteComment(commentId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);