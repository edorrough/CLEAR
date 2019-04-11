import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { addFlashMessages } from '../../../../../actions/flashMessages';
import { saveEvent, fetchEvent, updateEvent } from '../../../../../actions/eventsSchedulersAction';
import Calendar from "../../../../calendar/calendar";

const style = {
    position: "relative",
    margin: "50px auto"
}

class SchedulersForm extends Component {
    state = {
        _id: this.props.event ? this.props.event._id : null,
        title: this.props.event ? this.props.event.title : '',
        note: this.props.event ? this.props.event.note : '',
        eventDone: this.props.event ? this.props.event.eventDone: 'false',
        eventErrorMsg: '',

        day: '',

        loading: false,
        done: false,
        errors: {}
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            _id: nextProps.event._id,
            title: nextProps.event.title,
            notes: nextProps.event.notes,
            eventDone: nextProps.event.eventDone
        })
    }

    componentDidMount = () => {
        if(this.props.params) {
            this.props.fetchEvent(this.props.params._id);
        }
    }

    handleChange = (e) => {
        if(!!this.state.errors[e.target.name]) {

            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
    
            this.setState({ 
                [e.target.name]: e.target.value,
                errors
            })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let errors = {}
        if(this.state.title === '') errors.title = 'Title cannot be empty';
        if(this.state.note === '') errors.note = 'Note cannot be empty';
        if(this.state.eventDone === '') errors.eventErrorMsg = 'Is it finisheded?';

        this.setState({ errors })
        const isValid = Object.keys(errors).length === 0;

        if(isValid) {
            const { _id, title, note, eventDone } = this.state;

            if(_id) {
                this.props.updateEvent({
                    _id,
                    title,
                    note,
                    eventDone
                })
                .then( () => {
                    this.props.addFlashMessages({
                        type: 'success',
                        text: 'You have successful updated the event'
                    });
                    this.setState({ done: true });
                },
                (err) => {
                    err.response.json()
                    .then(({ errors }) => this.setState({ errors, loading: false }))
                })
            } else {

                this.props.saveEvent({
                    title,
                    note,
                    eventDone
                })
                .then( () => {
                    this.props.addFlashMessages({
                        type: 'success',
                        text: 'You have successful added the event'
                    });
                    this.setState({ done: true });
                },
                (err) => {
                    err.response.json()
                    .then(({ errors }) => this.setState({ errors, loading: false }))
                })
            }
        }
    }

    onDayClick = (e, day) => {
        // console.log(month)
        console.log(day)
        // console.log(typeof(day))
        
    }

    render() {
        const { day } = this.state;

        const form = (
            <div className="schedulers-form-container">
                <div className="ui container">

                    <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
                        <div className="ui raised segment">
                            <div className="ui blue ribbon label">Events</div>

                            {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                            <h4 className="ui dividing header">New Events Information</h4>

                            <div className={classnames('field', { error: !!this.state.errors.title })}>
                                <label htmlFor="firstname">Title *</label>
                                <input
                                    id="title"
                                    value={this.state.title}
                                    name="title"
                                    onChange={this.handleChange}
                                />
                                <span className="error-msg">{this.state.errors.title}</span>
                            </div>

                            <div className="field">
                                <label htmlFor="eventDone">Is it finished?</label>
                                <select 
                                    className="ui fluid search dropdown"
                                    onChange={this.handleChange}
                                    name="eventDone"
                                    id="eventDone"
                                    value={this.state.eventDone}
                                >
                                    <option value=""></option>
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                                <span className="error-msg">{this.state.errors.eventErrorMsg}</span>
                            </div>

                            {/* <Calendar style={style} width="302px" onDayClick={(e, day) => this.onDayClick(e, day)} /> */}

                            <Calendar 
                                style={style} 
                                width="302px" 
                                onDayClick={(e, day) => this.onDayClick(e, day)} 
                                
                            />

                            <div className={classnames('field', { error: !!this.state.errors.note })}>
                                <label htmlFor="firstname">Note *</label>
                                <textarea
                                    id="note"
                                    value={this.state.note}
                                    name="note"
                                    onChange={this.handleChange}
                                />
                                <span className="error-msg">{this.state.errors.note}</span>
                            </div>

                            <div className="field">
                                <button className="ui primary button">Save</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        )
        return (
            <div className="schedulers-form">
                {this.state.done ? <Redirect to="/admins/events/current-events" /> : form }
            </div>
        )
    }
}

SchedulersForm.propTypes = {
    saveEvent: PropTypes.func
}

const mapStateToProps = (state, props) => {
    if(props.params) {
        return {
            event: state.events.find(item => item._id === props.params._id)
        }
    }
    return { event: null }
}

export default connect(mapStateToProps, {
    saveEvent,
    fetchEvent,
    updateEvent,
    addFlashMessages
})(SchedulersForm);