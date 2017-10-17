import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {
    Col,
} from 'react-bootstrap';

import Categories from './Categories';

import { connect } from 'react-redux';

class Posts extends Component {


    componentWillMount(){
    }

    componentDidMount(){
    }

    
    render(){
        if (this.props.server_communication_error) {
            return <p>Sorry! There was an error while communicating with the server</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        //let posts = this.state.posts;
        const { history } = this.props;
        
        return(
            <div className="container" >
                <Categories history={history} />
                <Col md={9} >
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        server_communication_error: state.server_communication_error,
        isLoading: state.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
