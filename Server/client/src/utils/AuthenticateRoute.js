// import React, { Component } from 'react';
// import PropTypes from 'prop-types'; // ES6
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { addFlashMessages } from '../actions/flashMessages';



// export default function(ComposedComponent) {
    
//     class AuthenticateRoute extends Component {
        
//         componentWillMount() {
//             console.log(this.props.isAuthenticated)

//             if(!this.props.isAuthenticated) {
//                 this.props.addFlashMessages({
//                     type: 'error',
//                     text: 'You need to login to access this page'
//                 });

//                 return <Redirect to="/user/login" />
//             }
//         }

//         componentWillUpdate(nextProps) {
//             debugger
//             if(!nextProps.isAuthenticated) {
//                 return <Redirect to="/" />
//             }
//         }
    
//         render() {
//             return (
//                 <ComposedComponent {...this.props}/>
//             )
//         }
//     }

//     AuthenticateRoute.propTypes = {
//         isAuthenticated: PropTypes.bool,
//         addFlashMessages: PropTypes.func
//     }

//     const mapStateToProps = (state) => {
//         return {
//             isAuthenticated: state.auth.isAuthenticated
//         }
//     }

//     return connect(mapStateToProps, {
//         addFlashMessages
//     })(AuthenticateRoute)
// }


 


