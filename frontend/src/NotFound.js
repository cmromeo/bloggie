import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {Link} from 'react-router-dom';

class NotFound extends Component {
    render(){
        return(
            <div>Data Not Found. Return to 
                <Link to={{pathname: `/`}}><h4>HOME</h4></Link>
            </div>

        );
    }
}

export default NotFound;