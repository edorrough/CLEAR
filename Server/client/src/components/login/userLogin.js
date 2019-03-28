import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userSubmitSignin } from '../../actions/authAction';
import { addFlashMessages } from '../../actions/flashMessages';
import './Login.css';

class userLogin extends Component {
    state = {
        email: '',
        password: '',
        request: null,
        errors: {},
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
        if(this.state.email === '') errors.email = 'Cannot be empty';
        if(this.state.password === '') errors.password = 'Cannot be empty';
        if(!this.emailFormatChecking(this.state.email)) errors.email = 'Email format incorrectly';
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;

        if(isValid) {
            const { email, password } = this.state;

            this.props.userSubmitSignin({ 
                email, 
                password 
            })
            .then(
                () => {
                    this.props.addFlashMessages({
                        type: 'success',
                        text: 'You have successfully logged in, welcome.'
                    });
                    this.setState({ 
                        done: true,
                    })
                },
                (err) => {
                    console.log("err in userLogin: ", err.response);
                    // debugger
                    if(err.response.status === 429) {
                        this.setState({ 
                            request: err.response.statusText + ', please try again later',
                            loading: false 
                        })
                    } else {
                        err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                    }
                }
            );
        }
    }

    render() {

        return (
            <div className="userLogin-page">
                <div className="userLogin-content">
                    <div className="userLoginContentWrapper">
                        <div className="userLoginFormWrapper">

                            <h1>Department of Linguistic</h1>

                            <span className="error-msg-color">{this.state.request ? this.state.request : ''}</span>
                            {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
                                {this.props.user.errors ? 
                                <div className="ui negative message">
                                    <p>{this.props.user.errors.global}</p>
                                </div> : ''}

                            <div className="ui container">
                                <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>

                                    <div className={classnames('field', {error: !!this.state.errors.email })}>
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            name="email"
                                            value={this.state.email || ''}
                                            onChange={this.handleChange}
                                            id="email"
                                            placeholder="Enter email..."
                                        />
                                        <span className="error-msg-color">{this.state.errors.email}</span>
                                    </div>

                                    <div className={classnames('field', {error: !!this.state.errors.password })}>
                                        <label htmlFor="password">Password *</label>
                                        <input
                                            name="password"
                                            value={this.state.password || ''}
                                            type="password"
                                            onChange={this.handleChange}
                                            id="password"
                                            placeholder="Enter password..."
                                        />
                                        <span className="error-msg-color">{this.state.errors.password}</span>
                                    </div>

                                    <div className="forgotPW">
                                        <Link to="/user/passwd-forgot">
                                            Forgot password
                                        </Link>
                                    </div>

                                    <div className="btnForm">

                                        <button className="ui primary button">
                                            <Link to="/"> Cancel </Link>
                                        </button>

                                        <div className="forgot-btn">
                                            <div className="field">
                                                <button className="ui primary button">Login</button>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

userLogin.propTypes = {
    userSubmitSignin: PropTypes.func,
    addFlashMessages: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {
    userSubmitSignin,
    addFlashMessages
})(userLogin);