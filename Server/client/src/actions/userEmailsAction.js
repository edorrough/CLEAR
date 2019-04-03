export const SET_USERS = 'set_users'; 
export const ADD_USER = 'add_user';
export const USER_FETCHED = 'user_fetched';
export const USER_UPDATED = 'user_updated';
export const USER_DELETED = 'user_deleted';

function handleResponse(response) {
    if(response.ok) {
        return response.json()

    } else {
        let error = new Error(response.statusText);

        error.response = response;
        throw error;
    }
}

export function setUsers(users) {
    return {
        type: SET_USERS,
        users
    }
}

export function fetchUserEmails() {
    return dispatch => {
        fetch('/api/users/emailsList')
        .then(res => res.json())
        .then(data => dispatch(setUsers(data.users) ))
    }
}

export function userFetched(user) {
    return {
        type: USER_FETCHED,
        user
    }
}

export function fetchUserEmail(id) {
    return dispatch => {
        fetch(`/api/users/emailsList/${id}`)
        .then(res => res.json())
        .then(data => dispatch(userFetched(data.user) ))
    }
}

export function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

export function saveUser(data) {
    return dispatch => {
        return fetch('/api/user/emailsList', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(handleResponse)
        .then(data => dispatch(addUser(data.user)))
    }
}

export function userUpdated(user) {
    return {
        type: USER_UPDATED,
        user
    }
};

export function updatedUser(user) {
    return dispatch => {
        return fetch(`/api/user/emailsList/${user._id}`, {
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(handleResponse)
        .then(data => dispatch(userUpdated(data.user)))
    }
}

export function userDeleted(userId) {
    return {
        type: USER_DELETED,
        userId
    }
}

export function deleteUser(id) {
    return dispatch => {
        return fetch(`/api/user/emailsList/${id}`, {
            method: 'delete',
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(handleResponse)
        .then(data => dispatch(userDeleted(id)))
    }
}