import React from 'react';
import { NavLink } from 'react-router-dom';
import './common.css';

const SchedulersNav = props => (
    <div className="navbar-container">
        <div className="ui container">
            <div className="ui four item menu">
                <NavLink 
                    className="item" 
                    activeClassName="active"
                    to="/admins/events/current-events"
                >
                    Public Events
                </NavLink>
                <NavLink 
                    className="item" 
                    activeClassName="active" 
                    to="/admins/events/add-new-event"
                >
                    Add Public Event
                </NavLink>
                <NavLink
                    className="item"
                    activeClassName="active"
                    to="/admins/events/private"
                >
                    Private Events
                </NavLink>
                <NavLink
                    className="item" 
                    activeClassName="active" 
                    to="/admins/events/add-new-visitor-event"
                >
                    Add Private Event
                </NavLink>
            </div>
        </div>
    </div>
)

export default SchedulersNav;