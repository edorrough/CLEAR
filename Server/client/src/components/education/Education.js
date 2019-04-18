import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Navbar from '../customNavbar/CustomNavbar';
import Introduction from './sections/introduction/introduction';
import ProgramRow from './sections/program_row/program_row';
import './Education.css';

class Education extends Component {

    render() {
        return (
            <div id="education-wrapper">
                <Introduction />

                {/* One row of content(Text on left and image grid on right)
                    The grid can support up to 4 previews */}
                <div className="programRows">
                    {this.props.educations.map(education => 
                        <ProgramRow
                            key={education.content_header_link}
                            education={education}
                    />)}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        educations: state.educations
    }
}

export default connect(mapStateToProps)(Education);


// class Education extends Component {

//     render() {
//       let default_preview_content = "For more information, visit their site";
        
//         return (
//             <div id="education-wrapper">
//               <Introduction />

//               {/* One row of content(Text on left and image grid on right)
//                 The grid can support up to 4 previews */}
//                 {this.props.education.map(item => <ProgramRow item={item} />)}
                

//               {/* <ProgramRow
//                 content_header="Department of Linguistics"
//                 content_header_link="https://www.colorado.edu/linguistics/"
//                 content_content="The Department of Linguistics at the University of Colorado Boulder is a major center of interdisciplinary research in cognitive-functional linguistics, computational linguistics, language documentation, psycholinguistics and experimental linguistics, and sociocultural linguistics. It offers a range of research programs targeting properties of spoken language. The Department's orientation is empirical: its approach to the structure and use of language confronts theory with first-hand observations. Analysis of video and audio data (typically conversational data), acoustic measurements of speech, computational modeling and statistical analysis, psycholinguistic experimentation and fieldwork in local communities and abroad all contribute to this enterprise."

//                 preview1_img={ling_undergrad}
//                 preview1_title="Lingustics Undergraduate Information"
//                 preview1_alt=""
//                 preview1_header="Undergrad"
//                 preview1_content={default_preview_content}
//                 preview1_link="https://www.colorado.edu/linguistics/undergraduate-program"

//                 preview2_img={ling_masters}
//                 preview2_title="Lingustics Masters Information"
//                 preview2_alt=""
//                 preview2_header="Graduate"
//                 preview2_content={default_preview_content}
//                 preview2_link="https://www.colorado.edu/linguistics/graduate-program"

//                 preview3_img={ling_phd}
//                 preview3_title="Lingustics PhD Information"
//                 preview3_alt=""
//                 preview3_header="PhD"
//                 preview3_content={default_preview_content}
//                 preview3_link="https://www.colorado.edu/linguistics/current-students/graduates/phd-program"



//                 //preview4_img={}
//                 //preview4_title=""
//                 //preview4_alt=""
//                 //preview4_header=""
//                 //preview4_content={default_preview_content}
//                 //preview4_link=""
//               /> */}


//               {/* <ProgramRow
//                 content_header="Department of Computer Science"
//                 content_header_link="https://www.colorado.edu/cs/"
//                 content_content="Founded in 1970, the Department of Computer Science at CU Boulder is focused on real-world, interdisciplinary experiences for our students. Our researchers are making advances in computer science today that will change the world tomorrow."

//                 preview1_img={cs_undergrad}
//                 preview1_title="Computer Science Undergraduate Information"
//                 preview1_alt=""
//                 preview1_header="Undergrad"
//                 preview1_content={default_preview_content}
//                 preview1_link="https://www.colorado.edu/cs/current-students/undergraduate-students"

//                 preview2_img={cs_masters}
//                 preview2_title="Computer Science Masters Information"
//                 preview2_alt=""
//                 preview2_header="Graduate"
//                 preview2_content={default_preview_content}
//                 preview2_link="https://www.colorado.edu/cs/current-students/graduate-students"

//                 preview3_img={cs_phd}
//                 preview3_title="Computer Science PhD Information"
//                 preview3_alt=""
//                 preview3_header="PhD"
//                 preview3_content={default_preview_content}
//                 preview3_link="https://www.colorado.edu/cs/current-students/graduate-students/phd"

//                 //preview4_img={}
//                 //preview4_title=""
//                 //preview4_alt=""
//                 //preview4_header=""
//                 //preview4_content={default_preview_content}
//                 //preview4_link=""
//               />
//               <ProgramRow
//                 content_header="CLASIC Graduate Program"
//                 content_header_link="https://www.colorado.edu/linguistics/graduate-program/computational-linguistics-clasic-ms"
//                 content_content="The Departments of Linguistics and Computer Science have teamed up to jointly offer an interdisciplinary degree, the Computational Linguistics, Analytics, Search and Informatics Professional Master’s Degree (CLASIC), approved by the University of Colorado Board of Regents in April 2016. CLASIC, a stand-alone Professional Master of Science degree, provides students with a solid foundation in both linguistics and computer science graduate course work as well as several courses focused on date-driven linguistics, computational linguistics, and information processing. "

//                 preview1_img={clasic_martha}
//                 preview1_title="CLASIC Graduate Information"
//                 preview1_alt=""
//                 preview1_header="CLASIC"
//                 preview1_content={default_preview_content}
//                 preview1_link="https://www.colorado.edu/linguistics/graduate-program/computational-linguistics-clasic-ms"

//                 //preview2_img={}
//                 //preview2_title=""
//                 //preview2_alt=""
//                 //preview2_header=""
//                 //preview2_content={default_preview_content}
//                 //preview2_link=""

//                 //preview3_img={}
//                 //preview3_title=""
//                 //preview3_alt=""
//                 //preview3_header=""
//                 //preview3_content={default_preview_content}
//                 //preview3_link=""

//                 //preview4_img={}
//                 //preview4_title=""
//                 //preview4_alt=""
//                 //preview4_header=""
//                 //preview4_content={default_preview_content}
//                 //preview4_link=""
//               />
//               <ProgramRow
//                 content_header="Institute of Cognitive Science Combined PhD"
//                 content_header_link="https://www.colorado.edu/ics/graduate-programs/cognitive-science-combined-phd"
//                 content_content="The mission of the Institute of Cognitive Science (ICS) at CU-Boulder is to understand and enhance human cognition, learning, and development through the creation of interdisciplinary partnerships.  ICS fosters rich scientific interchange across researchers from a broad range of disciplines including Artificial Intelligence, Linguistics, Psychology, Neuroscience, Computer Science, Philosophy, and Education."

//                 preview1_img={ics_placeholder}
//                 preview1_title="ICS PhD Information"
//                 preview1_alt=""
//                 preview1_header="ICS"
//                 preview1_content={default_preview_content}
//                 preview1_link="https://www.colorado.edu/ics/graduate-programs/cognitive-science-combined-phd"

//                 //preview2_img={}
//                 //preview2_title=""
//                 //preview2_alt=""
//                 //preview2_header=""
//                 //preview2_content={default_preview_content}
//                 //preview2_link=""

//                 //preview3_img={}
//                 //preview3_title=""
//                 //preview3_alt=""
//                 //preview3_header=""
//                 //preview3_content={default_preview_content}
//                 //preview3_link=""

//                 //preview4_img={}
//                 //preview4_title=""
//                 //preview4_alt=""
//                 //preview4_header=""
//                 //preview4_content={default_preview_content}
//                 //preview4_link=""
//               /> */}

//           </div>
//         )
//     }
// }