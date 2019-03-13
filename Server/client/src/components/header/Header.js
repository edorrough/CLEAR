import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../assets/search-icon.png';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header-wrapper">
                <div className="header-container-max">
                    <div className="branding">
                        <div className="branding-row">

                            <Link to="/#" className="row-parts">
                                <img 
                                    src="https://www.colorado.edu/lab/clear/profiles/express/themes/expressbase/images/cu-logo.svg"
                                    alt="Home"
                                />
                                <span>
                                    <div>Computational Language and Education Research</div>
                                    <div>CLEAR</div>
                                    <p>university of colorado <strong>boulder</strong></p>
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="search-section">
                        <img src={searchIcon} alt="search" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;