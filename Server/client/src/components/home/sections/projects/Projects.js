import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import icare_icon from '../../../../assets/icare_icon.jpg';
import earlyicare_icon from '../../../../assets/earlyicare_icon.jpg';
import carti_icon from '../../../../assets/carti_icon.jpg';

import ReactTooltip from 'react-tooltip';


import './Projects.css';

class Projects extends Component {
    state = {
        isICAREHovering: false,
        isEARLYHovering: false,
        isCARLAHovering: false,
    }

    toggleICAREHoverState = () => {

        this.setState({
            isICAREHovering: !this.state.isICAREHovering
        })
    }
    toggleEARLYHoverState = () => {
        this.setState((prevState) => ({
            isEARLYHovering: !prevState.isEARLYHovering
        }))
    }
    toggleCARLAHoverState = () => {
        this.setState((prevState) => ({
            isCARLAHovering: !prevState.isCARLAHovering
        }))
    }
    
    render() {


        return (
            <div className="projects-container">
                <h1>Projects</h1>
                <div className="projects-wrapper">                

                    <div className="ui three stackable cards">
                        <div className="card">
                            <div className="image">
                                <img 
                                    src={icare_icon} 
                                    alt="icare_icon"
                                    className="again"
                                    data-tip data-for='ICARE'
                                    
                                />

                                <ReactTooltip 
                                    id='ICARE' 
                                    type='success'>
                                    <span>ICARE: Independent Adaptive Comprehensive Reading Evaluation</span>
                                </ReactTooltip>          
                            </div>

                            <div className="content">
                                <Link className="header" to="#">ICARE</Link>
                                <div className="meta">
                                    <span style={{ textOverflow: 'ellipsis'}}>
                                    Funded by the Institute of Educational Sciences 
                                    (PI: Barbara Wise, coI Sarel Van Vuuren), 
                                    ICARE aims to create theoretically-grounded computerized assessments 
                                    which provide initial instructional profiles for poor readers from 2nd to 5th grade, 
                                    and indicate whether they have difficulties relating to word reading, 
                                    to language comprehension or both.
                                    </span>
                                </div>
                            </div>
                            <div className="extra content">
                                <Link to="">
                                    <i className="users icon"></i>
                                    2 Members
                                </Link>
                            </div>
                        </div>

                        
                        <div className="card">
                            <div className="image">
                                <img 
                                    src={earlyicare_icon} 
                                    alt="earlyicare_icon"
                                    className="again"
                                    data-tip data-for="Early-ICARE"
                                />       
                                <ReactTooltip 
                                    id='Early-ICARE' 
                                    type='info'>
                                    <span>Early-ICARE: E-Independent Comprehensive Adaptive Reading Evaluation</span>
                                </ReactTooltip>                              
                            </div>


                            <div className="content">
                                <Link className="header" to="#">Early-ICARE</Link>
                                <div className="meta">
                                    <span>
                                        Funded by the Institute of Educational Sciences 
                                        (PI: Barbara Wise, co-Is Lynn Snyder, Sarel Van Vuuren, Ed Wiley), 
                                        E-ICARE extends ICARE down to KG, adds dynamic repeated assessment of word reading K-5, 
                                        and also studies what predicts who will become a struggling reader.
                                    </span>
                                </div>
                            </div>
                            <div className="extra content">
                                <Link to="">
                                    <i className="users icon"></i>
                                    2 Members
                                </Link>
                            </div>
                        </div>


                        <div className="card">
                            <div className="image">
                                <img 
                                    src={carti_icon} 
                                    alt="carti_icon"
                                    data-tip data-for="CARLA"
                                    className="again"
                                />                                    
                            </div>

                            <ReactTooltip 
                                id='CARLA' 
                                type='light'>
                                <span>CARLA: Comprehensive Adaptive Reading & Learning Assistance</span>
                            </ReactTooltip>  



                            <div className="content">
                                <Link className="header" to="#">CARLA</Link>
                                <div className="meta">
                                    <span>
                                        CARLA is a comprehensive personalized reading intervention system 
                                        (B Wise, S Van Vuuren, N Ngampatipatpong, with funding from NIH; grounded on earlier programs 
                                        (ROSS and FtL) funded by NIH, IES, & an IERI). CARLA integrates all 5 domains of 
                                        evidence-based reading instruction, gradually changing its balance of thoughtful 
                                        instruction from more time in engaging activities for earlier readers to more time in books 
                                        as readers progress. Its fidelity of treatment makes it a great platform for studying 
                                        what works best for children with different cognitive profiles.
                                    </span>
                                </div>
                            </div>
                            <div className="extra content">
                                <Link to="">
                                    <i className="users icon"></i>
                                    2 Members
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="project-learn-more">
                        <Link to="/projects">
                            <button className="ui teal button">
                                Learn more projects
                            </button>
                        </Link>
                    </div>

                </div>

            </div>
        )
    }
}

export default Projects

