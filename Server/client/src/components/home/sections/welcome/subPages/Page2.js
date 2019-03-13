import React, { Component } from 'react';
import RightArrow from '../../../../../assets/right-arrow.gif';
import LeftArrow from '../../../../../assets/left-arrow.gif';
import './Page2.css';

class Page2 extends Component {
    state = {
        x: 0,
        y: 0
    }

    moveX = (e) => {
        
        this.setState({
            x: e.pageX * -1 /15,
            y: e.pageY * -1 /15
        })
        // console.log("state X: ", this.state.x)
    }

    render() {
        return (
            <div className="page2-container"
                onMouseMove={this.moveX}
                style={{ backgroundPosition: this.state.x + 'px ' + this.state.y + 'px '}}
            >



                <div className="arrows-navigation">
                    <button 
                        onClick={this.props.prevPage}
                        className="left-arrow"
                    >
                        <img src={LeftArrow} alt="left arrow" />
                    </button>
                    <button 
                        className="right-arrow"
                        onClick={this.props.nextPage}
                    >
                        <img src={RightArrow} alt="right arrow" />
                    </button>
                </div>




            </div>
        )
    }
}

export default Page2;