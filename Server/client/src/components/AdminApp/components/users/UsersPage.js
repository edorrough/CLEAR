import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UsersPageNav from './UsersPageNav';
import UsersForm from './usersForms/UsersForm';
import CurrentUsers from './UsersList';
import AuthenticatedRoute from '../utils/AuthenticatedRoute';
import { connect } from 'react-redux';
import { fetchAdmins } from '../../../../actions/userCRUDaction'

import {
    BrowserRouter as Router
} from 'react-router-dom';

const routes = [
    { path: '/admins/current-admins', exact: true, main: () => <CurrentUsers /> },
    { path: '/admins/users/AddNewAdmins', exact: true, main: () => <UsersForm /> },
    { path: '/admins/users/AddNewAdmins/:_id', exact: true, main: (routerProps) => <UsersForm params={routerProps.match.params}/> },
]

class UsersPage extends Component {
    componentDidMount() {
        this.props.fetchAdmins();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <Router>
                <div className="users-page">
                    <UsersPageNav />

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

UsersPage.propTypes = {
    fetchAdmins: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {
    fetchAdmins
})(UsersPage)