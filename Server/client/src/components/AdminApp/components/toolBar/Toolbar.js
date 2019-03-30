import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DrawerToggleButton from '../sideDrawer/DrawerToggleButton';
import { logout } from '../../../../actions/authAction';
import './Toolbar.css';

class Toolbar extends Component {
// const toolbar = props => (
    logout = (e) => {
        e.preventDefault();
        this.props.logout(); 
    }

    render() {
        return (
            <header className="toolbar">
                <nav className="toolbar_navigation">
                    <div className="toolbar_toggle-button">
                        <DrawerToggleButton click={this.props.drawerToggleClickHandler} />
                    </div>
                    <div className="toolbar_logo">
                        <Link to="/">The Clear</Link>
                    </div>
                    <div className="spacer" />
                    <div className="toolbar_navigation-items">
                        <ul>
                            <li><Link to="/admins">Dashboard</Link></li>
                            <li><Link to="/admins/users">Users and Images</Link></li>
                            <li><Link to="/admins/todosList">Todo</Link></li>
                            {/* <li><a href="/api/logout" onClick={this.logout.bind(this)}>Log out</a></li> */}
                            <li><a href="/#" onClick={this.logout.bind(this)}>Log out</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default connect(null, {
    logout
})(Toolbar)