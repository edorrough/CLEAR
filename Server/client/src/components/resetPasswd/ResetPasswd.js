import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPasswdSubmit } from '../../actions/authAction';
import { addFlashMessages } from '../../actions/flashMessages';
import './ResetPassword.css';

class ResetPasswd extends Component {
    state = {
        password: '',
        passwordConfirm: '',
        token: '',
        pwChecking: '',
        errors: {},
        done: false,
        loading: false,
        successMSG: ''
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

    passwordFormatChecking = (value) => {
        return value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { token } = this.props.match.params;
        let errors = {};
        if(this.state.password === '') errors.password = 'Cannot be empty';
        if(this.state.passwordConfirm === '') errors.passwordConfirm = 'Cannot be empty';
        if(!this.passwordFormatChecking(this.state.password)) errors.pwChecking = 'Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
        if(this.state.password !== this.state.passwordConfirm) errors.pwChecking = 'Password and Password confirmation mismatch'

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;

        if(isValid) {
            const { password, passwordConfirm } = this.state;
            this.setState({ loading: true })

            this.props.resetPasswdSubmit({
                password,
                passwordConfirm,
                token
            })
            .then((msg) => {
                this.props.addFlashMessages({
                    type: 'success',
                    text: 'You have successful changed your password. Click the bottom below to login'
                });
                this.setState({ 
                    done: true,
                    // successMSG: msg.userData.message
                })
            },
            (err) => {

                console.log("err in ResetPasswd: ", err);
                if(err.response.status === 429) {
                    this.setState({ 
                        request: err.response.statusText + ', wait for a bit and try again',
                        loading: false 
                    })
                } else {
                    err.response.json().then(({errors}) => this.setState({ errors, loading: false }))
                }
            })
        }

    }
    render() {
        const form = (
            <div className="password-reset-form">
                <div className="ui container">
                    <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>

                        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
                        
                        <div className={classnames('field', {error: !!this.state.errors.password })}>

                            {!!this.state.errors.pwChecking && <div className="ui negative message"><p>{this.state.errors.pwChecking}</p></div>}

                            <label htmlFor="password">Password *</label>
                            <input
                                name="password"
                                type="password"
                                value={this.state.password || ''}
                                onChange={this.handleChange}
                                id="password"
                                placeholder="Enter password..."
                            />
                            <span className="error-msg">{this.state.errors.password}</span>
                        </div>

                        <div className={classnames('field', {error: !!this.state.errors.passwordConfirm })}>
                            <label htmlFor="passwordConfirm">Password Confirmation *</label>
                            <input
                                name="passwordConfirm"
                                type="password"
                                value={this.state.passwordConfirm || ''}
                                onChange={this.handleChange}
                                id="passwordConfirm"
                                placeholder="Enter password again..."
                            />
                            <span className="error-msg">{this.state.errors.passwordConfirm}</span>
                        </div>

                        <div className="forgot-btn">
                            <div className="field">
                                <button className="ui primary button">Submit</button>
                            </div>
                        </div>

                    </form>
                </div>
        
            </div>
        )
        return (
            <div className="password-reset-form-container">
                <div className="password-reset-wrapper">

                    {this.state.done ? 
                        <div>
                            <p>{this.state.successMSG}</p>
                            <Link to="/user/login">
                                <button>Login</button>
                            </Link>
                        </div> 
                        
                        : form}
                </div>
            </div>
        )
    }
}

export default connect(null, {
    resetPasswdSubmit,
    addFlashMessages
})(ResetPasswd);