import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { FormGroup,
        ControlLabel,
        FormControl,
        HelpBlock,
        Button,
        DropdownButton,
        InputGroup,
        MenuItem,
         } from 'react-bootstrap';
import uuidv1 from 'uuid/v1';

import { addPost, updatePost } from './actions/posts';
import { connect } from 'react-redux';



class PostAddEditForm extends Component {

    state = {
        title: '',
        body: '',
        author: '',
        categoryName:'',
        titleValid: false,
        bodyValid: false,
        authorValid: false,
        formIsValid: false
    }

    getTitleValidationState = () => {
        const length = this.state.title.length;
        if (length > 0) {
            return 'success';
        }
        else return 'error';
    }

    getBodyValidationState = () => {
        const length = this.state.body.length;
        if (length > 0) {
            return 'success';
        }
        else return 'error';
    }

    getAuthorValidationState = () => {
        const length = this.state.author.length;
        if (length > 0){
            return 'success';
        }
        else return 'error';
    }

    handleTitleBodyAuthorChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
                () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
    let titleValid = this.state.titleValid;
    let bodyValid = this.state.bodyValid;
    let authorValid = this.state.authorValid;

    switch(fieldName) {
        case 'title':
            titleValid = value.length > 0
            break;
        case 'body':
            bodyValid = value.length > 0
            break;
        case 'author':
            authorValid = value.length > 0
            break;
        default:
            break;
    }
    this.setState(
        {
            titleValid: titleValid,
            bodyValid: bodyValid,
            authorValid: authorValid
        }, this.validateForm);
}

    validateForm = () => {
        this.setState({
            formIsValid: this.state.titleValid && this.state.bodyValid && this.state.authorValid
        });
    }

    /**
    * @description Called just after the component is mounted
    */
    componentDidMount(){
        const { post } = this.props;
        
        if (post) {//intent is to edit a post
            this.setState({
                categoryName: post.category.name,
                title: post.title,
                body: post.body,
                author: post.author,
                titleValid: true,
                bodyValid: true,
                authorValid: true,
                formIsValid: true
            });
        }
        else{//intent is to add a post
            //set the selected category as the default, else, first category 
            console.log("this.props.categories.length ", this.props.categories.length);
            if (this.props.categories.length > 0){
                console.log("this.props.categories.length > 0");
                this.setState({
                    categoryName: this.props.selectedCategory ? this.props.selectedCategory.name : this.props.categories[0].name
                });
            }
        }
    }

    handleSelectCategory = (eventKey, event) => {
        this.setState({
            categoryName: eventKey
        });
    }

    handleSubmit = (event) => {
        const {updatePost, addPost, post} = this.props;
        event.preventDefault()
        if (post){//intent to edit
            updatePost({"title": this.state.title, "body": this.state.body}, post.id);
            //this.props.history.push(`/posts/details/${post.id}`);
            this.props.history.goBack();
        }
        else{//intent to add
            addPost({
                "id": uuidv1(),
                "timestamp": Date.now(),
                "title": this.state.title,
                "body": this.state.body,
                "author": this.state.author,
                "category": this.state.categoryName
            });
            this.props.history.goBack();
            //this.props.history.push('/');
        }
    }

    render(){
        const { categories, post, history } = this.props;

        return(
            <div className="container" style={{width: "800px"}}>
                <h2 style={{marginBottom: "30px"}}>{post ? "Edit Post" : "Add A New Post"}</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup
                        controlId="formPostTitleText"
                    >
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.title}
                            name="title"
                            placeholder="Enter title of Post"
                            onChange={this.handleTitleBodyAuthorChange}
                            style={{
                                border: this.state.titleValid ? false : true, 
                                borderColor: "red",
                                textAlign: "center" 
                            }}
                        />
                        <HelpBlock style={{
                            display: this.state.titleValid ? "none" : "inline",
                            color: "red"
                            }}>this is a required field</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="formPostBodyTextarea">
                        <ControlLabel>Body</ControlLabel>
                        <FormControl 
                            componentClass="textarea" 
                            type="text"
                            value={this.state.body}
                            name="body"
                            placeholder="Enter body of Post"
                            onChange={this.handleTitleBodyAuthorChange}
                            style={{
                                height: "240px", 
                                border: this.state.bodyValid ? false : true, 
                                borderColor: "red" 
                            }}
                        />
                        <HelpBlock style={{
                            display: this.state.bodyValid ? "none" : "inline",
                            color: "red"
                            }}>this is a required field</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="formPostAuthorText"  style={{display: post ? "none" : "block" }}>
                        <ControlLabel>Author</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.author}
                            name="author"
                            placeholder="Enter your desired author name"
                            onChange={this.handleTitleBodyAuthorChange}
                            readOnly={post ? true : false}
                            style={{
                                border: this.state.authorValid ? false : true, 
                                borderColor: "red",
                                textAlign: "center" 
                            }}
                        />
                        <HelpBlock style={{
                            display: this.state.authorValid ? "none" : "inline",
                            color: "red"
                            }}>this is a required field</HelpBlock>
                    </FormGroup>
                    <FormGroup style={{display: post ? "none" : "block" }}>
                        <ControlLabel>Category</ControlLabel>
                        <InputGroup>
                            <FormControl 
                                type="text"
                                value={this.state.categoryName}
                                style={{textTransform: "capitalize"}}
                                readOnly={post ? true : false}
                            />
                            <DropdownButton
                                componentClass={InputGroup.Button}
                                id="input-dropdown-addon"
                                title="Choose"
                                onSelect={this.handleSelectCategory}
                                >
                                {categories && categories.map((category) => {
                                    return (
                                        <MenuItem 
                                            key={category.path}
                                            eventKey={category.name}
                                            style={{textTransform: "capitalize"}}
                                            >{category.name}
                                        </MenuItem>
                                    );
                                })}
                            </DropdownButton>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Button
                            style={{width:"220px", marginTop: "30px", marginRight: "30px"}}
                            onClick={() => {
                                history && history.goBack();
                            }}
                            ><h4>CANCEL</h4>
                        </Button>
                        <Button 
                            type="submit"
                            disabled={!this.state.formIsValid}
                            style={{width: "220px", marginTop: "30px"}}
                            >
                            <h4>SUBMIT</h4>
                        </Button>
                        
                        
                    </FormGroup>
                </form>
            </div> 
        );
    }
}


const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        post: state.selectedPost,
        selectedCategory: state.selectedCategory,
        server_communication_error: state.server_communication_error,
        isLoading: state.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPost) => dispatch(addPost(newPost)),
        updatePost: (updatedPost, postId) => dispatch(updatePost(updatedPost, postId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostAddEditForm);








