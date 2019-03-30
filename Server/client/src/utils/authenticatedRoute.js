import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFlashMessages } from '../actions/flashMessages';
import PropTypes from 'prop-types'; // ES6

// Working
// export default function AuthenticatedRoute({ component: Component, isAuthenticated, ...rest}) {
//     return (
//         <Route
//             {...rest}
//             render={(props) => this.isAuthenticated === true ? 
//             <Component {...props} {...rest} /> : 
//             <Redirect to="/user/login" />}
//         />
//     )
// }

// Working
// const AuthenticatedRoute = ({ component: Component, ...rest}) => {
const AuthenticatedRoute = ({ component: Component, ...rest}) => {
    class AuthenticatedRoute extends React.Component {
        componentWillMount() {
            if(!this.props.isAuthenticated) {
                this.props.addFlashMessages({
                    type: 'error',
                    text: 'You need to login to access this page'
                });

                return <Redirect to="/user/login" />
            }
        }

        componentWillUpdate(nextProps) {
            console.log("nextProps: ", nextProps)
            debugger
            if(!nextProps.isAuthenticated) {
                return <Redirect to="/" />
            }
        }

        render() {
            return (
                <Route
                    {...rest}
                    render={(props) => this.isAuthenticated === true ? 
                    <Component {...props} {...rest} /> : 
                    <Redirect to="/user/login" />}
                />
            )
        }
    }

    AuthenticatedRoute.propTypes = {
        isAuthenticated: PropTypes.bool,
        addFlashMessages: PropTypes.func
    }
    
    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }
    
    return connect(mapStateToProps, {
        addFlashMessages
    })(AuthenticatedRoute)
};

export default AuthenticatedRoute

