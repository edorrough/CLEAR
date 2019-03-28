import React, { Component } from 'react';
import BackDrop from './components/backDrop/BackDrop';
import Toolbar from './components/toolBar/Toolbar';
import SideDrawer from './components/sideDrawer/SideDrawer';
import UsersPage from './components/users/UsersPage';
import FlashMessagesList from '../flash/FlashMessagesList';

import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';

function AuthenticatedRoute({ component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true ? 
            <Component {...props} {...rest} /> : 
            <Redirect to="/user/login" />}
        />
    )
}

const routes = [
    {   path: '/', exact: true, main: () => <div>Dashboard!</div> },
    {   path: '/users', exact: true, main: () => <UsersPage />},
    {   path: '/todosList', exact: true, main: () => <div></div> },
]

class AdminApp extends Component {
    state = {
        sideDrawerOpen: false,
        authenticated: true
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
                        <SideDrawer show={this.state.sideDrawerOpen} />
                        {backDrop}
                        <FlashMessagesList />
                        
                        {routes.map((route) => (
                            <AuthenticatedRoute
                                exact
                                key={route.path}
                                path={route.path}
                                component={route.main}
                                authenticated={this.state.authenticated}
                            />
                            // <Route
                            //     key={route.path}
                            //     path={route.path}
                            //     exact={route.exact}
                            //     component={route.main}
                            // ></Route>
                        ))}
                    </div>
                </Router>
            </div>
        )
    }
}

export default AdminApp;