import {
    SET_USERS,
    ADD_USER,
    USER_FETCHED,
    USER_UPDATED,
    USER_DELETED
} from '../../actions/userEmailsAction';

export default function(state = [], action = {}) {
    switch(action.type) {
        case SET_USERS:
            return action.users;

        case ADD_USER:
            return [
                ...state,
                action.user
            ]
        
        case USER_FETCHED:
            const index = state.findIndex(item => item._id === action.user._id);
            if(index > -1) {
                return state.map(item => {
                    if(item._id === action.user._id) return action.user;
                    return item
                })
            } else {
                return [
                    ...state,
                    action.user
                ]
            }

        case USER_UPDATED:
            return state.map(item => {
                if(item._id === action.user._id) return action.user;
                return item;
            });

        case USER_DELETED:
            return state.filter(item => item._id !== action.userId);

        default:
            return state;
    }
}