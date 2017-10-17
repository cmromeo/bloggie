import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {
    Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import {fetchCategories} from './actions/categories';

class Categories extends Component {

    /**
    * @description Called just after the component is mounted
    */
    componentDidMount(){
        this.props.fetchCategories();
    }

    render(){

        return(
            <Col md={3}>
                <div style={{textAlign: "left"}}>
                    <h4 className="category-title">Categories</h4>
                    <ul className="list-unstyled" >
                        <li className="category">
                        </li>
                        {this.props.categories && this.props.categories.map((category) => {
                            return (
                                <li className="category" key={category.path} >
                                    {category.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Col>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        selectedCategory: state.selectedCategory,
        server_communication_error: state.server_communication_error,
        isLoading: state.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

