import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show) {
        drawerClasses = 'side-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <ul className="side-drawer-list">
                <li><Link to="/admins">Dashboard</Link></li>
                <li><Link to="/admins/users">Users and Images</Link></li>
                <li><Link to="/admins/emailyList">Email List</Link></li>
                <li><Link to="/admins/scheduler">Scheduler</Link></li>
                <li><a href="/#" onClick={props.logout}>Log out</a></li>
            </ul>
        </nav>
    )
};

export default sideDrawer;
