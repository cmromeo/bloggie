import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {
    SplitButton,
    MenuItem
} from 'react-bootstrap';
import SORTED_BY from './utils/Constants';

import {postSorterIndex} from './actions/posts';
import { connect } from 'react-redux';

class Sorter extends Component {

    /**
    * @description Saves the sorter selected by the user
    */
    sorterSelected = (e) => {
        this.props.selectSorter(e);
    }

    componentWillMount(){
        //set default index of sorter to 0
        this.props.selectSorter(0);
    }

    render(){
        let sortDisplay = SORTED_BY[this.props.postSorterIndex].display
        return(
            <div className="post-sorter">
                <SplitButton bsStyle="default" 
                    title= {`Sort by ${ sortDisplay }`}
                    key="1" 
                    style={{display: "inlineBlock"}} 
                    id="sorter-dropdown" >
                    {SORTED_BY.map((sorter, index) => {
                        return (
                            <MenuItem 
                                eventKey={index} 
                                key={index} 
                                id={`sorter-${index}`}
                                onSelect={this.sorterSelected}
                                >{sorter.display}
                            </MenuItem>
                        );
                    })}
                </SplitButton>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postSorterIndex: state.postSorterIndex,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectSorter: (sorterIndex) => dispatch(postSorterIndex(sorterIndex)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sorter);

