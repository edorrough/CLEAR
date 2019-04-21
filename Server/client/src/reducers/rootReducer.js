import { combineReducers } from 'redux';

import contactReducer from './contactReducer/contactReducer';
import userSigninReducer from './userSigninReducer/userSigninReducer';
import flashMessagesReducer from './flashMessages/flashMessages';
import adminsList from './adminReducer/adminReducer';
import userEmailsReducer from './userEmailsReducer/userEmailsReducer';
import eventsSchedulersList from './schedulersReducer/EventsSchedulerReducers';
import visitorSchedulerList from './visitorSchedulerReducer/visitorSchedulerReducer';

import publicEducation from './publicEducation/publicEducation';

export default combineReducers({
    contact: contactReducer,
    auth: userSigninReducer,
    flashMessage: flashMessagesReducer,
    admins: adminsList,
    events: eventsSchedulersList,
    users: userEmailsReducer,
    schedules: visitorSchedulerList,
    
    educations: publicEducation
});
