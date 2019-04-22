import React from 'react';
import Page1 from './subPages/Page1';

// const imagesArray = [
//     'https://previews.123rf.com/images/netsay/netsay1602/netsay160217529/52465446-man-hand-writing-linguistics-with-black-marker-on-visual-screen-isolated-on-background-business-tech.jpg',
//     'https://previews.123rf.com/images/lculig/lculig1504/lculig150400041/38911419-hand-writing-learn-linguistics-on-grey-background.jpg',
//     'http://www.international.nu.ac.th/assets/Doctor-of-Philosophy-Program-in-Linguistics.jpg'
// ]

const translateValue = 0;

const Welcome = props => (
    <Page1 
        style={{
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out 0.45s'
        }}
    />
)


export default Welcome;