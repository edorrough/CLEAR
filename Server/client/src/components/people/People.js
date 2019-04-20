import React, { Component } from 'react';
import { connect } from 'react-redux';
import Person from './PersonBio.js';
import { faculty, admins, researchStaff, formerResearchStaff, students, alumni, postDocs } from './PeopleList.js';

import './people.css';

class People extends Component {

    constructor(props){
        super(props);
        this.openTab = this.openTab.bind(this);
    }

    //Function that governs opening tabs when a tab is clicked.
    openTab(evt, tab, sibling, mob=false) {
      var i, contents, links;

      //Set all tabs to closed.
      contents = document.getElementsByClassName("tab-details");
      for (i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
      }

      //Set all tabs to inactive.
      links = document.getElementsByClassName("tab-button");
      for (i = 0; i < links.length; i++) {
        links[i].className = links[i].className.replace(" active", "");
      }
      
      //Open the tab we want, scroll it to the top (if not in mobile mode, and set it and the corresponding mobile tab to active.)
      document.getElementById(tab).style.display = "block";
      document.getElementById(tab).scrollTop = 0;
      document.getElementById(evt).className += " active";
      document.getElementById(sibling).className += " active";
      
      //If this is a mobile tab, scroll the page to the top of the current list.
      if (mob){
        this.pageTop.scrollIntoView({ behavior: "smooth" });
      }
    } 

    
    render() {
        return(
            <div id="people-wrapper">
            
                {/* Dummy div used as a scroll target. */}
                <div id="dummy" style={{ position:"relative", top: -100 }} ref={(e) => { this.pageTop = e; }} />
            
                {/* Normal tab display, to be shown when not on a mobile screen.*/}
                <div className="normal-display">
                    <div className="tab">
                      <button id="norbtn1" className="tab-button active" onClick={() => this.openTab('norbtn1', 'faculty-section', 'mobbtn1')}>Faculty</button>
                      <hr className="divider"/>
                      <button id="norbtn2" className="tab-button" onClick={ () => this.openTab('norbtn2', 'admin-section', 'mobbtn2')}>Admin Staff</button>
                      <hr className="divider"/>
                      <button id="norbtn3" className="tab-button" onClick={ () => this.openTab('norbtn3', 'current-research-section', 'mobbtn3')}>Current Research Staff</button>
                      <hr className="divider"/>
                      <button id="norbtn4" className="tab-button" onClick={ () => this.openTab('norbtn4', 'research-section', 'mobbtn4')}>Former Research Staff</button>
                      <hr className="divider"/>
                      <button id="norbtn5" className="tab-button" onClick={ () => this.openTab('norbtn5', 'student-section', 'mobbtn5')}>Students</button>
                      <hr className="divider"/>
                      <button id="norbtn6" className="tab-button" onClick={ () => this.openTab('norbtn6', 'alumni-section', 'mobbtn6')}>Alumni</button>
                      <hr className="divider"/>
                      <button id="norbtn7" className="tab-button" onClick={ () => this.openTab('norbtn7', 'post-section', 'mobbtn7')}>Postdoctoral Fellows</button>
                      <hr className="divider"/>
                    </div>
                </div>

                {/* Mobile mode tab display.*/}
                <div className="mobile-display">
                    <div className="mobile-subdisplay">
                        <div className="tab">
                        <button id="mobbtn1" className="tab-button active" onClick={() => this.openTab('mobbtn1', 'faculty-section', 'norbtn1', true)}>Faculty</button>
                        <hr className="divider" />
                        <button id="mobbtn2" className="tab-button" onClick={() => this.openTab('mobbtn2', 'admin-section', 'norbtn2', true)}>Admin Staff</button>
                        <hr className="divider" />
                        <button id="mobbtn3" className="tab-button" onClick={() => this.openTab('mobbtn3', 'current-research-section', 'norbtn3', true)}>Current Research Staff</button>
                        <hr className="divider" />
                        <button id="mobbtn4" className="tab-button" onClick={() => this.openTab('mobbtn4', 'research-section', 'norbtn4', true)}>Former Research Staff</button>
                        <hr className="divider" />
                        <button id="mobbtn5" className="tab-button" onClick={() => this.openTab('mobbtn5', 'student-section', 'norbtn5', true)}>Students</button>
                        <hr className="divider" />
                        <button id="mobbtn6" className="tab-button" onClick={() => this.openTab('mobbtn6', 'alumni-section', 'norbtn6', true)}>Alumni</button>
                        <hr className="divider" />
                        <button id="mobbtn7" className="tab-button" onClick={() => this.openTab('mobbtn7', 'post-section', 'norbtn7', true)}>Postdoctoral Fellows</button>
                        <hr className="divider" />
                        </div>
                    </div>
                </div>
                
                {/* 
                ============
                Tab contents
                ============
                */}
                
                {/* Faculty */}
                <div id="faculty-section" className="tab-details" style={{display : 'block'}}>
                    <div className="people-list-wrapper-teaser">
                    
                        {faculty.map(individual => 
                        <Person
                            individual={individual}
                        />)}
                        
                    </div>  
                </div>

                {/* Admins */}

                <div id="admin-section" className="tab-details">
                    <div className="people-list-wrapper-teaser">
                        
                       {admins.map(individual => 
                        <Person
                            individual={individual}
                        />)}
                            
                    </div>
                </div>
                
                {/* Current Research Staff */}

                <div id="current-research-section" className="tab-details">
                    <div className="people-list-wrapper-teaser">
                    
                    {researchStaff.map(individual => 
                        <Person
                            individual={individual}
                        />)}
                        
                    </div>
                </div> 

                {/* Former Research Staff */}

                <div id="research-section" className="tab-details">
                    <div className="people-list-wrapper-teaser">
                    
                    {formerResearchStaff.map(individual => 
                        <Person
                            individual={individual}
                        />)}
                        
                    </div>
                </div> 

                {/* Students */}

                <div id="student-section" className="tab-details">
                    <div className="people-list-wrapper-teaser">
                    
                        {students.map(individual => 
                        <Person
                            individual={individual}
                        />)}
                        
                    </div>
                </div> 

                {/* Alumni */}

                <div id="alumni-section" className="tab-details">
                    <div className="people-list-wrapper-teaser">
                    
                        {alumni.map(individual => 
                        <Person
                            individual={individual}
                        />)}
                        
                    </div>
                </div> 

                {/* Postdoctoral Fellows */}

                <div id="post-section" className="tab-details">
                    <div className="people-list-wrapper-teaser">
                    
                        {postDocs.map(individual => 
                            <Person
                                individual={individual}
                            />)}
                        
                    </div>
                </div> 
            
            {/* Pad out the bottom of the body to prevent the footer from clipping into it */}
            <div className="padding"></div>
            
            </div>
            
            
            
            )
    }
}


export default People;
