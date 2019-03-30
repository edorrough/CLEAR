import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

export default function AuthenticatedRoute({ component: Component, isAuthenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => isAuthenticated === true ? 
            <Component {...props} {...rest} /> : 
            <Redirect to="/user/login" />}
        />
    )
}