import React from 'react';
import PropTypes from 'prop-types';
import EventsTable from '../eventsTable/EventsTable';
import { connect } from 'react-redux';
import { deleteEvent } from '../../../../../actions/eventsSchedulersAction';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
moment.locale('en-GB');
const localizer = BigCalendar.momentLocalizer(moment)

const SchedulersList = ({ events, deleteEvent }) => {

    const emptyMessage = (
        <p>There is no event in collection</p>
    )

    const eventsList = (events, deleteEvent) => {
        return (
            <div className="ui container">
                <table className="ui celled fixed table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                            <th className="eight wide">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => 
                                <EventsTable 
                                    event={event} 
                                    key={event._id}
                                    // saveTask={saveTask}
                                    deleteEvent={deleteEvent} 
                                />)}
                    </tbody>
                </table>
                <BigCalendar
                    events={events}
                    localizer={localizer}
                    defaultView={BigCalendar.Views.DAY}
                    views={['day', 'work_week', 'month']}
                    step={60}
                    // defaultDate={new Date(2018, 0, 29)}
                    // resources={resourceMap}
                    // resourceIdAccessor="resourceId"
                    // resourceTitleAccessor="resourceTitle"
                    />
            </div>
        )
    }

    return (
        <div className="scheduler-list-page">
            { events.length === 0 ? emptyMessage : eventsList(events, deleteEvent)}
        </div>
    )
}

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