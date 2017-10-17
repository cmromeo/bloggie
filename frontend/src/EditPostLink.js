import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { connect } from 'react-redux';

class EditPostLink extends Component {
    
    render(){
        const { post, history} = this.props;
        return(
            <div 
                className={`edit-post`} 
                style={{cursor: "pointer", hover: "hand"}}
                onClick={(e) => {
                    e.stopPropagation();
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostLink);

