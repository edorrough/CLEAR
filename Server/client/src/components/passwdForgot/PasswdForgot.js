import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { forgotPasswdSubmit } from '../../actions/authAction';
import './PasswdForgot.css';

class PasswdForgot extends Component {
    state = {
        email: '',
        secret_code: '',
        errors: {},
        returnMsg: null,
        loading: false,
        done: false
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
        if(this.state.email === '') errors.email = 'Email cannot be empty';
        if(!this.emailFormatChecking(this.state.email)) errors.emailFormatChecking = 'Email format incorrectly';
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;

        if(isValid) {
            const { email, secret_code } = this.state;
            this.setState({ loading: true })

            this.props.forgotPasswdSubmit({ email, secret_code })
                .then(
                    (msg) => { 
                        this.setState({ 
                            done: true,
                            returnMsg: msg.pwdResetData.message
                        })
                    },
                    (err) => {
                        console.log("err in Password_forgot: ", err);
                        err.response.json().then(({errors}) => this.setState({ errors, loading: false }))
                    }
            );
        }

    }

    render() {
        const form = (
            <div className="passwd-forgot-form">
                <div className="ui container">

                    <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>

                        <div className={classnames('field', { error: !!this.state.errors.email })}>
                            <label htmlFor="email">Email *</label>
                            <input 
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                id="email"
                                placeholder="Enter your email"
                            />
                            <span className="error-msg">{this.state.errors.email}</span> <br/>
                            <span className="error-msg">{this.state.errors.emailFormatChecking}</span>
                        </div>

                        <div className={classnames('field')}>
                            <label htmlFor="secret_code">Secret code(Please leave it blank if you are not administrator)</label>
                            <input
                                name="secret_code"
                                value={this.state.secret_code || ''}
                                onChange={this.handleChange}
                                id="secret_code"
                                placeholder="Enter secret_code..."
                            />
                            <span className="error-msg">{this.state.errors.secret_code}</span>
                        </div>

                        <div className="forgot-btn">
                            <button className="ui primary button">Send</button>
                        </div>

                    </form>
                </div>
            </div>
        )

        return (
            <div className="passwd-forgot-page-container">
                {this.state.done ? <div>{this.state.returnMsg}</div> : form }
            </div>
        )
    }
}

export default connect(null, {
    forgotPasswdSubmit
})(PasswdForgot)