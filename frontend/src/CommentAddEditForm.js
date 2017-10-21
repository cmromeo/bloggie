import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { FormGroup,
        ControlLabel,
        FormControl,
        HelpBlock,
        Button,
         } from 'react-bootstrap';
import uuidv1 from 'uuid/v1';
import NotFound from './NotFound';

import { addComment, updateComment } from './actions/comments';
import { connect } from 'react-redux';

class CommentAddEditForm extends Component {

    state = {
        body: '',
        author: '',
        bodyValid: false,
        authorValid: false,
        formIsValid: false
    }

    /**
    * @description checks comment if it contains a body
    * @return {string} success or error
    */
    getBodyValidationState = () => {
        const length = this.state.body.length;
        if (length > 0) {
            return 'success';
        }
        else return 'error';
    }

    /**
    * @description checks comment if it contains an author
    * @return {string} success or error
    */
    getAuthorValidationState = () => {
        const length = this.state.author.length;
        if (length > 0){
            return 'success';
        }
        else return 'error';
    }

    /**
    * @description sets the state value of the validation status of body and author 
    * @param {Object} event object e
    */
    handleBodyAuthorChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
            () => { this.validateField(name, value) });
    }

    /**
    * @description validates status of body and author 
    * @param {string} fieldName has value of either "body" or "author"
    * @param {string} value is the either the body or the author of the comment 
    */
    validateField(fieldName, value) {
        let bodyValid = this.state.bodyValid;
        let authorValid = this.state.authorValid;

        switch(fieldName) {
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
                bodyValid: bodyValid,
                authorValid: authorValid
            }, this.validateForm);
    }

    /**
    * @description sets the value of the formIsValid state 
    */
    validateForm = () => {
        this.setState({
            formIsValid: this.state.bodyValid && this.state.authorValid
        });
    }

    /**
    * @description Called just after the component is mounted
    */
    componentDidMount(){
        const { comment } = this.props;
        
        if (comment) {//intent is to edit a comment
            this.setState({
                body: comment.body,
                author: comment.author,
                bodyValid: comment.body.length > 0 ? true : false,
                authorValid: true
            });
        }
    }

    /**
    * @description fires when submit button for either add or edit  
    * @param {Object} event object e
    */
    handleSubmit = (event) => {
        event.preventDefault()
        const { updateComment, addComment, post, comment } = this.props;
        if (comment){//intent to edit
            updateComment({"timestamp": Date.now(), "body": this.state.body}, comment.id);
        }
        else{//intent to add
            addComment({
                "id": uuidv1(),
                "timestamp": Date.now(),
                "body": this.state.body,
                "author": this.state.author,
                "parentId": post.id
            });
        }
        this.props.history.goBack();
        //this.props.displayCommentDetails && this.props.displayCommentDetails(comment);
        //this.props.history.push('/');
    }

    render(){
        const { comment, intent, history } = this.props;
        if (!comment && intent==="add"){
            return <NotFound />
        }
        return(
            <div className="container" style={{width: "800px"}}>
                <h2 style={{marginBottom: "30px"}}>{comment ? "Edit Comment" : "Add A New Comment"}</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="formPostBodyTextarea">
                        <ControlLabel>Body</ControlLabel>
                        <FormControl 
                            componentClass="textarea" 
                            type="text"
                            value={this.state.body}
                            name="body"
                            placeholder="Enter body of Comment"
                            onChange={this.handleBodyAuthorChange}
                            style={{height: "240px", 
                                border: this.state.bodyValid ? false : true, 
                                borderColor: "red" 
                            }}
                        />
                        <HelpBlock style={{
                            display: this.state.bodyValid ? "none" : "inline",
                            color: "red"
                            }}>this is a required field</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="formPostAuthorText"  style={{display: comment ? "none" : "block" }}>
                        <ControlLabel>Author</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.author}
                            name="author"
                            placeholder="Enter your desired author name"
                            onChange={this.handleBodyAuthorChange}
                            style={{ 
                                border: this.state.bodyValid ? false : true, 
                                borderColor: "red" 
                            }}
                        />
                        <HelpBlock style={{
                            display: this.state.authorValid ? "none" : "inline",
                            color: "red"
                            }}>this is a required field</HelpBlock>
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
        post: state.selectedPost,
        comment: state.selectedComment,
        server_communication_error: state.server_communication_error,
        isLoading: state.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (newComment) => dispatch(addComment(newComment)),
        updateComment: (updatedComment, commentId) => dispatch(updateComment(updatedComment, commentId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentAddEditForm);
