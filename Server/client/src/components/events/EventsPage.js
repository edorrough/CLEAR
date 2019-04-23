import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDisplayEvents } from '../../actions/eventsSchedulersAction';
import Pages from './Pages';
import './EventsPage.css';

class EventsPage extends Component {
    state = {
        allEvents: [...Array(150).keys()].map(i => 
            ({ 
                id: (i+1), 
                title: 'Item ' + (i+1),
                description: "Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116)",
                location: "home",
                showStartTime: "2019-4-21 / 11:30 AM",
                showEndTime: "2019-4-21 / 15:00 PM"
            })),

        // allEvents: this.props.events.map(event => {
        //     // debugger
        //     return (
        //     ({ 
        //         id: event._id, 
        //         title: event.title,
        //         description: event.desc,
        //         location: event.location,
        //         showStartTime: event.showStartTime,
        //         showEndTime: event.showEndTime
                
        //     })  )} ) ,

        pageOfEvents: [],
        mobileVersion: false,
    }

    componentDidMount() {
        this.props.fetchDisplayEvents();
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    componentWillMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    // componentWillReceiveProps = (nextProps) => {
    //     this.setState({
    //         allEvents: nextProps.events.map(event => 
    //             ({ 
    //                 id: event._id, 
    //                 title: event.title,
    //                 description: event.desc,
    //                 location: event.location,
    //                 showStartTime: event.showStartTime,
    //                 showEndTime: event.showEndTime
                    
    //             }))
    //     })
    // }

    resize() {
        let mobileVersion = (window.innerWidth <= 600);

        if(mobileVersion) {
            this.setState({ mobileVersion: mobileVersion})
        }
    }

    onChangePage = (pageOfEvents) => {
        this.setState({ pageOfEvents: pageOfEvents });
    }

    render() {
        console.log(this.state.allEvents)
        return (
            <div className="events-page">
                <div className="events-page-wrapper">
                    <h1>Past Events<hr/></h1>

                    {this.state.pageOfEvents.map(event => 
                        <div key={event.id}>
                            <h3><b>{event.title}</b></h3>
                            <h4>{event.description}</h4>
                            <ul><h5>
                                <li>Location: {event.location}</li>
                                <li>Started: {event.showStartTime}</li>
                                <li>Ended: {event.showEndTime}</li>
                            </h5></ul>
                            <hr/>
                        </div>
                    )}
                </div>
                <div className="events-sections">
                    <Pages 
                        events={this.state.allEvents}
                        onChangePage={this.onChangePage}
                        mobileVersion={this.state.mobileVersion}
                    />
                </div>
            </div>

        )
    }
}

EventsPage.propTypes = {
    fetchDisplayEvents: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        events: state.events
    }
}

export default connect(mapStateToProps, {
    fetchDisplayEvents
})(EventsPage);