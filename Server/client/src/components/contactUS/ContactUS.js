import React, { Component } from 'react';
import classNames from 'classnames';
import { Redirect } from 'react-router';
import { userSendMessage } from '../../actions/contactAction';
import { connect } from 'react-redux';
import './ContactUS.scss';

class ContactUS extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        message: '',
        done: false,
        phoneNum: '',
        errors: {}
    }

    handleChange = (e) => {
        if(!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
    
            this.setState({ 
                [e.target.name]: e.target.value,
                errors
            });
        } else {
            this.setState({ 
                [e.target.name]: e.target.value,
            });
        }
    }

    emailFormatChecking = (value) => {
        return value && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let errors = {};
        if(this.state.firstname === '') errors.firstname = 'Cannot be empty';
        if(this.state.lastname === '') errors.lastname = 'Cannot be empty';
        if(this.state.email === '') errors.email = 'Cannot be empty';
        if(this.state.message === '') errors.message = 'Connot be empty';
        if(!this.emailFormatChecking(this.state.email)) errors.email = 'Email format incorrectly';
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;

        if(isValid) {
            const { email, firstname, lastname, message, phoneNum} = this.state;

            this.props.userSendMessage({
                firstname,
                lastname,
                message,
                email,
                phoneNum
            })
            .then(
                () => {
                    window.alert("You have successfully sent message. Click OK to go back to home page.")
                    this.setState({ done: true })
                },
                (err) => {
                    console.log("err in contact page: ", err);
                    if(err.response.status === 429) {
                        this.setState({ 
                            // request: err.response.statusText + ', please try again later',
                            loading: false 
                        })
                    } else {
                        err.response.json().then(({errors}) => this.setState({ errors, loading: false }))
                    }
                }
            );
        }
    }

    render() {    

        const form = (
            <div className="contact-page-container">
                <div className="contact-page">

                    <div className="contact">

                        <div className="centeredLeft">
                            <div className="address-wrapper">

                                <div className="address-info">
                                    <i className="location arrow icon"></i>
                                    Address
                                </div>
                                <div className="address-content">

                                    <p>
                                        The Center for Computational Language and Education Research c/o Martha Palmer
                                    </p>
                                    <p>
                                        UCB 295 Hellems <br/>
                                        Department of Linguistics <br/>
                                        University of Colorado <br/>
                                        Boulder, Colorado, 80309 <br/>
                                    </p>
                                </div>
                            </div>
                            <div className="phone-info-wrapper">
                                <div className="phone-info">
                                    <i className="phone square icon"></i>
                                    Phone number
                                </div>
                                <p>+1 123-345-6789</p>
                            </div>
                            
                            <div className="email-info-wrapper">
                                <div className="email-info">
                                    <i className="envelope outline icon"></i>
                                    General support
                                </div>
                                <p>Contact@email.com</p>
                            </div>

                        </div>

                        <div className="centeredRight">
                            <div className="form-wrapper">
                                <h2 style={{paddingBottom: '10%'}}>Send us massage</h2>

                                <form className={classNames('ui', 'form', {loading: this.state.loading})} onSubmit={this.handleSubmit}>

                                    {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                                    <div className="fields-container">
                                        <div className="two fields">
                                            <div className={classNames('field', {error: !!this.state.errors.firstname })}>
                                                <label htmlFor="firstname">First Name *</label>
                                                <input
                                                    name="firstname"
                                                    value={this.state.firstname || ''}
                                                    onChange={this.handleChange}
                                                    id="firstname"
                                                    placeholder="First Name"
                                                />
                                                <span className="error-msg">{this.state.errors.firstname}</span>
                                            </div>

                                            <div className={classNames('field', {error: !!this.state.errors.lastname })}>
                                                <label htmlFor="lastname">Last Name *</label>
                                                <input
                                                    name="lastname"
                                                    value={this.state.lastname || ''}
                                                    onChange={this.handleChange}
                                                    id="lastname"
                                                    placeholder="Last Name"
                                                />
                                                <span className="error-msg">{this.state.errors.lastname}</span>
                                            </div>
                                        </div>

                                        <div className={classNames('field', {error: !!this.state.errors.email })}>
                                            <label htmlFor="email">Email Address *</label>
                                            <input
                                                name="email"
                                                value={this.state.email || ''}
                                                onChange={this.handleChange}
                                                id="email"
                                                placeholder="example@example.com"
                                            />
                                            <span className="error-msg">{this.state.errors.email}</span>

                                        </div>

                                        <div className={classNames('field', {error: !!this.state.errors.phoneNum })}>
                                            <label htmlFor="phone">Phone number</label>
                                            <input
                                                name="phone"
                                                value={this.state.phoneNum || ''}
                                                onChange={this.handleChange}
                                                id="phone"
                                                placeholder="xxx-xxx-xxxx"
                                            />

                                        </div>

                                        <div className={classNames('field', {error: !!this.state.errors.message })}>
                                            <label htmlFor="message">Message *</label>
                                            <textarea
                                                name="message"
                                                value={this.state.message || ''}
                                                onChange={this.handleChange}
                                                id="message"
                                                placeholder="Tell us what is in your mind"
                                            />
                                            <span className="error-msg">{this.state.errors.message}</span>
                                        </div>

                                        <button className="ui teal button">Send Message</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        return (
            <div>
                {this.state.done ? <Redirect to='/' /> : form}
            </div>
        )
    }
}

export default connect(null, {
    userSendMessage
})(ContactUS)