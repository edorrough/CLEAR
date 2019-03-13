import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from 'react-router-dom';

import Header from '../components/header/Header';
import Navbar from './customNavbar/CustomNavbar';
import SideDrawer from './customNavbar/sideDrawer/sideDrawer';
import Backdrop from './customNavbar/backDrop/backDrop';
import Home from './home/Home';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)

        this.myRef = React.createRef()
        this.state = {
            scrollTop: 0,
            sideDrawerOpen: false,
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
        console.log("he")
        window.scrollTo(0, 0)
    }

    render() {

        console.log("React version: ", React.version);
        let backdrop;
        if(this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
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

                        <Switch>
                            <Route exact path="/" component={Home}/>

                        </Switch>

                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
