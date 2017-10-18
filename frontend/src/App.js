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


class App extends Component {

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
                          />
                    </div>
                )}/>
                <Route exact path='/posts/edit' render={({history})  => (
                    <PostAddEditForm
                        history={history}
                    />
                )}/>
            </div>
        </div>
    );
  }
}

export default withRouter(App);