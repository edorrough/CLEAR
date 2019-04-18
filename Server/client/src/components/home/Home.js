import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WelcomeSection from './sections/welcome/welcome';
import Projects from './sections/projects/Projects';
import MeetPeople from './sections/meetPeople/MeetPeople';
import CalendarPage from './sections/calendar/calendarPage';
import { fetchEvents } from '../../actions/eventsSchedulersAction';
import PropTypes from 'prop-types';
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
    state = {
        showStartTime: '',
        showEndTime: '',
        currentEventTitle: '',
        currentEventBody: '',
        currentEventId: '',
        currentLocation: '',
        modal: false
    }

    componentDidMount() {
        this.props.fetchEvents();
    }

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

    emptyMessage = () => (
        <p>There is no event in collection</p>
    )

    toggleModal = event => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            showStartTime: event.showStartTime,
            showEndTime: event.showEndTime,
            currentEventTitle: event.title,
            currentEventBody: event.desc,
            currentLocation: event.location
        }));
    };

    eventsList = (events) => {
        return (
            <CalendarPage 
                modal={this.state.modal}
                showStartTime={this.state.showStartTime}
                showEndTime={this.state.showEndTime}
                currentEventTitle={this.state.currentEventTitle}
                currentEventBody={this.state.currentEventBody}
                currentLocation={this.state.currentLocation}
                events={events}
                toggleModal={this.toggleModal}
            />
        )
    }

    render() {
        return (
            <div id="homepage-wrapper">
                <div className="homepage">
                    
                    <WelcomeSection />
                    <TransitionPart />
                    <Projects />
                    <MeetPeople />
                    
                    {this.props.events.length === 0 ? 
                        this.emptyMessage() : 
                        this.eventsList(this.props.events)}

                </div>
            </div>
        )
    }
}

Home.propTypes = {
    auth: PropTypes.object,
    events: PropTypes.func,
    fetchEvents: PropTypes.func
}

function mapStateToProps(state) {
    return { 
        auth: state.auth,
        events: state.events
    }
}

export default connect(mapStateToProps, {
    fetchEvents
})(Home);
