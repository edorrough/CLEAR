import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { saveUser, fetchUserEmail, updatedUser } from '../../../../actions/userEmailsAction';
import './common.css';

class EmailsForm extends Component {
    state = {
        firstname: this.props.user ? this.props.user.firstname : '',
        lastname: this.props.user ? this.props.user.lastname : '',
        email: this.props.user ? this.props.user.email : '',
        notes: this.props.user ? this.props.user.notes : '',
        loading: false,
        errors: {},
        done: false
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            _id: nextProps.user._id,
            firstname: nextProps.user.firstname,
            lastname: nextProps.user.lastname,
            email: nextProps.user.email,
            notes: nextProps.user.notes,
        })
    }

    componentDidMount = () => {
        if(this.props.params) {
            this.props.fetchUserEmail(this.props.params._id);
        }
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
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let errors = {}
        if(this.state.firstname === '') errors.firstname = 'First name cannot be empty';
        if(this.state.lastname === '') errors.lastname = 'Last name cannot be empty';
        if(this.state.email === '') errors.email = 'Email cannot be empty';
        this.setState({ errors })

        const isValid = Object.keys(errors).length === 0;

        if(isValid) {
            const { _id, firstname, lastname, email, notes } = this.state;

            this.setState({ loading: true });

            if(_id) {
                this.props.updatedUser({
                    _id,
                    firstname,
                    lastname,
                    email,
                    notes
                })
                .then(
                    () => {
                        this.setState({ done: true })
                    },
                    (err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false }))
                )

            } else {

                this.props.saveUser({
                    firstname,
                    lastname,
                    email,
                    notes
                })
                .then(
                    () => {
                        this.setState({ done: true })
                    },
                    (err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false }))
                )
            }

        }
    }

    render() {
        const form = (
            <div className="emaily-container">
                <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
                    <h1>Add new user</h1>
                    <div className="ui raised segment">
                        <div className="ui teal ribbon label">New User</div>

                        <h4 className="ui dividing header">New User Information</h4>

                        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}


                        <div className="two fields">
                            <div className={classnames('field', { error: !!this.state.errors.firstname })}>
                                <label htmlFor="firstname">First Name *</label>
                                <input
                                    id="firstname"
                                    value={this.state.firstname}
                                    name="firstname"
                                    onChange={this.handleChange}
                                />
                                <span className="error-msg">{this.state.errors.firstname}</span>
                            </div>

                            <div className={classnames('field', { error: !!this.state.errors.lastname })}>
                                <label htmlFor="lastname">Last Name *</label>
                                <input
                                    id="lastname"
                                    value={this.state.lastname}
                                    name="lastname"
                                    onChange={this.handleChange}
                                />
                                <span className="error-msg">{this.state.errors.lastname}</span>
                            </div>
                        </div>


                        <div className={classnames('field', { error: !!this.state.errors.email })}>
                            <label htmlFor="email">Email *</label>
                            <input
                                id="email"
                                value={this.state.email}
                                name="email"
                                onChange={this.handleChange}
                            />
                            <span className="error-msg">{this.state.errors.email}</span>
                        </div>

                        <div className="field">
                            <label htmlFor="notes">Note</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={this.state.notes}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="field">
                            <button className="ui primary button">Save</button>
                        </div>

                    </div>
                </form>
            </div>
        )
        return (
            <div className="ui container">
                {this.state.done ? <Redirect to="/admins/current-userslist"/> : form }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    if(props.params) {
        return {
            user: state.users.find(item => item._id === props.params._id)
        }
    }
    return { user: null }
}

export default connect(mapStateToProps, {
    saveUser,
    fetchUserEmail,
    updatedUser
})(EmailsForm);