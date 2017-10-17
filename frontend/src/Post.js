import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import unixToDate from './utils/DateTools'
import EditPostLink from './EditPostLink';

import { connect } from 'react-redux';

class Post extends Component {

    render(){
        let {post, displayPostDetails, history} = this.props;
        return(
            <div 
                className="row row-bottom-bordered"
                style={{cursor: "pointer", hover: "hand"}}
                >
                <div className="post-title">
                    { post && post.title }
                </div>
                <div className="post-category">
                    { post && post.category }
                </div>
                <div className="post-body">
                    { post && post.body }
                </div>
                <div>
                    <div className="post-author">
                        <span>- by <span style={{fontStyle: "italic"}}>{ post && post.author }</span>
                        &nbsp; on { post && unixToDate(post.timestamp) }</span>
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
                        { post && post.voteScore }
                    </div>
                    <div 
                        className="minus-vote" 
                        style={{cursor: "pointer", hover: "hand"}}
                        >
                    </div>
                    <EditPostLink 
                        post={post}
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
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);