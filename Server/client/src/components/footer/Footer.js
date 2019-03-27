import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Footer.css';

const requiredLinks = [
    {
        id: 1,
        defaultLink: 'http://www.colorado.edu/about/privacy-statement',
        defaultMessage: 'Privacy'
    },
    {
        id: 2,
        defaultLink: 'http://www.colorado.edu/about/legal-trademarks',
        defaultMessage: 'Legal & Trademarks'
    },
    {
        id: 3,
        defaultLink: 'http://www.colorado.edu/map',
        defaultMessage: 'Campus Map'
    }
]

const Footer = (props) => {

    const listMenuItem = requiredLinks.map((footerItem) => {

        return (
            <li key={footerItem.id} className="linksList">
                <Link to={footerItem.defaultLink}>
                    {footerItem.defaultMessage}
                </Link>
            </li>
        )
    });

    

    return (
        <div className="footer">
        {/* <div className= { props.location.pathname === "/" ? 'footer-home' : 'footer-others' }> */}
            {/* {listFooterMenuItem} */}

            <div className="site-infor-wrapper">
                <div className="site-info">
                    <div className="site-info-content">
                        <h2 className="block-title"
                            // onClick={() => window.scrollTo(0, 0)}
                            onClick={props.scrollToTop}
                        >
                            Computational Language and Education Research CLEAR
                        </h2>
                        <p>
                            The Center for Computational Language and Education Research c/o Martha Palmer <br/>
                            UCB 295 Hellems <br/>
                            Department of Linguistics<br/>
                            University of Colorado<br/>
                            Boulder, Colorado, 80309<br/>
                        </p>
                        
                    </div>
                    <div className="cu-footer">
                        <p>
                            <Link to="/">
                                <img src="https://www.colorado.edu/lab/clear/profiles/express/themes/expressbase/images/beboulder/be-boulder-white.png"
                                    alt="University of Colorado Boulder"
                                />
                            </Link>
                        </p>
                        <p><strong>
                                <Link to="/" className="cu-boulder-title">University of Colorado Boulder</Link>
                            </strong></p>
                        <p>© Regents of the University of Colorado</p>
                        <span>
                            {listMenuItem}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default withRouter(Footer);
