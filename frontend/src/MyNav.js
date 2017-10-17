import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {
    Nav,
    Navbar,
    NavItem,
    Modal,
} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class MyNav extends Component {
    render(){
        return(
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link
                            to={{
                                pathname: "/",
                            }}                            
                        >Bloggie</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">About Me</NavItem>
                    <NavItem eventKey={2} href="#">Contact</NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default MyNav;