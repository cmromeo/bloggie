import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {
    Modal,
    Button
} from 'react-bootstrap';

class AboutMeModal extends Component {
        
    /**
    * @description Called just after the component is mounted
    */
    componentWillMount(){
    }

    render(){
        return(
            <div className="static-modal">
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>Hi, I'm Meo </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    I'm a grateful, former iOS dev now learning the ropes of Reactjs. I'm super thankful for the easy-to-understand video tutorials in Udacity's React-Redux course. -meoflauta@gmail.com
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        bsStyle="primary"
                        onClick={ () => {
                                this.props.setDisplayAboutMe(!this.props.show);
                            }
                        }
                    >Close
                    </Button>
                </Modal.Footer>

            </Modal>
        </div> 
        );
    }
}

export default AboutMeModal;