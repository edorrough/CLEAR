import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFlashMessages } from '../../../../../actions/flashMessages';
import DatePicker from "react-datepicker";
import { 
    saveVisitorEvent, 
    fetchVisitorEvent,
    updateVisitorEvent
} from '../../../../../actions/visitorSchedulerAction';
import "react-datepicker/dist/react-datepicker.css";
import '../common.css';

class VisitorSchedulerForm extends Component {
    state = {
        _id: this.props.event ? this.props.event._id : null,
        title: this.props.event ? this.props.event.title : '',
        note: this.props.event ? this.props.event.note : '',
        eventDone: this.props.event ? this.props.event.eventDone: 'false',
        startDate: new Date(),
        endDate: new Date(),
        dateFormat: "MMMM d, yyyy h:mm aa",
        allDay: this.props.event ? this.props.event.allDay: 'false',
        location: this.props.event ? this.props.event.location: '',
        eventErrorMsg: '',
        loading: false,
        done: false,
        errors: {}
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            _id: nextProps.schedule._id,
            title: nextProps.schedule.title,
            note: nextProps.schedule.note,
            eventDone: nextProps.schedule.eventDone,
            allDay: nextProps.schedule.allDay,
            location: nextProps.schedule.location,
            startDate: new Date(nextProps.schedule.start),
            endDate: new Date(nextProps.schedule.end)
        })
    }

    componentDidMount = () => {
        if(this.props.params) {
            this.props.fetchVisitorEvent(this.props.params._id);
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

    handleStartDateChange = (date) => {
        this.setState({ startDate: date });
    }

    handleEndDateChange = (date) => {
        this.setState({ endDate: date });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let errors = {}
        if(this.state.title === '') errors.title = 'Title cannot be empty';
        if(this.state.note === '') errors.note = 'Note cannot be empty';
        if(this.state.eventDone === '') errors.eventErrorMsg = 'Is it finisheded?';
        if(this.state.startDate === '') errors.startDate = 'Start date cannot be empty';
        if(this.state.endDate === '') errors.endDate = 'End date cannot be empty';
        if(this.state.location === '') errors.location = 'Location cannot be empty';

        this.setState({ errors })
        const isValid = Object.keys(errors).length === 0;

        if(isValid) {
            const { _id, title, note, eventDone, startDate, endDate, allDay, location } = this.state;

            if(_id) {
                this.props.updateVisitorEvent({
                    _id,
                    title,
                    note,
                    eventDone,
                    startDate,
                    endDate,
                    allDay,
                    location
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

                this.props.saveVisitorEvent({
                    title,
                    note,
                    eventDone,
                    startDate,
                    endDate,
                    allDay,
                    location
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

    render() {
        const form = (
            <div className="visitor-schedulers-form-container">
                <div className="visitor-schedulers-form-wrapper">
                    <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
                        <div className="ui raised segment">
                            <div className="ui orange right ribbon label">Visitor Events</div>

                            {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                            <h4 className="ui dividing header">New Visitor Event Information</h4>

                            <div className={classnames('field', { error: !!this.state.errors.title })}>
                                <label htmlFor="title">Title *</label>
                                <input
                                    id="title"
                                    value={this.state.title}
                                    name="title"
                                    onChange={this.handleChange}
                                />
                                <span className="error-msg">{this.state.errors.title}</span>
                            </div>

                            <div className="two fields">

                                <div className={classnames('field', { error: !!this.state.errors.startDateTime })}>

                                    <label>Start Time *</label>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        selectsStart
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        onChange={this.handleStartDateChange}
                                        timeIntervals={15}
                                        dateFormat={this.state.dateFormat}
                                        showTimeSelect
                                        showMonthDropdown={this.state.showMonthDropdown}
                                    />
                                </div>

                                <div className={classnames('field', { error: !!this.state.errors.endDateTime })}>

                                    <label>End Time *</label>
                                    <DatePicker
                                        selected={this.state.endDate}
                                        selectsEnd
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        onChange={this.handleEndDateChange}
                                        timeIntervals={15}
                                        dateFormat={this.state.dateFormat}
                                        showMonthDropdown={this.state.showMonthDropdown}
                                        showTimeSelect
                                    />
                                </div>
                            </div>

                            <div className={classnames('field', { error: !!this.state.errors.location })}>
                                <label htmlFor="location">Location *</label>
                                <input
                                    id="location"
                                    value={this.state.location}
                                    name="location"
                                    onChange={this.handleChange}
                                />
                                <span className="error-msg">{this.state.errors.location}</span>
                            </div>

                            <div className="field">
                                <label htmlFor="allDay">Is it all day event?</label>
                                <select
                                    className="ui fluid search dropdown"
                                    onChange={this.handleChange}
                                    name="allDay"
                                    id="allDay"
                                    value={this.state.allDay}
                                >
                                    <option value=""></option>
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                                <span className="error-msg">{this.state.errors.allDay}</span>
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

                            <div className={classnames('field', { error: !!this.state.errors.note })}>
                                <label htmlFor="note">Description *</label>
                                <textarea
                                    id="note"
                                    value={this.state.note}
                                    name="note"
                                    onChange={this.handleChange}
                                />
                                <span className="error-msg">{this.state.errors.note}</span>
                            </div>

                            <div className="conform-btn">
                                <button className="ui primary button">Save</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        )
        return (
            <div className="visitor-scheduler-form">
                {this.state.done ? <Redirect to="/admins/events/current-events"/> : form}
            </div>
        )
    }
}

VisitorSchedulerForm.propTypes = {
    addFlashMessages: PropTypes.func,
    saveVisitorEvent: PropTypes.func,
    updateVisitorEvent: PropTypes.func,
    fetchVisitorEvent: PropTypes.func
}

const mapStateToProps = (state, props) => {
    if(props.params) {
        return {
            schedule: state.schedules.find(item => item._id === props.params._id)
        }
    }
    return { schedule: null }
}

export default connect(mapStateToProps, {
    addFlashMessages,
    saveVisitorEvent,
    fetchVisitorEvent,
    updateVisitorEvent
})(VisitorSchedulerForm);