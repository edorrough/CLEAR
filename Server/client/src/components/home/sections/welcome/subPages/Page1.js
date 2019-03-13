import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';

import ReactTooltip from 'react-tooltip'
import RightArrow from '../../../../../assets/right-arrow.gif';
import LeftArrow from '../../../../../assets/left-arrow.gif';

import './Page1.css';

class Page1 extends Component {

    render() {
        return (
            <div className="page1-container">
                <div className="arrows-navigation">
                    <button 
                        onClick={this.props.prevPage}
                        className="left-arrow"
                    >
                        <img 
                            src={LeftArrow} 
                            alt="right arrow" 
                            data-tip data-for='END'
                        />
                        <ReactTooltip 
                            id='END' 
                            type='info'>
                            <span>You have reached the end</span>
                        </ReactTooltip> 
                    </button>

                    <button 
                        className="right-arrow"
                        onClick={this.props.nextPage}
                    >
                        <img src={RightArrow} alt="right arrow" />
                    </button>
                </div>

                <div className="content">
                    
                    <div className="page1-left-content">
                        <div className="player-wrapper">
                            
                        </div>

                    </div>
                    <div className="page1-right-content">
                        {/* <h3 style={{ color: '#FFFFFF'}}>Department of </h3>
                        <h1 style={{ color: '#FFFFFF'}}>Linguistics</h1> */}
                        <h3>Department of</h3>
                        <h1>Linguistics</h1>
                        <button className="ui teal button">Learn more</button>
                        <h2>Together, <br/> we can make it better</h2>
                    </div>
                    
                </div>

            </div>
        )
    }
}

export default Page1;
