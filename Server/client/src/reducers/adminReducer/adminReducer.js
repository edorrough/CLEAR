import {
    SET_ADMINS,
    ADD_ADMIN,
    ADMIN_FETCHED,
    ADMIN_UPDATED,
    ADMIN_DELETED
} from '../../actions/userCRUDaction';

export default function( state = [], action = {}) {
    switch(action.type) {
        case SET_ADMINS:
            return action.admins

        case ADD_ADMIN:
            return [
                ...state,
                action.admin
            ]

        case ADMIN_FETCHED:
            const index = state.findIndex(item => item._id === action.admin._id);
            if(index > -1) {
                return state.map(item => {
                    if(item._id === action.admin._id) return action.admin;
                    return item
                })
            } else {
                return [
                    ...state,
                    action.admin
                ]
            }

        case ADMIN_UPDATED:
            return state.map(item => {
                if(item._id === action.admin._id) return action.admin;
                return item;
            });

        case ADMIN_DELETED:
            return state.filter(item => item._id !== action.adminId);

        default:
            return state
    }
}