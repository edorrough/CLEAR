import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

//formats the information about a person into html.
class Person extends Component {
	render() {
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
		if (this.props.imgx != ""){ 
			iwidth = this.props.imgx;
		}
		if (this.props.imgy != "" ){
			iheight = this.props.imgy;
		}
		
		if(this.props.img != ""){ //if an avatar image is specified, use it.
			avatar = <img className="pfp" src={this.props.img} alt="Placeholder" width={iwidth} height={iheight} />;
		}
		
		if(this.props.email != ""){ //if an email is specified, display it.
			contact_email = <div style={lineblock}><span className="person-contact-info-item person-contact-info-email"><i className="fa fa-envelope"></i><a href={"mailto:"+this.props.email}>{this.props.email}</a></span> <span className="person-contact-separator">&nbsp;&nbsp;&nbsp;</span></div>;
		}
		
		if(this.props.phone != ""){ //if a phone number is specified, display it.
			contact_phone = <div style={lineblock}><span className="person-contact-info-item person-contact-info-phone"><i className="fa fa-phone"></i><a href={"tel:"+this.props.phone}>{this.props.phone}</a></span></div>;
		}
		
		//Output
		return(
			<div className="person-view-mode-teaser clearfix">
				<div className="person-view-mode-teaser-content node-view-mode-teaser-content">
					<h2 className="node-title">{this.props.name}</h2>
					{avatar}
					<div className="person-job-titles">{this.props.title}</div>
					<div className="person-departments">{this.props.dept}</div>
					<div className="people-bio">
						<div className="field field-name-body field-type-text-with-summary field-label-hidden">
						{this.props.info}</div>
					</div>
					
					<div className="person-view-mode-teaser-contact">
						{contact_email}
						{contact_phone}
					</div>
					
				</div>
			</div>
	
		)
	}	
}

export default withRouter(Person);

