export const SET_VISITOR_EVENTS = 'visitor_set_events';
export const VISITOR_EVENT_SAVED = 'visitor_event_saved';
export const VISITOR_EVENT_FETCHED = 'visitor_event_fetched';
export const VISITOR_EVENT_UPDATED = 'visitor_event_updated';
export const VISITOR_EVENT_DELETED = 'visitor_event_deleted';

function handleResponse(response) {
    if(response.ok) {
        return response.json()

    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function visitorEventFetched(schedule) {
    return {
        type: VISITOR_EVENT_FETCHED,
        schedule
    }
}

export function fetchVisitorEvent(id) {
    return dispatch => {
        fetch(`/api/visitor-events/${id}`)

        .then(res => res.json())
        .then(data => dispatch(visitorEventFetched(data.schedule)));
    }
}

export function setVisitorEvents(schedules) {
    return {
        type: SET_VISITOR_EVENTS,
        schedules
    }
}

export function fetchVisitorEvents() {
    return dispatch => {
        fetch('/api/visitor-events')
        .then(res => res.json())
        .then(data => dispatch(setVisitorEvents(data.schedules)));
    }
}

export function visitorEventSaved(schedule) {
    return {
        type: VISITOR_EVENT_SAVED,
        schedule
    }
}

export function saveVisitorEvent(schedule) {
    return dispatch => {
        return fetch('/api/visitor-events', {
            method: 'post',
            body: JSON.stringify(schedule),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleResponse)
        .then(data => dispatch(visitorEventSaved(data.schedule)))
    }
}

export function visitorEventUpdated(schedule) {
    return {
        type: VISITOR_EVENT_UPDATED,
        schedule
    }
}

export function updateVisitorEvent(schedule) {
    debugger
    return dispatch => {
        return fetch(`/api/visitor-events/${schedule._id}`, {
            method: 'put',
            body: JSON.stringify(schedule),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleResponse)
        .then(data => dispatch(visitorEventUpdated(data.schedule)))
    }
}


export function visitorEventDeleted(scheduleId) {
    return {
        type: VISITOR_EVENT_DELETED,
        scheduleId
    }
}
export function deleteVisitorEvent(id) {

    return dispatch => {
        return fetch(`/api/visitor-events/${id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleResponse)
        .then(data => dispatch(visitorEventDeleted(id)))
    }
}