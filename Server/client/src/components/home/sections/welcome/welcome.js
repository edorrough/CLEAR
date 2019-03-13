import React, { Component } from 'react';
// import './welcome.css';
// import SlideShow from 'react-image-show';
import Page1 from './subPages/Page1';
import Page2 from './subPages/Page2';
import Page3 from './subPages/Page3';

// const imagesArray = [
//     'https://previews.123rf.com/images/netsay/netsay1602/netsay160217529/52465446-man-hand-writing-linguistics-with-black-marker-on-visual-screen-isolated-on-background-business-tech.jpg',
//     'https://previews.123rf.com/images/lculig/lculig1504/lculig150400041/38911419-hand-writing-learn-linguistics-on-grey-background.jpg',
//     'http://www.international.nu.ac.th/assets/Doctor-of-Philosophy-Program-in-Linguistics.jpg'
// ]

// const Welcome = props => (
class Welcome extends Component {

    state = {
        step: 1,
        translateValue: 0
    }
    nextPage = () => {
        let { step } = this.state;
        this.setState({
            step: step + 1
        });
    }
    prevPage = () => {
        let { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    render() {
        let { step } = this.state;
        // if(step)
        // if(step === 4) { step = 1 }
        // if(step === 0 || 4) { this.resetStep() }
        // console.log(step)

        switch(step) {
            case 1:
                return (
                    <Page1 
                        nextPage={this.nextPage}
                        // prevPage={this.prevPage}
                        style={{
                            transform: `translateX(${this.state.translateValue}px)`,
                            transition: 'transform ease-out 0.45s'
                        }}
                    />
                )

            case 2:
                return (
                    <Page2 
                        nextPage={this.nextPage}
                        prevPage={this.prevPage}
                        style={{
                            transform: `translateX(${this.state.translateValue}px)`,
                            transition: 'transform ease-out 0.45s'
                        }}
                    />
                )
            case 3:
                return (
                    <Page3
                        // nextPage={this.nextPage}
                        prevPage={this.prevPage}
                    />
                )

            default:
                
        }
    }
}

export default Welcome;