import {
    SEND_MESSAGE
} from '../../actions/contactAction';

export default function(state = [], action = {}) {
    switch(action.type) {
        case SEND_MESSAGE:
            return action.resMsg

        default:
            return state;
    }
}