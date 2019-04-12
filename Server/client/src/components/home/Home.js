import React, { Component } from 'react';
//import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WelcomeSection from './sections/welcome/welcome';
import Projects from './sections/projects/Projects';
import MeetPeople from './sections/meetPeople/MeetPeople';
// import Navbar from '../customNavbar/CustomNavbar';
import './Home.css';

const TransitionPart = () => {
    return (
        <div className="transition-container">
            <div className="trans-wrapper">
                <div className="trans-content">
                    <div className="trans-subtitle">
                        <h1>About</h1>
                        <p>
                            The Center for Computational Language and Education Research (CLEAR) is dedicated to advancing Human Language Technology and applying it to Personalized Learning for broad and diverse populations with varying language backgrounds and cognitive profiles. Personalized Learning augments or replaces traditional modes of learning with emerging, and often interactive, technologies that adapt to suit individual preferences. Personalized learning is such an important problem that it has recently been named by the National Academy of Engineering as one of the 14 grand challenges for the 21st century.
                            <br/>
                            <br/>
                            CLEAR conducts research and development which informs theoretical questions in personalized learning and leads to effective and scalable solutions in schools, on the web and in the work place. Advancing personalized learning involves a multi-disciplinary effort that leverages innovations in human language technology that span computer science, linguistics, education, cognition, psychology, and speech and language.
                        </p>
                        <div className="about-learn-more">
                            <Link to="/Education">
                                <button className="ui teal button">
                                    Education Paths
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

class Home extends Component {

    renderContent = () => {
        // console.log("auth.user: ", this.props.auth.user);
        switch(this.props.auth.user) {
            case null:
                // App still tries to figure out if the user is logining
                return null;

            case false:
                // If not, show Signup button
                return (
                    <div>
                        {/* <SignUp /> */}
                        <Link to="/signup">
                            <button>
                                Sign up
                            </button>
                        </Link>
                    </div>
                );

            default:
                // I'm login in
                return (
                    <button bsStyle="primary" href="/api/logout">Log out</button>
                );
        }
    }

    render() {

        return (
            // <div>
                <div id="homepage-wrapper">
                    <div className="homepage">

                        <WelcomeSection />
                        <TransitionPart />
                        <Projects />
                        <MeetPeople />


                    </div>
                </div>

            // </div>

        )
    }
}

function mapStateToProps(state) {
    // debugger
    return {
        auth: state.auth,
        // usersList: state.users
    }
}


// export default connect(mapStateToProps, actions )(Home);
export default connect(mapStateToProps)(Home);
