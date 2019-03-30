import React from 'react';
import { NavLink } from 'react-router-dom';
import './common.css';

const UsersNav = props => (
    <div className="navbar-container">
        <div className="ui container">
            <div className="ui two item menu">
                
                <NavLink 
                    className="item" 
                    activeClassName="active" 
                    to="/admins/current-admins"
                >
                    User List
                </NavLink>
                <NavLink 
                    className="item" 
                    activeClassName="active" 
                    to="/admins/users/AddNewAdmins"
                >
                    Add New User
                </NavLink>
            </div>
        </div>
    </div>
)

export default UsersNav;