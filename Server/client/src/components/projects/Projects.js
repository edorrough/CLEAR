import React, { Component } from 'react';
import './Projects.css';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.selectFilterCategory = this.selectFilterCategory.bind(this);
  }

  selectFilterCategory(filter_category) {
    let i;
    let x = document.getElementsByClassName("column");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(filter_category).style.display = "inline-block";
  }

  showAllCards() {
    var x = document.getElementById("row-box").querySelectorAll(".column");
    for(var i=0; i<x.length; i++){
      x[i].style.display="block";
    }
  }

  render() {
    return (
      <div className="Projects-container">
        <div className="intro_paragraph">
          <h1>Projects</h1>
          <p>
            {" "}
            CLEAR conducts research in linguistics, education, and computer
            science. Center projects include:{" "}
          </p>
          <ul>
            <li>
              Adaptive assessment and intervention for reading difficulties
            </li>
            <li>
              The development of increasingly rich linguistic annotation
              schemes that can serve as training and evaluation data for
              machine learning
            </li>
            <li>
              Information extraction and natural language understanding
              using semantic role labeling and co-reference resolution,
            </li>
            <li>Spoken language processing and dialog understanding</li>
            <li>
              Human-computer interaction using animated agents or
              customizable interfaces.
            </li>
          </ul>
          <p>
            These projects have led to a wide variety of systems including
            some for language acquisition skills, tutoring and therapy,
            tools for question answering and navigating the web, and for
            learning and presentation of science topics ranging from plate
            tectonics to acoustics.
          </p>
        </div>

        <div className="buttonContainer">
          {/* 
                ========================
                Project Filter Buttons 
                ========================
                Built from w3schools.com
                ========================
                */}
          <hr class="hr_categories" />
          <h2>Project Categories</h2>

          <button className="button" onClick={() => this.showAllCards()}>
            All Projects
          </button>

          <button
            className="button"
            onClick={() => this.selectFilterCategory("reading-projects")}
          >
            Reading Projects
          </button>

          <button
            className="button"
            onClick={() => this.selectFilterCategory("interactive-systems")}
          >
            Interactive Systems
          </button>

          <button
            className="button"
            onClick={() =>
              this.selectFilterCategory("computational-semantics")
            }
          >
            Computational Semantics
          </button>

          <button
            className="button"
            onClick={() =>
              this.selectFilterCategory("digital-learning-sciences")
            }
          >
            Digital Learning Sciences
          </button>
        </div>

        {/*
                =================
                Project Card Grid
                =================
                */}
        <div className="row" id="row-box">
          <div id="reading-projects" className="column">
            <div className="project-content">
              <img
                class="photo"
                src="https://res.cloudinary.com/dtf7zeh9v/image/upload/v1556145919/projects_in_frontend/readingprojects_placeholder_image.jpg"
                alt="CARLA"
              />
              <a id="link-text"
                href="https://www.colorado.edu/lab/clear/projects/reading-projects/carla"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>CARLA</h4>
              </a>
              <p>
                <br />
                CARLA is a comprehensive personalized reading intervention
                system (B Wise, S Van Vuuren, N Ngampatipatpong, with
                funding from NIH; grounded on earlier programs (ROSS and
                FtL) funded by NIH, IES, & an IERI). CARLA integrates all 5
                domains of evidence-based reading instruction, gradually
                changing its balance of thoughtful instruction from more
                time in engaging activities for earlier readers to more time
                in books as readers progress. Its fidelity of treatment
                makes it a great platform for studying what works best for
                children with different cognitive profiles.
              </p>
              <a
                href="https://www.colorado.edu/lab/clear/projects/reading-projects/carla"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class="card-read-more">Read More</button>
              </a>
            </div>
          </div>

          <div id="reading-projects" className="column">
            <div className="project-content">
              <img
                class="photo"
                src="https://res.cloudinary.com/dtf7zeh9v/image/upload/v1556145919/projects_in_frontend/readingprojects_placeholder_image.jpg"
                alt="CARTI"
              />
              <a id="link-text"
                href="https://www.colorado.edu/lab/clear/projects/reading-projects/carti"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>CARTI</h4>
              </a>
              <p>
                <br />
                Funded by a grant from the NIH to Barbara Wise, Sarel Van
                Vuuren, and Brian Byrne as project V of the Colorado
                Learning Disabilities Research Center (R. Olson, Center
                Director), CARTI studies questions about Response to
                Instruction (RTI) with children at risk for or with reading
                difficulties using the CARLA program and the ICARE and Early
                ICARE programs.
              </p>
              <a
                href="https://www.colorado.edu/lab/clear/projects/reading-projects/carti"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class="card-read-more">Read More</button>
              </a>
            </div>
          </div>

          <div id="reading-projects" className="column">
            <div className="project-content">
              <img
                class="photo"
                src="https://res.cloudinary.com/dtf7zeh9v/image/upload/v1556145919/projects_in_frontend/readingprojects_placeholder_image.jpg"
                alt="Early-ICARE"
              />
              <a id="link-text"
                href="https://www.colorado.edu/lab/clear/projects/reading-projects/early-icare"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>Early-ICARE</h4>
              </a>
              <p>
                <br />
                unded by the Institute of Educational Sciences (PI: Barbara
                Wise, co-Is Lynn Snyder, Sarel Van Vuuren, Ed Wiley),
                E-ICARE extends ICARE down to KG, adds dynamic repeated
                assessment of word reading K-5, and also studies what
                predicts who will become a struggling reader.
              </p>
              <a
                href="https://www.colorado.edu/lab/clear/projects/reading-projects/early-icare"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class="card-read-more">Read More</button>
              </a>
            </div>
          </div>

          <div id="reading-projects" className="column">
            <div className="project-content">
              <img
                class="photo"
                src="https://res.cloudinary.com/dtf7zeh9v/image/upload/v1556145919/projects_in_frontend/readingprojects_placeholder_image.jpg"
                alt="ICARE"
              />
              <a id="link-text"
                href="https://www.colorado.edu/lab/clear/projects/reading-projects/icare"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>ICARE</h4>
              </a>
              <p>
                <br />
                Funded by the Institute of Educational Sciences (PI: Barbara
                Wise, coI Sarel Van Vuuren), ICARE aims to create
                theoretically-grounded computerized assessments which
                provide initial instructional profiles for poor readers from
                2nd to 5th grade, and indicate whether they have
                difficulties relating to word reading, to language
                comprehension or both.
              </p>
              <a
                href="https://www.colorado.edu/lab/clear/projects/reading-projects/icare"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class="card-read-more">Read More</button>
              </a>
            </div>
          </div>

          <div id="interactive-systems" className="column">
            <div className="project-content">
              <img
                class="photo"
                src="https://res.cloudinary.com/dtf7zeh9v/image/upload/v1556145906/projects_in_frontend/interactive_systems_placeholder.jpg"
                alt="Interactive Prompting Platform (IPP)"
              />
              <a id="link-text"
                href="http://interactive.colorado.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>Interactive Prompting Platform (IPP).</h4>
              </a>
              <p>
                <br />
                Since 2007, we have been creating interactive learning
                solutions that use photo-realistic 3-d virtual agents that
                emote and speak with state-of-the-art clear and accurate
                visible speech to help individuals overcome health,
                wellness, communication and learning challenges.
              </p>
              <a
                href="http://interactive.colorado.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class="card-read-more">Read More</button>
              </a>
            </div>
          </div>

          <div id="interactive-systems" className="column">
            <div className="project-content">
              <img
                class="photo"
                src="https://res.cloudinary.com/dtf7zeh9v/image/upload/v1556145906/projects_in_frontend/interactive_systems_placeholder.jpg"
                alt="Interactive Prompting Platform (IPP)"
              />
              <a id="link-text"
                href="http://interactive.colorado.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>Interactive Prompting Platform (IPP).</h4>
              </a>
              <p>
                <br />
                Since 2007, we have been creating interactive learning
                solutions that use photo-realistic 3-d virtual agents that
                emote and speak with state-of-the-art clear and accurate
                visible speech to help individuals overcome health,
                wellness, communication and learning challenges.
              </p>
              <a
                href="http://interactive.colorado.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class="card-read-more">Read More</button>
              </a>
            </div>
          </div>

          <div id="computational-semantics" className="column">
            <div className="project-content">
              <img
                class="photo"
                src="https://res.cloudinary.com/dtf7zeh9v/image/upload/v1556145896/projects_in_frontend/computational_semantics_placeholder.jpg"
                alt="VerbNet"
              />
              <a id="link-text"
                href="http://verbs.colorado.edu/verbnet/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>VerbNet</h4>
              </a>
              <p>
                <br />
                VerbNet (Kipper-Schuler 2005) is a hierarchical domain-
                independent, broad-coverage verb lexicon with mappings to
                several widely-used verb resources, including WordNet
                (Miller 1990, Fellbaum 1998), Xtag (Xtag 2001), and FrameNet
                (Baker et al. 1998). It includes syntactic and semantic
                information for classes of English verbs derived and then
                extended from Levin's original classification (Levin 1993).
                The original Levin classes have been refined and new
                subclasses added to achieve syntactic and semantic coherence
                among members.
              </p>
              <a
                href="http://verbs.colorado.edu/verbnet/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class="card-read-more">Read More</button>
              </a>
            </div>
          </div>

          <div id="digital-learning-sciences" className="column">
            <div className="project-content">
              <img
                class="photo"
                src="https://res.cloudinary.com/dtf7zeh9v/image/upload/v1556145930/projects_in_frontend/dls_project_image.jpg"
                alt="DLS"
              />
              <a id="link-text"
                href="https://scied.ucar.edu/dls"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>Digital Learning Sciences</h4>
              </a>
              <p>
                <br />
                Digital Learning Sciences is a joint center of the
                University Corporation for Atmospheric Research Community
                Programs and the Institute of Cognitive Science at the
                University of Colorado Boulder. Drawing on the strengths of
                these institutions, our research and development team
                represents expertise in computer science, cognitive science,
                science education, user-centered design, evaluation, and
                machine learning/natural language processing. DLS and the
                NCAR Library are the two entities of UCAR's Integrated
                Information Services (IIS)
              </p>
              <a
                href="https://scied.ucar.edu/dls"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class="card-read-more">Read More</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
