import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                            key={education.content_header}
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