import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {selectComment} from './actions/comments';
import { connect } from 'react-redux';

class EditCommentLink extends Component {
    
    render(){
        const {comment, selectComment, history} = this.props;

        return(
            <div 
                className={`edit-comment`} 
                style={{cursor: "pointer", hover: "hand"}}
                onClick={(e) => {
                    e.stopPropagation();
                    selectComment(comment);
                    history.push({
                        pathname: `/comments/edit`,  //path comments/edit
                    });
                }}
            >
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedComment: state.selectedComment
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectComment: (comment) => dispatch(selectComment(comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentLink);