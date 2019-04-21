export const SET_EVENTS = 'set_events';
export const EVENT_SAVED = 'event_saved';
export const EVENT_FETCHED = 'event_fetched';
export const EVENT_UPDATED = 'event_updated';
export const EVENT_DELETED = 'event_deleted';
export const FETCH_DISPLAY_EVENT = 'event_fetched_display';

function handleResponse(response) {
    if(response.ok) {
        return response.json()

    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function eventFetched(event) {
    return {
        type: EVENT_FETCHED,
        event
    }
}

export function fetchEvent(id) {
    return dispatch => {
        fetch(`/api/events/${id}`)

        .then(res => res.json())
        .then(data => dispatch(eventFetched(data.event)));
    }
}

export function setEvents(events) {
    return {
        type: SET_EVENTS,
        events
    }
}

export function fetchEvents() {
    return dispatch => {
        fetch('/api/events')
        .then(res => res.json())
        .then(data => dispatch(setEvents(data.events)));
    }
}

export function setFetchDisplayEvents(events) {
    return {
        type: FETCH_DISPLAY_EVENT,
        events
    }
}

export function fetchDisplayEvents() {
    return dispatch => {
        fetch('/api/fetchAndDisplay')
        .then(res => res.json())
        .then(data => dispatch(setFetchDisplayEvents(data.events)));
    }
}

export function eventSaved(event) {
    return {
        type: EVENT_SAVED,
        event
    }
}

export function saveEvent(event) {
    return dispatch => {
        return fetch('/api/events', {
            method: 'post',
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleResponse)
        .then(data => dispatch(eventSaved(data.event)))
    }
}

export function eventUpdated(event) {
    return {
        type: EVENT_UPDATED,
        event
    }
}

export function updateEvent(event) {
    return dispatch => {
        return fetch(`/api/events/${event._id}`, {
            method: 'put',
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleResponse)
        .then(data => dispatch(eventUpdated(data.event)))
    }
}

export function eventDeleted(eventId) {
    return {
        type: EVENT_DELETED,
        eventId
    }
}
export function deleteEvent(id) {
    return dispatch => {
        return fetch(`/api/events/${id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleResponse)
        .then(data => dispatch(eventDeleted(id)))
    }
}

