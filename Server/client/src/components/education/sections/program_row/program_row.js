import React from 'react';
import './program_row.css';

const ContentLeft = ( props ) => (
    <div className="left-content">
        <h1 className="content-header"><a href={props.header_link}>{props.header} </a></h1>
        <p>{props.content}</p>
    </div>
)
    // let return_content;
    // let return_header;
    // let return_header_link;

    // if (props.content === "") {
    //   return_content = "Missing Content.";
    // }
    // else {
    //   return_content = props.content;
    // }

    // if (props.header === "") {
    //   return_header = "Missing Header";
    // }
    // else {
    //   return_header = props.header;
    // }
    // if (props.header_link === "") {
    //   return_header_link = ""
    // }
    // else {
    //   return_header_link = props.header_link;
    // }

    // if (return_header_link === "") {
    //     return (
    //         <div className="education-content-left">
    //             <h1>{return_header}</h1>
    //             <p>{return_content}</p>
    //         </div>
    //     )
    // }
    // else {
    //     return (
    //         // <div className="education-content-left">
    //         <div className="education-content-Left">
    //             <h1 className="content-header"><a href={return_header_link}> {return_header} </a></h1>
    //             <p>{return_content}</p>
    //         </div>
    //     )
    // }



const ImgCard = ({ preview }) => (
    <div className="card">
        <div className="image">
            <img src={preview.preview_img} alt={preview.preview_alt}/>
            <div className="ui bottom attached button">
                {preview.preview_footer}
            </div>
        </div>
    </div>
)

    // let img_source;
    // let img_title;
    // let img_alt;
    // let header;
    // let content;
    // let content_link

    // if(preview.card_img === "") {
    //   img_source = placeholder;
    //   img_title = "Placeholder";
    //   img_alt = "Placeholder";
    // }
    // else {
    //   img_source = preview.card_img;
    //   img_title = preview.card_title;
    //   img_alt = preview.card_alt;
    // }

    // if(preview.preview_header !== "") {
    //   header = preview.preview_header;
    // }
    // else {
    //   header = "PLACEHOLDER HEADER";
    // }

    // if(preview.preview_content !== "") {
    //   content = preview.preview_content;
    // }
    // else {
    //   content = "PLACEHOLDER CONTENT";
    // }

    // if (preview.preview_link !== "") {
    //   content_link = preview.preview_link;
    // }
    // else {
    //   content_link = "No link available.";
    // }

    // return (
    //   <div className="img-card">
    //     <img className="img-card-background" src={img_source} title={img_title} alt={img_alt}/>
    //     <div className="img-card-header">{header}</div>
    //     <div className="img-card-overlay"><div className="img-card-overlay-text">{content} <a href={content_link}>here.</a></div></div>
    //   </div>
    // )

// }


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
