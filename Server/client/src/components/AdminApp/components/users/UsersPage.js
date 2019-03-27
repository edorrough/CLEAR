import React, { Component } from 'react';
// import PropTypes from 'prop-types';s
import UsersPageNav from './UsersPageNav';
import UsersForm from './usersForms/UsersForm';
import CurrentUsers from './UsersList';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

const routes = [
    { path: '/users/current-user', exact: true, main: () => <CurrentUsers /> },
    { path: '/users/AddNewUsers', exact: true, main: () => <UsersForm /> },
    { path: '/user/:_id', exact: true, main: (routerProps) => <UsersForm params={routerProps.match.params._id}/> },

]

export default class UsersPage extends Component {

    render() {
        return (
            <Router>
                <div className="users-page">
                    <UsersPageNav />


                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                        >
                        </Route>
                    ))}
                </div>
            </Router>
        )
    }
}
