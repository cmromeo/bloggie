import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {Link} from 'react-router-dom';

class AddCommentLink extends Component {
    render(){
        return(
            <div className={`add-comment`} >
                <Link
                    to={{
                        pathname: `/comments/add`,
                    }}                            
                />
            </div>
        );
    }
}

export default AddCommentLink;