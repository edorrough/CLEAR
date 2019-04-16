import React from 'react';
import { withRouter } from 'react-router-dom';

//formats the information about a person into html.
function Person(props) {
    var avatar, iwidth, iheight, contact_email, contact_phone;
    
    //Display style of contact information sections.
    var lineblock = {
        display: 'inline-block'
    };
    
    //=================================================
    //Default values of attributes if left unspecified.
    //=================================================
    
    //Placeholder avatar
    avatar = <img className="pfp" src={require("../../assets/people/avatar_placeholder.png")} alt="Placeholder" width="100" height="100" />; 
    //Avatar dimensions.
    iwidth = "100";
    iheight = "100";
    //Contact info.
    contact_email = null;
    contact_phone = null;
    
    //--------------------------------
    
    //If either avatar dimension is specified, set the image dimensions.
    if (props.imgx != ""){ 
        iwidth = props.imgx;
    }
    if (props.imgy != "" ){
        iheight = props.imgy;
    }
    
    if(props.img != ""){ //if an avatar image is specified, use it.
        avatar = <img className="pfp" src={props.img} alt="Placeholder" width={iwidth} height={iheight} />;
    }
    
    if(props.email != ""){ //if an email is specified, display it.
        contact_email = <div style={lineblock}><span className="person-contact-info-item person-contact-info-email"><i className="fa fa-envelope"></i><a href={"mailto:"+props.email}>{props.email}</a></span> <span className="person-contact-separator">&nbsp;&nbsp;&nbsp;</span></div>;
    }
    
    if(props.phone != ""){ //if a phone number is specified, display it.
        contact_phone = <div style={lineblock}><span className="person-contact-info-item person-contact-info-phone"><i className="fa fa-phone"></i><a href={"tel:"+props.phone}>{props.phone}</a></span></div>;
    }
    
    //Output
    return(
        <div className="person-view-mode-teaser clearfix">
            <div className="person-view-mode-teaser-content node-view-mode-teaser-content">
                <h2 className="node-title">{props.name}</h2>
                {avatar}
                <div className="person-job-titles">{props.title}</div>
                <div className="person-departments">{props.dept}</div>
                <div className="people-bio">
                    <div className="field field-name-body field-type-text-with-summary field-label-hidden">
                    {props.info}</div>
                </div>
                
                <div className="person-view-mode-teaser-contact">
                    {contact_email}
                    {contact_phone}
                </div>
                
            </div>
        </div>
    )
    
}   


export default withRouter(Person);

