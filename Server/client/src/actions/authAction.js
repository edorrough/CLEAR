import setAuthorizationToken from '../utils/setAuthorizationToken';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import history from '../components/history/history';

export const FORGOT_PASSWORD_SUBMIT = 'forgot_password';
export const USER_LOGIN = 'user_login';
export const SUCCESSFULLY_CHANGE_PASSWORD = 'change_password';
export const AUTH_FAILED = 'login_failed';
export const USER_LOGGED = 'user_logged';

function handleResponse(response) {
    // debugger
    if(response.ok) {
        return response.json()

    } else {
        let error = new Error(response.statusText);

        error.response = response;
        throw error;
    }
}

export const setCurrentUser = (user) => {
    return {
        type: USER_LOGIN,
        user
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}))
        history.push('/')
    }
}

export const failedLogin = (user) => {
    return {
        type: AUTH_FAILED,
        user
    }
}

export const userSubmitSignin = (userData) => {
    return dispatch => {
        return axios.post('/api/login', userData)
        // .then(handleResponse)
        .then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwtDecode(token))) ;
        })
        .catch(error => {
            // console.log(error.response.data)
            dispatch(failedLogin(error.response.data))
        })
    }
}

export const LoggedFirstTime = (user) => {
    return {
        type: USER_LOGGED,
        user
    }
}

export const firstTimeLogin = (user) => {
    return dispatch => {
        return fetch(`/api/login-firsttime/${user.token}`, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleResponse)
        .then(user => dispatch(LoggedFirstTime(user)))
    }
    // return dispatch => {
    //     return axios.post('/api/login-firsttime', user)
    //     .then(res => {
    //         const token = res.data.token;
    //         debugger
    //         localStorage.setItem('jwtToken', token);
    //         setAuthorizationToken(token);
    //         dispatch(setCurrentUser(jwtDecode(token))) ;
    //     })
    //     .catch(error => {
    //         debugger
    //         dispatch(failedLogin(error.response.data))
    //     })
    // }
}

const passwdReset = (pwdResetData) => {
    return {
        type: FORGOT_PASSWORD_SUBMIT,
        pwdResetData
    }
}

export const forgotPasswdSubmit = (userEmail) => {
    return dispatch => {
        return fetch('/api/passwd_forgot', {
            method: 'post',
            body: JSON.stringify(userEmail),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleResponse)
        .then(data => dispatch(passwdReset(data)))
    }
}

const submittedResetPW = (userData) => {
    return {
        type: SUCCESSFULLY_CHANGE_PASSWORD,
        userData
    }
}

export const resetPasswdSubmit = (userDataPW) => {
    return dispatch => {
        return fetch(`/api/passwd_reset/${userDataPW.token}`, {
            method: 'post',
            body: JSON.stringify(userDataPW),
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + userDataPW.token
                // 'Authorization': setAuthorizationToken(userDataPW.token)
            }
        })
        .then(handleResponse)
        .then(user => dispatch(submittedResetPW(user)))
    }
}