import React from 'react';
import NavbarToggleButton from './navbarToggleButton/navbarToggleButton';
import { Link } from 'react-router-dom';
import './CustomNavbar.css';
import { withRouter } from 'react-router-dom';

const navPaths = [
    {   path: '/people/faculty', main: "People" },
    {   path: '/projects', main: "Projects" },
    {   path: '/our-educational-programs', main: "Education" },
    {   path: '/media-and-current-events', main: "Media and Current Events" },
    {   path: '/contact-us', main: "Contact us" }
]
    
const CustomNavbar = props => {
    return (
        <header className= { props.location.pathname === "/" || props.location.pathname === "/contact-us" ? 'navbar' : ""} >
            <nav className={props.scrollYvalue > 761 || props.scrollYvalue > 568 || props.scrollYvalue > 120 ? 'navbar-navigation-change' : 'navbar-navigation'}>
                
                <div className="navbar-logo-title">
                    <Link to="/">
                        <i className="home icon"></i>
                        The Clear
                    </Link>
                </div>

                {/* spacer separate logo and navigation */}
                <div className="spacer" />

                <div className="navbar-navigation-items">
                    <ul>
                        {navPaths.map((navPath) => (
                            <Link to={navPath.path} key={navPath.path}>
                                <button>
                                    {navPath.main}
                                </button>
                            </Link>

                        ))}
                    </ul>
                </div>
                <div className="navbar-toggle-button">
                    <NavbarToggleButton click={props.drawerClickHandler}/>
                </div>
            </nav>
        </header>
    )
}

export default withRouter(CustomNavbar);