import React, { Component } from 'react';
import acowell_1 from '../../../../assets/acowell_1.jpg';
import mthomas_ruzic from '../../../../assets/mthomas-ruzic.jpg';
import laura_michaelis from '../../../../assets/laura_michaelis.jpg';
import { Link } from 'react-router-dom';
import './MeetPeople.css';

class MeetPeople extends Component {
    render() {
        return (
            <div className="meetPeople-container">
                <h1>People</h1>

                <div className="meetPeople-wrapper">
                    <div className="ui three stackable cards">

                        <div className="card">
                            <div className="card-header">
                                <div className="image">
                                    <img
                                        src="https://www.colorado.edu/lab/clear/sites/default/files/styles/small_thumbnail/public/people/jim_martin_4.cuphoto.jpg?itok=GIUrH6Ig"
                                        alt="icare_icon"
                                    />
                                </div>
                                <div className="header"><h2>James Martin</h2> <br/> Professor in Computer Science</div>
                            </div>

                            <div className="content">
                                <div className="meta">
                                    <span style={{ textOverflow: 'ellipsis'}}>
                                    James Martin is a professor of Computer Science and a fellow in the Institute of Cognitive Science at the University
                                    of Colorado at Boulder. He earned a B.S. in Computer Science from Columbia University, and a Ph.D. in Computer
                                    Science from the University of California at Berkeley. He has published two books and numerous articles on a wide
                                    range of topics related to Artificial Intelligence, Cognitive Science and Computational Linguistics. His primary
                                    research efforts are focused on how languages convey meaning, both to humans and computers. Within this area, a
                                    specific focus is on how humans and computers process metaphor and other forms of non-literal language.
                                    </span>
                                </div>
                                <div className="extra">
                                    <div style={{ paddingRight:'1rem'}}>
                                        <i className="envelope outline icon" ></i>
                                         james.martin@colorado.edu
                                    </div>
                                    <div>
                                        <i className="phone volume icon"></i>
                                        303-492-3552
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="card">
                            <div className="card-header">
                                <div className="image">
                                    <img
                                        src="https://www.colorado.edu/lab/clear/sites/default/files/styles/small_thumbnail/public/people/martha.jpg?itok=eenS9nts"
                                        alt="icare_icon"
                                        data-tip data-for='ICAndrew CowellARE'
                                        className="image"
                                    />
                                </div>
                                <div className="header"><h2>Martha Palmer</h2> <br/> Professor in Linguistics and Computer Science</div>
                            </div>

                            <div className="content">
                                <div className="meta">
                                    <span style={{ textOverflow: 'ellipsis'}}>
                                    Martha Palmer is a Professor of Linguistics and Computer Science and an Institute of Cognitive Science Faculty Fellow.
                                    Her PhD is in Artificial Intelligence from the University of Edinburgh. She is an Association of Computational Linguistics
                                    (ACL) Fellow, and has won an Outstanding Graduate Advisor 2014 Award, a Boulder Faculty Assembly 2010 Research Award and was the
                                    Director of the 2011 Linguistics Institute in Boulder. Her research is focused on capturing elements of the meanings of words that
                                    can comprise automatic representations of complex sentences and documents.
                                    </span>
                                </div>
                                <div className="extra">
                                    <div style={{ paddingRight:'1rem'}}>
                                        <i className="envelope outline icon" ></i>
                                        martha.palmer@colorado.edu
                                    </div>
                                    <div>
                                        <i className="phone volume icon"></i>
                                         303-492-1300
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="card">
                            <div className="card-header">
                                <div className="image">
                                    <img
                                        src="https://www.colorado.edu/lab/clear/sites/default/files/styles/small_thumbnail/public/people/mans_hulden.png?itok=HG8kUHqS"
                                        alt="Laura Michaelis"
                                        data-tip data-for='ICAndrew CowellARE'
                                        // className="ui medium circular image"
                                        className="image"
                                    />
                                </div>
                                <div className="header"><h2>Mans Hulden</h2> <br/> Assistant Professor in Linguistics</div>
                            </div>

                            <div className="content">
                                <div className="meta">
                                    <span style={{ textOverflow: 'ellipsis'}}>
                                    Mans Hulden received his PhD in Linguistics from the University of Arizona in 2009. He joined the CU linguistics
                                    faculty in 2014 after postdoctoral research as a Marie Curie fellow at the University of Helsinki and a stint as visiting
                                    professor in Computer Science at the University of the Basque Country. His research focuses on developing computational
                                    methods to infer and model linguistic structure using varying degrees of prior linguistic knowledge, particularly in the
                                    domains of phonology and morphology. Dr. Hulden has worked extensively with linguistic applications of finite state technology,
                                    modeling of linguistic theory, grammatical inference, and the development of language resources, and is the author of several
                                    open-source tools for finite-state language modeling. He teaches courses in computational linguistics, phonology, and phonetics.
                                    </span>
                                </div>
                                <div className="extra">
                                    <div style={{ paddingRight:'1rem'}}>
                                        <i className="envelope outline icon" ></i>
                                        mans.hulden@colorado.edu
                                    </div>
                                    <div>
                                        <i className="phone volume icon"></i>
                                         303-492-2589
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="register-button">
                        <Link to="/people">
                            <button className="ui teal button">
                                More People
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        )
    }
}

export default MeetPeople;
