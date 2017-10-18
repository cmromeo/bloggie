import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {
    Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {fetchCategories, selectCategory} from './actions/categories';
import {Link} from 'react-router-dom';

class Categories extends Component {

    onCategorySelect = (category, e) => {
        this.props.selectCategory(category);
    }

    /**
    * @description Called just after the component is mounted
    */
    componentDidMount(){
        this.props.fetchCategories();
        this.props.selectCategory(null);
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
                                <li className="category" key={category.path} onClick={(e) => this.onCategorySelect(category, e)} >
                                    <Link to={{pathname: `/category/${category.path}` }}>{category.name}</Link>
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
        selectCategory: (category) => dispatch(selectCategory(category))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

