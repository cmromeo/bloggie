import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {
    Grid,
    Col,
    Image
} from 'react-bootstrap';

class Welcome extends Component {
    render(){
        return(
            <Grid style={{marginBottom: "30px"}}>
                <div>
                    <Col md={10} sm={10} xs={9} className="text-left text-white">
                        <h2>Welcome to Bloggie!</h2>
                        <p>This platform is yours to express yourself. Shout and be appreciated!</p>
                    </Col>
                </div>
            </Grid>
        );
    }
}

export default Welcome;