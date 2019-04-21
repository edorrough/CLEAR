import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { firstTimeLogin } from '../../actions/authAction';
import { addFlashMessages } from '../../actions/flashMessages';
import ReCAPTCHA from "react-google-recaptcha";
import './LoginFirstTime.css';

class LoginFirstTime extends Component {
    state = {
        password: '',
        passwordConfirm: '',
        passwordRequirement: '',
        token: this.props.match.params.token ? this.props.match.params.token : '',
        loading: false,
        recaptcha: '',
        done: false,
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

    renderRecaptcha = value => {
        // console.log("value: ", value)
        this.setState({ recaptcha: value })
    }

    passwordChecking = (value) => {
        return value && /^(?=[A-Z])(?=.*?[0-9])(?=.*?[^\w\s]).+$/.test(value)   
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let errors = {};
        if(this.state.password === '')  errors.password = 'Connot be empty';
        if(this.state.passwordConfirm === '')  errors.passwordConfirm = 'Connot be empty';
        if(!this.passwordChecking(this.state.password)) errors.passwordRequirement = 'Passwords must at least 8 characters, include one capital letter, one number, and one special character like: +@?=*$.';
        if(this.state.password !== this.state.passwordConfirm) errors.mismatch = 'Passwords mismatch';
        if(this.state.recaptcha === '') errors.recaptcha = 'Recaptcha cannot be empty';

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;

        if(isValid) {
            const { password, passwordConfirm, token, recaptcha } = this.state;
            this.setState({ loading: true });

            this.props.firstTimeLogin({
                password,
                passwordConfirm,
                token,
                recaptcha
            })
            .then(
                () => { 
                    this.props.addFlashMessages({
                        type: 'success',
                        text: 'You have successful set your password. Please carefully maintain it. Now you can log in with your new credential.'
                    })
                    this.setState({ 
                        done: true 
                    }) 
                },
                (err) => {
                    // debugger
                    console.log("err in FirstTimeLogin: ", err);
                    err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                }
            )
        }

    }

    render() {
        const form = (
            <div className="loginFirstTime-container">
                <div className="loginFirstTime-wrapper">
                    <div className="ui container">
                        <form className={classnames('ui', 'form', {loading: this.state.loading})} onSubmit={this.handleSubmit}>
                            <div className="fields-container">

                            {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                            <div className={classnames('field', {error: !!this.state.errors.password })}>
                                <label htmlFor="password">Password *</label>
                                    <input
                                        name="password"
                                        type="password"
                                        value={this.state.password || ''}
                                        onChange={this.handleChange}
                                        id="password"
                                        placeholder="Enter your password..."
                                    />
                                    <span className="error-msg">{this.state.errors.password}</span>
                                </div>

                                <div className={classnames('field', {error: !!this.state.errors.passwordConfirm })}>
                                    <label htmlFor="passwordConfirm">Password Confirm *</label>
                                    <input
                                        name="passwordConfirm"
                                        value={this.state.passwordConfirm || ''}
                                        onChange={this.handleChange}
                                        id="passwordConfirm"
                                        type="password"
                                        placeholder="Enter your password again..."
                                    />
                                    <span className="error-msg">{this.state.errors.passwordConfirm}</span>
                                </div>

                                <span className="error-msg">{this.state.errors.mismatch}</span>
                                <span className="error-msg">{this.state.errors.passwordRequirement}</span>                                

                                <ReCAPTCHA
                                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                    name="recaptcha" 
                                    onChange={this.renderRecaptcha}
                                    value={this.state.recaptcha}
                                />

                                <div className="btn">
                                    <div className="field">
                                        <button className="ui primary button">Submit</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )

        return (
            <div className="loginFirstTime-page">
                {this.state.done ? <Redirect to="/" /> : form}
            </div>
        )
    }
}

LoginFirstTime.propTypes = {
    firstTimeLogin: PropTypes.func,
    addFlashMessages: PropTypes.func
}

export default connect(null, { 
    firstTimeLogin,
    addFlashMessages
})(LoginFirstTime);