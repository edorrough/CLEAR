import {
    SET_EVENTS,
    EVENT_SAVED,
    EVENT_FETCHED,
    EVENT_UPDATED,
    EVENT_DELETED,
    FETCH_DISPLAY_EVENT
} from '../../actions/eventsSchedulersAction';

export default function( state = [], action = {}) {
    switch(action.type) {
        case SET_EVENTS:
            return action.events;

        case FETCH_DISPLAY_EVENT:
            return action.events;

        case EVENT_SAVED:
            return [
                ...state,
                action.event
            ]

        case EVENT_FETCHED:
            const index = state.findIndex(item => item._id === action.event._id);
            if(index > -1) {
                return state.map(item => {
                    if(item._id === action.event._id) return action.event;
                    return item;
                });
            } else {
                return [
                    ...state,
                    action.event
                ]
            }
        
        case EVENT_UPDATED:
            return state.map(item => {
                if(item._id === action.event._id) return action.event;
                return item
            })

        case EVENT_DELETED:
            return state.filter(item => item._id !== action.eventId);

        default:
            return state;
    }
}