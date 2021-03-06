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
import Category from './Category';
import AboutMeModal from './AboutMeModal';


class App extends Component {

    state = {
        displayAboutMe: false
    }

    /**
    * @description sets the state displayAboutMe indicating modal display
    * @param {bool} display
    */
    setDisplayAboutMe = (display) => {
        this.setState({
            displayAboutMe: display
        });
    }

    /**
    * @description calls new route to display details of a post
    * @param {Object} post
    */
    displayPostDetails = (post) => {
        this.props.history.push({
            pathname: `/posts/details/${post.id}/`  //path
        });
    }

    render() {

        return (
            <div className="App">
                <MyNav setDisplayAboutMe={this.setDisplayAboutMe}></MyNav>
                <div>
                    <AboutMeModal 
                        show={this.state.displayAboutMe}
                        setDisplayAboutMe={this.setDisplayAboutMe}
                        >
                    </AboutMeModal>
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
                    <Route exact path='/category/:categoryName' render={({history})  => (
                        <Category  
                            displayPostDetails={this.displayPostDetails}
                            history={history}
                        />
                    )}/>
                </div>
            </div>
        );
    }
}

export default withRouter(App);