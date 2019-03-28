import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6

import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from 'react-router-dom';

import Header from '../components/header/Header';
import Footer from './footer/Footer';
import Navbar from './customNavbar/CustomNavbar';
import SideDrawer from './customNavbar/sideDrawer/sideDrawer';
import Backdrop from './customNavbar/backDrop/backDrop';
import Home from './home/Home';
import UserLogin from './login/userLogin';
import PasswdForgot from './passwdForgot/PasswdForgot';
import ResetPasswd from './resetPasswd/ResetPasswd';
import ContactUS from './contactUS/ContactUS';
import NoMatch from './noMatch/NoMatch';

import './App.css';

import Projects from './projects/Projects';


import { connect } from 'react-redux';
import AdminApp  from './AdminApp/AdminApp';

// import AuthenticateRoute from '../utils/AuthenticateRoute';

import AuthenticatedRoute from '../utils/authenticatedRoute';
import FlashMessagesList from './flash/FlashMessagesList';

class App extends Component {
    constructor(props) {
        super(props)

        this.myRef = React.createRef()
        this.state = {
            scrollTop: 0,
            sideDrawerOpen: false,
            authenticated: false,
        }
    }

    componentDidMount() {
      // this.props.fetchUser();
      // this.showMsg();
      window.addEventListener('scroll', this.handleScroll);
    };

    handleScroll = () => {
        this.setState({scrollY: window.scrollY});
    }
  
    showMsg = () => {
        window.confirm("For better experience, we suggest you broswer this website with Google Chrome")
    }

    onScroll = () => {
        const scrollTop = this.myRef.current.scrollTop;
        this.setState({
          scrollTop: scrollTop
        })
    };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => ({
            sideDrawerOpen: !prevState.sideDrawerOpen
        }))
    };
  
    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false })
    };

    scrollToTop = (e) => {
        e.preventDefault();

        window.scrollTo(0, 0)
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        console.log("React version: ", React.version);
        let backdrop;
        if(this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }

        if(isAuthenticated) {
            return <AdminApp/>
        }
        

        return (
            <div 
                className="App"
                ref={this.myRef}
                onScroll={this.onScroll}
              >
                <Router>
                    <div className="App-container">
                        <Header />

                        <Navbar 
                            scrollYvalue={this.state.scrollTop}
                            drawerClickHandler={this.drawerToggleClickHandler}
                        />
                        
                        <SideDrawer show={this.state.sideDrawerOpen} />
                        {backdrop}
                        <FlashMessagesList />

                        <Switch>
                            <Route exact path="/" component={Home}/>

                            {/* new2: working */}
                            {/* <AuthenticatedRoute 
                                path="/projects" 
                                component={Projects}
                                isAuthenticated={isAuthenticated}
                            /> */}

                            {/* Completely Working */}
                            <Route path="/projects" component={AuthenticatedRoute(Projects)} />



                            <Route path="/user/passwd-forgot" component={PasswdForgot} />

                            <Route path="/user/login" component={UserLogin} />
                            <Route path="/recover/passwd_reset/:token" component={ResetPasswd} />

                            <Route path="/contact-us" component={ContactUS} />
                            <Route component={NoMatch} />
                        </Switch>

                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

App.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = (state) => {
    // console.log("state in App.js: ", state)
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {

})(App)