import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip';
import RightArrow from '../../../../../assets/right-arrow.gif';
import LeftArrow from '../../../../../assets/left-arrow.gif';
import Lift_CU_Boulder from '../../../../../assets/Life_at_CU_Boulder.mp4';
import './Page3.css';


class Page3 extends Component {
    state = {
        // videoURL: 'https://youtu.be/mB8aH8zulT4',
        videoURL: 'https://drive.google.com/file/d/1ls4OjBngEVJHp_gi_MAgNR25AMNWBMVL/view?usp=sharing'
    }

    render() {
        return (
            <div className="page3-container">

                <video id="background-video" loop autoPlay muted>
                    {/* <source src={this.state.videoURL} type="video/mp4" /> */}
                    <source src={Lift_CU_Boulder} type="video/mp4" />
                    <source src={Lift_CU_Boulder} type="video/ogg" />
                    Your browser does not support the video tag.
                </video>

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
                        <img 
                            src={RightArrow} 
                            alt="right arrow" 
                            data-tip data-for='END'
                        />
                        <ReactTooltip 
                            id='END' 
                            type='info'>
                            <span>You have reached the end</span>
                        </ReactTooltip> 
                    </button>
                </div>

            </div>
        )
    }
}

export default Page3;
