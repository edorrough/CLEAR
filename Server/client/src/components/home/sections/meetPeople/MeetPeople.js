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
                                        src={acowell_1}
                                        alt="icare_icon"
                                    />
                                </div>
                                <div className="header"><h2>Andrew Cowell</h2> <br/> (Relation to Program)</div>
                            </div>

                            <div className="content">
                                <div className="meta">
                                    <span style={{ textOverflow: 'ellipsis'}}>
                                    Andrew Cowell received his PhD from UC Berkeley in 1993.
                                    He works in the areas of linguistic anthropology and language documentation.
                                    He has worked primarily on Arapaho, and also Gros Ventre and Miwok,
                                    and has an interest in Polynesia (Hawaii and Tahiti in particular) as well.
                                    He has published numerous articles and books, as well as developing curricular material and
                                    websites for language and culture learning and documentation. His current...
                                    </span>
                                </div>
                                <div className="extra">
                                    <div style={{ paddingRight:'1rem'}}>
                                        <i className="envelope outline icon" ></i>
                                        cowellj@colorado.edu
                                    </div>
                                    <div>
                                        <i className="phone volume icon"></i>
                                        303 - 735 - 4194
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="card">
                            <div className="card-header">
                                <div className="image">
                                    <img
                                        src={mthomas_ruzic}
                                        alt="icare_icon"
                                        data-tip data-for='ICAndrew CowellARE'
                                        className="image"
                                    />
                                </div>
                                <div className="header"><h2>Maria Thomas-Ruzic</h2> <br/> Senior Instructor and Director of the Program for TESOL Professionals</div>
                            </div>

                            <div className="content">
                                <div className="meta">
                                    <span style={{ textOverflow: 'ellipsis'}}>
                                    Maria (Mia) Thomas-Ruzic received her PhD in Linguistics from the University of Colorado in 1998.
                                    Her career in English language teaching and teacher preparation in the US and
                                    abroad has spanned four decades. Mia’s research interests include instructional talk,
                                    uses of discourse tools by teachers, professional and adult development,
                                    and learning/teaching in higher education. Since 2004 she has been on the
                                    Linguistics Department faculty at CU-Boulder, establishing, directing, and teaching...
                                    </span>
                                </div>
                                <div className="extra">
                                    <div style={{ paddingRight:'1rem'}}>
                                        <i className="envelope outline icon" ></i>
                                        maria.thomas-ruzic@colorado.edu
                                    </div>
                                    <div>
                                        <i className="phone volume icon"></i>
                                        303 - 735 - 4194
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="card">
                            <div className="card-header">
                                <div className="image">
                                    <img
                                        src={laura_michaelis}
                                        alt="Laura Michaelis"
                                        data-tip data-for='ICAndrew CowellARE'
                                        // className="ui medium circular image"
                                        className="image"
                                    />
                                </div>
                                <div className="header"><h2>Laura Michaelis</h2> <br/> Professor and Department Chair</div>
                            </div>

                            <div className="content">
                                <div className="meta">
                                    <span style={{ textOverflow: 'ellipsis'}}>
                                    Laura Michaelis received her PhD in Linguistics in 1993 at the University of California,
                                    Berkeley. Her thesis, on English past-time reference, was written under the direction of
                                    Charles J. Fillmore. She has been a CU Linguistics faculty member since 1993, as well
                                    as a Faculty Fellow in the Institute of Cognitive Science. Her research specializations
                                    include the tense-aspect interface, corpus syntax, syntactic innovation, aspectual meaning
                                    in typological perspective, the discourse-syntax...
                                    </span>
                                </div>
                                <div className="extra">
                                    <div style={{ paddingRight:'1rem'}}>
                                        <i className="envelope outline icon" ></i>
                                        maria.thomas-ruzic@colorado.edu
                                    </div>
                                    <div>
                                        <i className="phone volume icon"></i>
                                        303 - 735 - 4194
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
