import {
    SET_VISITOR_EVENTS,
    VISITOR_EVENT_SAVED,
    VISITOR_EVENT_FETCHED,
    VISITOR_EVENT_UPDATED,
    VISITOR_EVENT_DELETED
} from '../../actions/visitorSchedulerAction';

export default function( state = [], action = {}) {
    switch(action.type) {
        case SET_VISITOR_EVENTS:
            return action.schedules;

        case VISITOR_EVENT_SAVED:
            return [
                ...state,
                action.schedule
            ]

        case VISITOR_EVENT_FETCHED:
            const index = state.findIndex(item => item._id === action.schedule._id);
            if(index > -1) {
                return state.map(item => {
                    if(item._id === action.schedule._id) return action.schedule;
                    return item;
                });
            } else {
                return [
                    ...state,
                    action.schedule
                ]
            }
        
        case VISITOR_EVENT_UPDATED:
            return state.map(item => {
                if(item._id === action.schedule._id) return action.schedule;
                return item
            })

        case VISITOR_EVENT_DELETED:
            return state.filter(item => item._id !== action.scheduleId);

        default:
            return state;
    }
}