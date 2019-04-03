import React, { Component } from 'react';
import BackDrop from './components/backDrop/BackDrop';
import Toolbar from './components/toolBar/Toolbar';
import SideDrawer from './components/sideDrawer/SideDrawer';
import UsersPage from './components/users/UsersPage';
import FlashMessagesList from '../flash/FlashMessagesList';
import EmailyList from './components/emailyList/EmailListPage';
import AuthenticatedRoute from './components/utils/AuthenticatedRoute';
import Scheduler from './components/schedulers/Schedulers';
import { connect } from 'react-redux';
import { logout } from '../../actions/authAction';
import {
    BrowserRouter as Router,
} from 'react-router-dom';


const Dashboard = () => <div>Dashboard</div>


const routes = [
    {   path: '/admins', exact: true, main: () => <Dashboard /> },
    {   path: '/admins/users', exact: true, main: () => <UsersPage /> },
    {   path: '/admins/emailyList', exact: true, main: () => <EmailyList /> },
    {   path: '/admins/scheduler', exact: true, main: () => <Scheduler /> },
]

class AdminApp extends Component {
    state = {
        sideDrawerOpen: false,
    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    };

    backdropClickHanlder = () => {
        this.setState({ sideDrawerOpen: false })
    }

    render() {
        let backDrop;
        if(this.state.sideDrawerOpen) {
            backDrop = <BackDrop click={this.backdropClickHanlder} />
        }

        return (
            <div className="admin-app">
                <Router>
                    <div className="admin-app-wrapper">
                        <Toolbar drawerToggleClickHandler={this.drawerToggleClickHandler} />
                        <SideDrawer 
                            show={this.state.sideDrawerOpen} 
                            logout={this.props.logout}
                        />
                        {backDrop}
                        <FlashMessagesList />
                        
                        {routes.map((route) => (
                            <AuthenticatedRoute
                                exact
                                key={route.path}
                                path={route.path}
                                component={route.main}
                                isAuthenticated={this.props.isAuthenticated}
                            />
                        ))}

                    </div>
                </Router>
            </div>
        )
    }
}

export default connect(null, {
    logout
})(AdminApp);