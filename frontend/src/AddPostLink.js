import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {Link} from 'react-router-dom';

class AddPostLink extends Component {
    render(){
        return(
            <div className={`add-post`} >
                <Link
                    to={{
                        pathname: `/posts/add`,
                    }}                            
                >Add</Link>
            </div>
        );
    }
}

export default AddPostLink;