import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import MyNav from './MyNav';
import Welcome from './Welcome';
import {Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom';


class App extends Component {

  render() {

    return (
        <div className="App">
            <MyNav></MyNav>
            <div>
                <Route exact path='/' render={({history}) => (
                    <div>
                        <Welcome />
                    </div>
                )}/>
            </div>
        </div>
    );
  }
}

export default withRouter(App);