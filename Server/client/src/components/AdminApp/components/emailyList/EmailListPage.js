import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmailsList from './EmailsList';
import EmailsForm from './EmailsForm';
import AuthenticatedRoute from '../utils/AuthenticatedRoute';
import { connect } from 'react-redux';
import { fetchUserEmails } from '../../../../actions/userEmailsAction';
import {
    BrowserRouter as Router,
    NavLink
} from 'react-router-dom';
import './common.css';

const EmailListNav = (props) => (
    <div className="navbar-container">
        <div className="ui container">
            <div className="ui two item menu">
                <NavLink 
                    className="item" 
                    activeClassName="active" 
                    to="/admins/current-userslist"

                >
                    Current User List
                </NavLink>
                <NavLink 
                    className="item" 
                    activeClassName="active" 
                    to="/admins/users/AddNewUserOnList"

                >
                    Add New User
                </NavLink>
            </div>
        </div>
    </div>
)

const routes = [
    { path: '/admins/current-userslist', exact: true, main: () => <EmailsList /> },
    { path: '/admins/users/AddNewUserOnList', exact: true, main: () => <EmailsForm /> },
    { path: '/admins/users/AddNewUserOnList/:_id', exact: true, main: (routerProps) => <EmailsForm params={routerProps.match.params}/> },
]

class EmailListPage extends Component {
    
    componentDidMount = () => {
        this.props.fetchUserEmails();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <Router>
                <div className="emaily-page">
                    <EmailListNav />

                    {routes.map((route) => (
                        <AuthenticatedRoute
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                            isAuthenticated={isAuthenticated}
                        />
                    ))}

                </div>
            </Router>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

EmailListPage.propTypes = {
    users: PropTypes.array
}

export default connect(mapStateToProps, {
    fetchUserEmails
})(EmailListPage);