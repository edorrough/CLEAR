import React, { Component } from 'react';
import { connect } from 'react-redux';
import Person from './PersonBio.js';

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
                        
                        <Person 
                            name="Susan Brown" 
                            img={require("../../assets/people/susan_brown.png")}
                            imgx=""
                            imgy=""
                            title="Adjunct Assistant Professor" 
                            dept="Linguistics" 
                            info="Specialization / Interests: Natural language processing, computational semantics, lexical resources and ontologies." 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Mans Hulden" 
                            img="https://www.colorado.edu/lab/clear/sites/default/files/styles/small_thumbnail/public/people/mans_hulden.png?itok=HG8kUHqS" 
                            imgx=""
                            imgy=""
                            title="Assistant Professor" 
                            dept="Linguistics" 
                            info="Interests: Computational linguistics, natural language processing, computational phonology and morphology, grammatical inference, formal language theory, learnability of natural language, machine learning, and (computational) historical linguistics." 
                            email="mans.hulden@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="James Martin" 
                            img="https://www.colorado.edu/lab/clear/sites/default/files/styles/small_thumbnail/public/people/jim_martin_4.cuphoto.jpg?itok=GIUrH6Ig"
                            imgx="100"
                            imgy="140"
                            title="Professor" 
                            dept="Computer Science" 
                            info="Specialization / Interests: Natural language processing and machine learning with applications to computational semantics; cognitive linguistics with a focus on metaphor and other forms of non-literal language" 
                            email="james.martin@colorado.edu" 
                            phone="303 735 5196"/>
                        
                        <Person 
                            name="Martha Palmer" 
                            img="https://www.colorado.edu/lab/clear/sites/default/files/styles/small_thumbnail/public/people/martha.jpg?itok=eenS9nts"
                            imgx="100"
                            imgy="125"
                            title="Professor" 
                            dept="Linguistics and Computer Science" 
                            info="" 
                            email="martha.palmer@colorado.edu" 
                            phone="303 735 3027"/>
                        
                        <Person 
                            name="Michael Paul" 
                            img="https://www.colorado.edu/lab/clear/sites/default/files/styles/small_thumbnail/public/people/michael_paul.jpg?itok=S64s_2hj"
                            imgx="100"
                            imgy="121"
                            title="Assistant Professor" 
                            dept="Information Science" 
                            info="Interests: Topic modeling, exploratory machine learning, social media analysis, computational social science, health informatics." 
                            email="michael.j.paul@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="Tammy Sumner" 
                            img="https://www.colorado.edu/lab/clear/sites/default/files/styles/small_thumbnail/public/people/tamara_sumner.png?itok=i9-mVOBY"
                            imgx="100"
                            imgy="117"
                            title="Professor • Directory of ICS" 
                            dept="Cognitive Science Institute • Computer Science" 
                            info="" 
                            email="tammy.sumner@colorado.edu" 
                            phone="303 735 4469"/>
                        
                        <Person 
                            name="Sarel Van Vuuren" 
                            img={require("../../assets/people/sarel_van_vuuren.jpg")}
                            imgx="100"
                            imgy="134"
                            title="Associate Research Professor" 
                            dept="Cognitive Science Institute" 
                            info="" 
                            email="sarel.vanvuuren@colorado.edu" 
                            phone="303 735 5265"/>
                        
                        <Person 
                            name="Wayne Ward" 
                            img={require("../../assets/people/wayne_ward.jpg")}
                            imgx=""
                            imgy=""
                            title="Research Professor" 
                            dept="Computational Language and Education Research" 
                            info="" 
                            email="wayne.ward@colorado.edu" 
                            phone="303 735 5070"/>
                        
                    </div>  
                </div>

                {/* Admins */}

                <div id="admin-section" className="tab-details">
                    <div className="people-list-wrapper-teaser">
                        
                        <Person 
                            name="Cynthia Clark" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Graduate Program Assistant" 
                            dept="" 
                            info="" 
                            email="cynthia.clark@colorado.edu" 
                            phone="303-492-8456"/>
                            
                        <Person 
                            name="Paula Dufour" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Program Assistant" 
                            dept="" 
                            info="" 
                            email="paula.dufour@colorado.edu" 
                            phone="303-492-8455"/>
                            
                    </div>
                </div>
                
                {/* Current Research Staff */}

                <div id="current-research-section" className="tab-details">
                    <div className="people-list-wrapper-teaser">
                    
                        <Person 
                            name="Julia Bonn" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="julia.bonn@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="Ahmed Elsayed" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Staff" 
                            dept="" 
                            info="" 
                            email="ahmed.s.elsayed@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="Jenette Preciado" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="jenette.preciado@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="Michael Regan" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="michael.regan@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="Kristin Wright-Bettner" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="kristin.wrightbettner@colorado.edu" 
                            phone=""/>
                        
                    </div>
                </div> 

                {/* Former Research Staff */}

                <div id="research-section" className="tab-details">
                    <div className="people-list-wrapper-teaser">
                    
                        <Person 
                            name="Muhammed Aitmoulay" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="James Babani" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Robert Bowen" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="robert.bowen@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="Kevin Crooks" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="George Figgs" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Amanda Howard" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Jacquelynn Montoya" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Nattawut Ngampatipatpong" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Senior Prof. Research Assistant" 
                            dept="" 
                            info="System architecture Design, Database and Software Development (in ICARE, CARLA, ORLA Web and 3D-Animation Project)." 
                            email="ngampati@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="Laurell Richey" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="Helping create materials, supervising work-study students, and helping elementary students and teachers use the programs well in the schools for ICARE and CARLA Project." 
                            email="laurell.richey@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="Luann Sessions" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Prof. Research Assistant" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Taylor Struemph" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Prof. Research Assistant" 
                            dept="" 
                            info="" 
                            email="taylor.struemph@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="Joel Terrell" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Prof. Research Assistant" 
                            dept="" 
                            info="Development of creative comprehension questions for CARLA. Content development (exercises, stories, books, interactive scripts, etc) for CARLA. Literacy testing for children Kdg-5. Monitoring and encouraging students. IT services (network and hardware troubleshooting)." 
                            email="terellj@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="Tammy Tomczyk" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Prof. Research Assistant" 
                            dept="" 
                            info="" 
                            email="tammy.tomczyk@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="Jariya Tuantranont" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Senior Prof. Research Assistant" 
                            dept="" 
                            info="Programming and design User Interfaces, graphics and animation in many projects; (ICARE, CARLA, ORLA Web). Web Master for CLEAR web site." 
                            email="jariya.tuantranont@colorado.edu" 
                            phone=""/>
                        
                    </div>
                </div> 

                {/* Students */}

                <div id="student-section" className="tab-details">
                    <div className="people-list-wrapper-teaser">
                    
                        <Person 
                            name="James Endicott" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="James Gung" 
                            img={require("../../assets/people/james_gung.jpg")}
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Ghazaleh Kazeminejad" 
                            img={require("../../assets/people/ghazelah_kazeminejad.jpg")}
                            imgx="100"
                            imgy="134"
                            title="" 
                            dept="Linguistics" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Ling Liu" 
                            img={require("../../assets/people/ling_liu.jpg")}
                            imgx="100"
                            imgy="134"
                            title="" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Skatje Myers" 
                            img={require("../../assets/people/skatje_myers.jpg")}
                            imgx="100"
                            imgy="129"
                            title="" 
                            dept="Computer Science" 
                            info="Specialization / Interests: NLP, machine learning" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Tim O'Gorman" 
                            img={require("../../assets/people/tim_ogorman.jpg")}
                            imgx="100"
                            imgy="133"
                            title="" 
                            dept="Linguistics" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Daniel Peterson" 
                            img={require("../../assets/people/daniel_peterson.jpg")}
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Kevin Stowe" 
                            img={require("../../assets/people/kevin_stowe.jpg")}
                            imgx="100"
                            imgy="133"
                            title="" 
                            dept="Linguistics" 
                            info="Specialization / Interests: Computational semantics, machine learning, metaphor detection and interpretation, NLP for social media" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Abhijit Suresh" 
                            img={require("../../assets/people/abhijit_suresh.jpg")}
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Cognitive Artificial Intelligence (Interdisciplinary)" 
                            email="" 
                            phone=""/>
                        
                    </div>
                </div> 

                {/* Alumni */}

                <div id="alumni-section" className="tab-details">
                    <div className="people-list-wrapper-teaser">
                    
                        <Person 
                            name="Lee Becker" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Natural Language Processing, Computational Semantics, Intelligent Tutoring Systems, Dialogue Management, Question Generation, Educational Data Mining" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Chih How Bong" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests : Text Classification, Information Retrieval, Natural Language Processing, Intelligence Tutoring Systems Current Position: Faculty of Computer Science and Information Technology, University Malaysia Serawak" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Claire Bonial" 
                            img="https://www.colorado.edu/lab/clear/sites/default/files/styles/small_thumbnail/public/people/claire_bonial.jpeg?itok=4ZBlWqHS"
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Daniel Cer" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Current position : Postdoctoral Researcher Stanford University" 
                            email="" 
                            phone=""/>
                            
                        <Person 
                            name="Wei-Te Chen" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="Computer Science" 
                            info="Specialization / Interests: Semantic Parsing, Machine Translation, Semantic Role Labelling, Annotation Tool Design" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Ying Chen" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Current position : Associate Professor China Agricultural University" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Jinho Choi" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests : Dependency Parsing, Semantic Role Labelling, Machine Translation Current Position: Assistant Professor Emory University" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Katie Conger" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="kathryn.conger@colorado.edu" 
                            phone=""/>
                        
                        <Person 
                            name="William Corvey" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Discourse Processing, Computer Mediated Communication" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Sebastian De la Chica" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Current position : Senior Applied Researcher, Bing Microsoft" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Dimitriy Dligach" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Efficient Annotation Current Position Researcher Harvard Medical School, Childern's Hospital, Boston" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Nicholas Dronen" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Ahmad Faisal" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Current Position Google" 
                            email="" 
                            phone=""/>
                            
                        <Person 
                            name="Bill Foland" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="Computer Science" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Maha Foster" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Language Acquisition" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Meredith Green" 
                            img=""
                            imgx=""
                            imgy=""
                            title="Research Assistant" 
                            dept="" 
                            info="" 
                            email="meredithgrrrl@gmail.com" 
                            phone=""/>
                        
                        <Person 
                            name="Alvin Grissom II" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="Computer Science" 
                            info="" 
                            email="" 
                            phone=""/>
                            
                        <Person 
                            name="Shudong Hao" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="Computer Science" 
                            info="" 
                            email="" 
                            phone=""/>
                            
                        <Person 
                            name="Jena Hwang" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Computational Linguistics / NLP Current Position Resarch Associate Florida Institute for Human and Machine Cognition Oracle" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Kirill Kireyev" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Current position : Founder, Instagrok" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Praful Mangalath" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Current position : Prismatic" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Aous Mansouri" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Semitic linguistics, semantics, tense and aspect - specifically imperfective constructions, Arabic dialectology" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Keith Maull" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Educational Informatics, Data Mining, Computational Models of Pedagogy in Digital Learning Contexts" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Philip Ogren" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: My dissertation focused on syntactic coordination resolution in the biomedical domain using machine learning and language modeling. I enjoy building open source solutions for natural language processing tasks and am a contributor to several open source projects including ClearTK and uimaFIT. Current Position : Oracle" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Ifeyinwa Okoye" 
                            img="https://www.colorado.edu/lab/clear/sites/default/files/styles/small_thumbnail/public/people/ifi_okoye.jpg?itok=-eVRqgVL"
                            imgx="100"
                            imgy="107"
                            title="" 
                            dept="" 
                            info="Specialization / Interests: My research interest spans text analytics, natural language processing, adaptive and personalization technology, user modeling and educational technology such as intelligent tutoring systems." 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Sameer Pradhan" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Current position : Researcher Harvard Medical School, Children's Hospital, Boston" 
                            email="" 
                            phone=""/>
                            
                        <Person 
                            name="Forough Poursabzi-Sangdeh" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="Computer Science" 
                            info="Specialization / Interests: NLP, machine learning, interacting with humans for improving machine learning and NLP algorithms" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Franco Salvetti" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Current position : Principal Software Engineer, Bing Microsoft" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="William Styler" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Acoustic and articulatory phonetics, vowels and vowel perception, speaker normalization, speech perception, computerized speech measurement techniques, phonology, medical speech and terminology analysis, UMLS entity and relation annotation and automated medical-record analysis. Current Position : Postdoctoral Researcher University of Michigan" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Arafat Sultan" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="Psychology" 
                            info="" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Ashwini Vaidya" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Computational Linguistics &amp; Corpus Linguistics Current Position : Postdoctoral fellowship IIT-Delhi" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Sudha Verma" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: NLP, Web/Social Media, Information Extraction for crisis events" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Philipp Wetzler" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Natural Language Processing, Computational Semantics, Machine Learning, Document Quality, Digital Libraries Current Position : Google" 
                            email="" 
                            phone=""/>
                        
                        <Person 
                            name="Shumin Wu" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Machine Translation, Coreference Resolution, Semantic Role Labeling Current Position : Hitachi" 
                            email="" 
                            phone=""/>
                            
                    </div>
                </div> 

                {/* Postdoctoral Fellows */}

            <div id="post-section" className="tab-details">
                <div className="people-list-wrapper-teaser">
                
                    <Person 
                            name="Steven Bethard" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Current position : Assistant Professor University of Arizona School of Information" 
                            email="" 
                            phone=""/>
                    
                    <Person 
                            name="Riyaz Bhat" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="" 
                            email="riyaz.ah.bhat@colorado.edu" 
                            phone=""/>
                    
                    <Person 
                            name="Abdelati Hawwari" 
                            img=""
                            imgx=""
                            imgy=""
                            title="" 
                            dept="" 
                            info="Specialization / Interests: Lexical semantics(Arabic Lexical Resources) Computational Lexicography Arabic Morphology" 
                            email="abdelati.hawwari@colorado.edu" 
                            phone=""/>
                    
                    <Person 
                            name="Rodney Nielsen" 
                            img="https://www.colorado.edu/lab/clear/sites/default/files/styles/small_thumbnail/public/people/rodney_nielsen.jpg?itok=yxGYxbLa"
                            imgx="100"
                            imgy="133"
                            title="" 
                            dept="" 
                            info="Currently working as an Associate Professor in Computer Science and Engineering at the University of North Texas. Specialization / Interests: Machine learning, computational semantics, natural language processing, cognitive science, and the application of these fields to educational technology, clinical informatics, companion robots, and end-user programming." 
                            email="" 
                            phone=""/>
                </div>
            </div> 
            
            {/* Pad out the bottom of the body to prevent the footer from clipping into it */}
            <div className="padding"></div>
            
            </div>
            
            
            
            )
    }
}


export default People;
