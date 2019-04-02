import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function EventsTable({ event, deleteEvent }) {
    // debugger
    return (
        <tr>
            <td className={event.eventDone ? 'finished' : 'notFinished'}>{event.title}</td>
            <td className={event.eventDone ? 'finished' : 'notFinished'}>{event.eventDone ? 'Finished' : 'In Progress'}</td>
            <td className={event.eventDone ? 'finished' : 'notFinished'}>{event.createDate}</td>
            <td className="center aligned">
                <Link to={`/admins/events/add-new-event/${event._id}`}><i className="pencil alternate icon"></i></Link>
                <i className="trash alternate icon" onClick={() => deleteEvent(event._id)}></i>

            </td>
            <td className={event.eventDone ? 'finished' : 'notFinished'}>{event.note}</td>
        </tr>
    )
}

EventsTable.propTypes = {
    event: PropTypes.object,
    deleteEvent: PropTypes.func
}