import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import EventsTable from '../eventsTable/EventsTable';
import { connect } from 'react-redux';
import { deleteEvent } from '../../../../../actions/eventsSchedulersAction';
import { Link } from 'react-router-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

moment.locale('en-GB');

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class SchedulersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            localizer: BigCalendar.momentLocalizer(moment),
            currentEventTitle: '',
            currentEventBody: '',
            currentEventId: '',
            modal: false
        }
    }

    emptyMessage = () => (
        <p>There is no event in collection</p>
    )

    toggleModal = event => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            currentEventTitle: event.title,
            currentEventBody: event.desc,
            currentEventId: event._id
        }));
    };

    eventsList = (events, allViews, deleteEvent) => {

        return (
            <div className="ui container">

                {/* <BigCalendar
                    events={events}
                    localizer={this.state.localizer}
                    views={allViews}
                    step={30}
                    startAccessor='start' 
                    endAccessor='end'
                    timeslots={1}
                    onSelectEvent={this.toggleModal}
                />

                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.state.currentEventTitle}</ModalHeader>
                        <ModalBody>
                            {this.state.currentEventBody}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="info">
                                <Link to={`/admins/events/add-new-event/${this.state.currentEventId}`}>Edit</Link>
                            </Button>
                            <Button color="primary" onClick={() => deleteEvent(this.state.currentEventId)}  >Delete event</Button>
                            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                </Modal> */}
                    
            </div>
        )
    }

    render() {
        this.props.events.forEach(event => event.start = moment(event.start).toDate())
        this.props.events.forEach(event => event.end = moment(event.end).toDate())

        return (
            <div className="scheduler-list-page">
                { this.props.events.length === 0 ? 
                    this.emptyMessage() : 
                    this.eventsList(this.props.events, allViews, this.props.deleteEvent)}
            </div>
        )
    }
}

// const SchedulersList = ({ events, deleteEvent }) => {

//     const emptyMessage = (
//         <p>There is no event in collection</p>
//     )

//     const localizer = BigCalendar.momentLocalizer(moment)

//     events.forEach(event => event.start = moment(event.start).toDate())
//     events.forEach(event => event.end = moment(event.end).toDate())

//     // const onSelectSlot = (event) => {
//     //     debugger
//     //     console.log(event)
//     // }
//     const onSelectEvent = e => {
//         console.log(e.desc)
//         return (
//             <div className="ui modal">
//                 <div class="header">Header</div>
//                 <div class="content">
//                     {e.desc}
//                 </div>
//             </div>
//         )
//     }
//     const eventsList = (events, allViews, deleteEvent) => {
//         // debugger
//         return (
//             <div className="ui container">
//                 {/* <table className="ui celled fixed table">
//                     <thead>
//                         <tr>
//                             <th>Title</th>
//                             <th>Status</th>
//                             <th>Created Date</th>
//                             <th>Actions</th>
//                             <th className="eight wide">Description</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {events.map(event => 
//                                 <EventsTable 
//                                     event={event} 
//                                     key={event._id}
//                                     // saveTask={saveTask}
//                                     deleteEvent={deleteEvent} 
//                                 />)}
//                     </tbody>
//                 </table> */}

//                 <BigCalendar
//                     events={events}
//                     localizer={localizer}
//                     views={allViews}
//                     step={30}
//                     startAccessor='start' 
//                     endAccessor='end'
//                     tooltipAccessor='desc'
//                     timeslots={1}
//                     // onSelectEvent=
//                     // selected={events.desc}
//                     // popupOffset={{x: 30, y: 20}}
//                     // popup={true}
//                     // onSelectSlot={onSelectSlot()}

//                     onSelectEvent = {event => onSelectEvent(event)}
                    
//                     />
//             </div>
//         )
//     }

//     return (
//         <div className="scheduler-list-page">
//             { events.length === 0 ? emptyMessage : eventsList(events, allViews, deleteEvent)}
//         </div>
//     )
// }

SchedulersList.propTypes = {
    events: PropTypes.array,
    deleteEvent: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        events: state.events
    }
}

export default connect(mapStateToProps, {
    deleteEvent
})(SchedulersList);