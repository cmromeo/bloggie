import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {queryPosts} from './actions/posts';
import { connect } from 'react-redux';

class Search extends Component {
    componentWillMount() {
        this.props.queryPosts("");
    }
    render(){
        return(
            <div className="row row-bordered search-wrapper" >
                <input 
                className="search-posts"
                type="text"
                placeholder="Search posts"
                value={this.props.postsQuery ? this.props.postsQuery : ""} 
                onChange={(event) => { 
                    event.preventDefault();
                    this.props.queryPosts(event.target.value.toLowerCase());
                }} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postsQuery: state.postsQuery
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        queryPosts: (query) => dispatch(queryPosts(query))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);