import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {selectPost} from './actions/posts';
import { connect } from 'react-redux';

class EditPostLink extends Component {
    
    render(){
        const { post, history, selectPost } = this.props;
        return(
            <div 
                className={`edit-post`} 
                style={{cursor: "pointer", hover: "hand"}}
                onClick={(e) => {
                    e.stopPropagation();
                    selectPost(post);
                    history.push({
                        pathname: `/posts/edit`,  //path
                    });
                }}
            >
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedPost: state.selectedPost
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectPost: (post) => dispatch(selectPost(post))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostLink);

