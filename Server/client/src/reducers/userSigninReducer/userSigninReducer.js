
import {
    FORGOT_PASSWORD_SUBMIT,
    SUCCESSFULLY_CHANGE_PASSWORD,
    USER_LOGIN,
    AUTH_FAILED,
    USER_LOGGED
} from '../../actions/authAction';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function(state = initialState, action = {}) {
    switch(action.type) {
        case USER_LOGIN:
            // return [
            //     ...state,
            //     action.userSigninData
            // ]
            
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            }

        case FORGOT_PASSWORD_SUBMIT:
            return {
                ...state,
                userData: action.pwdResetData
            }

        case SUCCESSFULLY_CHANGE_PASSWORD:
            return {
                ...state,
                message: action.userData
            }

        case AUTH_FAILED:
            return {
                ...state,
                user: action.user
            }

        case USER_LOGGED:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}