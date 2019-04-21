import React from 'react';
import './program_row.css';

const ContentLeft = ( props ) => (
    <div className="left-content">
        <h1 className="content-header"><a href={props.header_link}>{props.header} </a></h1>
        <p>{props.content}</p>
    </div>
)

const ImgCard = ({ preview }) => (
    <div className="card">
        <div className="image">
            <img src={preview.preview_img} alt={preview.preview_alt}/>
            <div className="ui bottom attached button">
                <a href={preview.preview_link}>{preview.preview_footer}</a>
            </div>
        </div>
    </div>
)

const ProgramRow = ({ education }) => {
        return (
            <div className="education-grid-row">
                <div className="education-content-left">
                    <ContentLeft
                        header={education.content_header}
                        header_link={education.content_header_link}
                        content={education.content_content}
                    />
                </div>

                <div className="education-imgs-right">  {/* Right side Image Grid */}
                    <div className="ui container">  {/* Image grid col */}
                        <div className={education.previews.length === 1 ? 'ui large image' : 'ui two cards'}>
                            {education.previews.map(preview =>
                                <ImgCard
                                    key={preview.preview_link}
                                    preview={preview}
                                />)}
                        </div>
                    </div>  {/* End Image grid col */}
                </div>
            </div>
        )

}

export default ProgramRow
