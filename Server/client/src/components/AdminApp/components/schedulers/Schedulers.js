import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SchedulersNav from './SchedulersNav';
import AuthenticatedRoute from '../utils/AuthenticatedRoute';
import SchedulersList from '../schedulers/schedulersList/SchedulersList';
import SchedulersForm from '../schedulers/schedulersForm/SchedulersForm';
import VisitorSchedulerForm from '../schedulers/visitorSchedulerForm/VisitorSchedulerForm';
import PrivateList from './privateSchedulerList/PrivateList';
import { connect } from 'react-redux';
import { fetchEvents } from '../../../../actions/eventsSchedulersAction';
import { fetchVisitorEvents } from '../../../../actions/visitorSchedulerAction';
import {
    BrowserRouter as Router
} from 'react-router-dom';

const routes = [
    { path: '/admins/events/current-events', exact: true, main: () => <SchedulersList /> },
    { path: '/admins/events/add-new-event', exact: true, main: () => <SchedulersForm />},
    { path: '/admins/events/add-new-event/:_id', exact: true, main: (routerProps) => <SchedulersForm params={routerProps.match.params}/> },
    { path: '/admins/events/private', exact: true, main: () => <PrivateList /> },
    { path: '/admins/events/add-new-visitor-event', exact: true, main: () => <VisitorSchedulerForm />},
    { path: '/admins/events/add-new-visitor-event/:_id', exact: true, main: (routerProps) => <VisitorSchedulerForm params={routerProps.match.params}/> }
]


class Schedulers extends Component {
    componentDidMount = () => {
        this.props.fetchEvents();
        this.props.fetchVisitorEvents();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <Router>
                <div className="scheduler-page">
                    <SchedulersNav />

                    {routes.map((route, events) => (
                        <AuthenticatedRoute 
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                            isAuthenticated={isAuthenticated}
                        />

                    ))}
                </div>
            </Router>
        )
    }

}

Schedulers.propTypes = {
    fetchEvents: PropTypes.func,
    fetchVisitorEvents: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {
    fetchEvents,
    fetchVisitorEvents
})(Schedulers);