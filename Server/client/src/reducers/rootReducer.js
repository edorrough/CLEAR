import { combineReducers } from 'redux';
// import authReducer from './authReducer/authReducer';
// import usersReducer from './usersReducer/usersReducer';
// import todoReducer from './todoReducer/todoReducer';
// import { reducer as reduxform } from 'redux-form';
// import userAuthReducer from './userAuthReducer/userAuthReducer';
// import artworkImageReducer from './artworkImageReducer/artworkImageReducer';
// import adminImageReducer from './adminImageReducer/adminImageReducer';
// import faqsReducer from './faqsReducer/faqsReducer';
// import nonOrgsReducer from './nonProfOrgsReducer/nonProfOrgsReducer';
import contactReducer from './contactReducer/contactReducer';
import userSigninReducer from './userSigninReducer/userSigninReducer';

export default combineReducers({
    contact: contactReducer,
    auth: userSigninReducer
    // auth: authReducer,
    // userAuth: userAuthReducer,
    // users: usersReducer,
    // todos: todoReducer,
    // faqs: faqsReducer,
    // adminImages: adminImageReducer,
    // artistsAndartworksImages: artworkImageReducer,
    // nonOrgsImages: nonOrgsReducer,
    // form: reduxform
});
