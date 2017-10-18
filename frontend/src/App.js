import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import MyNav from './MyNav';
import Welcome from './Welcome';
import Posts from './Posts';
import {Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PostAddEditForm from './PostAddEditForm';
import PostComments from './PostComments';
import CommentAddEditForm from './CommentAddEditForm';



class App extends Component {

    displayPostDetails = (post) => {
        //this.selectPost(post);
        this.props.history.push({
            pathname: `/posts/details/${post.id}/`  //path
        });
    }

    render() {

        return (
            <div className="App">
                <MyNav></MyNav>
                <div>
                    <Route exact path='/' render={({history}) => (
                        <div>
                            <Welcome />
                            <Posts 
                                history={history}
                                displayPostDetails={this.displayPostDetails}
                            />
                        </div>
                    )}/>
                    <Route exact path='/posts/add' render={({history})  => (
                        <PostAddEditForm
                            history={history}
                        />
                    )}/>
                    <Route exact path='/posts/edit' render={({history})  => (
                        <PostAddEditForm
                            history={history}
                        />
                    )}/>
                    <Route exact path='/posts/details/:postId' render={({history})  => (
                        <PostComments
                            history={history}
                            displayPostDetails={this.displayPostDetails}
                        />
                        
                    )}/>
                    <Route exact path={`/comments/add`} render={({history})  => (
                        <CommentAddEditForm
                            history={history}
                            displayPostDetails={this.displayPostDetails}
                        />
                    )}/>
                    <Route exact path={`/comments/edit`} render={({history})  => (//comments/:commentId
                        <CommentAddEditForm
                            history={history}
                        />
                    )}/>
                </div>
            </div>
        );
    }
}

export default withRouter(App);