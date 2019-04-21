import React from 'react';
import { NavLink } from 'react-router-dom';
import './common.css';

const SchedulersNav = props => (
    <div className="navbar-container">
        <div className="ui container">
            <div className="ui three item menu">
                <NavLink 
                    className="item" 
                    activeClassName="active" 
                    to="/admins/events/current-events"
                >
                    Current events
                </NavLink>
                <NavLink 
                    className="item" 
                    activeClassName="active" 
                    to="/admins/events/add-new-event"
                >
                    Add New Event
                </NavLink>
                <NavLink
                    className="item" 
                    activeClassName="active" 
                    to="/admins/events/add-new-visitor-event"
                >
                    Add New Visitor Event
                </NavLink>
            </div>
        </div>
    </div>
)

export default SchedulersNav;