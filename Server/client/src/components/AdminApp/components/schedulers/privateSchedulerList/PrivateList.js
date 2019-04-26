import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { deleteVisitorEvent } from '../../../../../actions/visitorSchedulerAction';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-GB');
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class PrivateList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            localizer: BigCalendar.momentLocalizer(moment),
            showStarttime: '',
            showEndTime: '',
            currentEventTitle: '',
            currentEventBody: '',
            currentEventId: '',
            currentLocation: '',
            modal: false
        }
    }

    emptyMessage = () => (
        <p>There is no event in collection</p>
    )

    toggleModal = event => {

        this.setState(prevState => ({
            modal: !prevState.modal,
            showStarttime: event.showStartTime,
            showEndTime: event.showEndTime,
            currentEventTitle: event.title,
            currentEventBody: event.desc,
            currentLocation: event.location,
            currentEventId: event._id
        }));
    };

    schedulesList = (schedules, allViews, deleteVisitorEvent) => {
        return (
            <div className="ui container">
                <h1>Private Scheduler</h1>

                <BigCalendar
                    events={schedules}
                    localizer={this.state.localizer}
                    views={allViews}
                    step={30}
                    startAccessor='start' 
                    endAccessor='end'
                    timeslots={1}
                    onSelectEvent={this.toggleModal}
                />

                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Title: {this.state.currentEventTitle}</ModalHeader>
                        <ModalBody>
                            Start Date & time:
                            <p>
                                {this.state.showStarttime}
                            </p>
                            End Date & time:
                            <p>
                                {this.state.showEndTime}
                            </p>
                            Location:
                            <p>
                                {this.state.currentLocation}
                            </p>
                            <hr/>
                            Event content: {this.state.currentEventBody}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="info">
                                <Link to={`/admins/events/add-new-visitor-event/${this.state.currentEventId}`}>Edit</Link>
                            </Button>
                            <Button color="primary" onClick={() => deleteVisitorEvent(this.state.currentEventId)}  >Delete event</Button>
                            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                </Modal>
            </div>
        )
    }

    render() {
        this.props.schedules.forEach(schedules => schedules.start = moment(schedules.start).toDate())
        this.props.schedules.forEach(schedules => schedules.end = moment(schedules.end).toDate())

        return (
            <div className="private-scheduler-page">
                { this.props.schedules.length === 0 ?
                    this.emptyMessage() :
                    this.schedulesList(this.props.schedules, allViews, this.props.deleteVisitorEvent)}
            </div>
        )
    }
}

PrivateList.propTypes = {
    schedules: PropTypes.array,
    deleteVisitorEvent: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        schedules: state.schedules
    }
}

export default connect(mapStateToProps, {
    deleteVisitorEvent
})(PrivateList);