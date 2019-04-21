import React from 'react';
import './sideDrawer.css';
import { Link } from 'react-router-dom';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show) {
        drawerClasses = 'side-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <div className="drawer-header">
                <div className="drawer-header-wrapper">
                    <Link to="/">
                        <img
                            src="https://www.colorado.edu/lab/clear/profiles/express/themes/expressbase/images/cu-logo.svg"
                            alt="CU-Boulder-logo"
                        />
                    <p>Computational Language and Education Research</p>
                    </Link>
                </div>
            </div>

            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/people">People</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/education">Education</Link></li>
                <li><Link to="/contact-us">Contact us</Link></li>
                <li><Link to="/user/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default sideDrawer;