import React from 'react';
import BigCalendar from 'react-big-calendar';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendarPage.css';

const localizer = BigCalendar.momentLocalizer(moment)
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const calendarPage = ( props ) => {

    props.events.forEach(event => event.start = moment(event.start).toDate())
    props.events.forEach(event => event.end = moment(event.end).toDate())

    return (
        <div className="public-calender">
            <BigCalendar
                events={props.events}
                localizer={localizer}
                views={allViews}
                step={30}
                startAccessor='start' 
                endAccessor='end'
                timeslots={1}
                onSelectEvent={props.toggleModal}
            />

            <Modal isOpen={props.modal} toggle={props.toggleModal}>
                <ModalHeader toggle={props.toggleModal}>Title: {props.currentEventTitle}</ModalHeader>
                    <ModalBody>
                        Start Date & time:
                        <p>
                            {props.showStartTime}
                        </p>
                        End Date & time:
                        <p>
                            {props.showEndTime}
                        </p>
                        Location:
                        <p>
                            {props.currentLocation}
                        </p>
                        <hr/>
                        Event content: {props.currentEventBody}
                    </ModalBody>
            </Modal>
        </div>
    )
}

export default calendarPage;