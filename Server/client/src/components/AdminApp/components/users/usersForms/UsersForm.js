import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';

class UsersForm extends Component {
    state = {
        _id: this.props.user ? this.props.user._id : null,
        firstname: this.props.user ? this.props.user.firstname : '',
        lastname: this.props.user ? this.props.user.lastname : '',
        email: this.props.user ? this.props.user.email : '',
        notes: this.props.user ? this.props.user.note : '',
        profileImage: null,
        otherImages: [],

        loading: false,
        done: false,
        errors: {}
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    if(props.params) {
        return {
            // user: state.
        }
    }

    return { user: null }
}

export default connect(mapStateToProps, {

})(UsersForm);