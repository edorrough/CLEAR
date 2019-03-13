import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
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
                    <div className="trans-title">
                        <p>
                            <b>Linguistics </b>
                            is the perfect major of your school years
                        </p>
                    </div>
                    <div className="trans-subtitle">
                        <p>
                            The Department of Linguistics Strategic Plan provides more detailed information about who we are, 
                            what we do, and our vision for the future.
                        </p>
                    </div>
                </div>
            
                <div className="register-button">
                    <button className="ui teal button">
                        Register Now
                    </button>
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
            <div id="homepage-wrapper">
                <div className="homepage">
                    
                    <WelcomeSection />
                    <TransitionPart />
                    <Projects />
                    <MeetPeople />
                    
                    
                </div>
            </div>
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
