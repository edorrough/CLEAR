import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import classnames from 'classnames';
import { addFlashMessages } from '../../../../../actions/flashMessages';
import { 
    saveAdmin,
    fetchAdmin,
    updateAdmin
} from '../../../../../actions/userCRUDaction';

class UsersForm extends Component {
    state = {
        _id: this.props.admin ? this.props.admin._id : null,
        firstname: this.props.admin ? this.props.admin.firstname : '',
        lastname: this.props.admin ? this.props.admin.lastname : '',
        email: this.props.admin ? this.props.admin.email : '',
        notes: this.props.admin ? this.props.admin.note : '',
        profileImage: null,
        otherImages: [],

        loading: false,
        done: false,
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        // debugger
        this.setState({
            _id: nextProps.admin._id,
            firstname: nextProps.admin.firstname,
            lastname: nextProps.admin.lastname,
            email: nextProps.admin.email,
            notes: nextProps.admin.notes
        })
    }

    componentDidMount = () => {
        if(this.props.params) {
            this.props.fetchAdmin(this.props.params._id);
        }
    }

    onProfileChange = (e) => {
        this.setState({
            profileImage: e.target.files[0]
        })
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
            const {
                _id,
                firstname,
                lastname,
                email,
                profileImage,
                notes
            } = this.state;

            this.setState({ loading: true })

            if(_id) {
                debugger
                this.props.updateAdmin({
                    _id,
                    firstname,
                    lastname,
                    profileImage,
                    email,
                    notes
                })
                .then(
                    () => {
                        this.props.addFlashMessages({
                            type: 'success',
                            text: 'You have successful updated the user'
                        });
                        this.setState({ done: true })
                    },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                )
            } else {
                this.props.saveAdmin({ 
                    firstname,
                    lastname,
                    email,
                    profileImage,
                    notes
                })
                .then(
                    () => {
                        this.props.addFlashMessages({
                            type: 'success',
                            text: 'You have successful added the user'
                        });
                        this.setState({ done: true })
                    },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                )
            }
        }
    }

    render() {
        const form = (
            <div className="userForm-page-container">
                <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>

                    <div className="ui raised segment">
                        <div className="ui red ribbon label">Form</div>

                        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                        <h4 className="ui dividing header">New Admin Information</h4>

                        <div className="two fields">
                            <div className={classnames('field', { error: !!this.state.errors.firstname })}>
                                <label htmlFor="firstname">First Name *</label>
                                <input
                                    id="firstname"
                                    value={this.state.firstname}
                                    name="firstname"
                                    onChange={this.handleChange}
                                />
                                <span>{this.state.errors.firstname}</span>
                            </div>

                            <div className={classnames('field', { error: !!this.state.errors.lastname })}>
                                <label htmlFor="lastname">Last Name *</label>
                                <input
                                    id="lastname"
                                    value={this.state.lastname}
                                    name="lastname"
                                    onChange={this.handleChange}
                                />
                                <span>{this.state.errors.lastname}</span>
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
                            <span>{this.state.errors.email}</span>
                        </div>

                        <div className="field">
                            <label htmlFor="file">Picture: (Only support .jpg .jpeg .png)</label>
                            <input 
                                type="file"
                                encType="multipart/form-data"
                                id="file"
                                name="image"
                                accept="image/*"
                                onChange={this.onProfileChange}
                                placeholder="If you already had a profile picture, doing this will replace your original profile picture.."
                            />
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
            <div className="usersForm-page">
                {this.state.done ? <Redirect to="/admins/current-admins" /> : form }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    if(props.params) {
        return {
            admin: state.admins.find(item => item._id === props.params._id)
        };
    }

    return { admin: null };
}

export default connect(mapStateToProps, {
    saveAdmin,
    fetchAdmin,
    updateAdmin,
    addFlashMessages
})(UsersForm);