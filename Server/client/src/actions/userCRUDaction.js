export const SET_ADMINS = 'set_admins';
export const ADD_ADMIN = 'add_admin';
export const ADMIN_FETCHED = 'admin_fetched';
export const ADMIN_UPDATED = 'admin_updated';
export const ADMIN_DELETED = 'admin_deleted';

function handleResponse(response) {
    if(response.ok) {
        return response.json()

    } else {
        let error = new Error(response.statusText);

        error.response = response;
        throw error;
    }
}

export function setAdmins(admins) {
    return {
        type: SET_ADMINS,
        admins
    }
}

export function fetchAdmins() {
    return dispatch => {
        fetch('/api/admins')
        .then(res => res.json())
        .then(data => dispatch(setAdmins(data.admins)))
    }
}

export function adminFetched(admin) {
    return {
        type: ADMIN_FETCHED,
        admin
    }
}

export function fetchAdmin(id) {
    return dispatch => {
        fetch(`/api/admins/${id}`)
        .then(res => res.json())
        .then(data => dispatch(adminFetched(data.admin)))
    }
}

export function addAdmin(admin) {
    return {
        type: ADD_ADMIN,
        admin
    }
}

export function saveAdmin(userData) {
    if(userData.profileImage) {
        const data = new FormData();
        data.append('file', userData.profileImage);
        data.append('userData', JSON.stringify(userData));
    
        return dispatch => {
            return fetch('/api/admins', {
                method: 'post',
                body: data
            })
            .then(handleResponse)
            .then(data => dispatch(addAdmin(data.admin)))
        }
    } else {

        return dispatch => {
            return fetch('/api/admins', {
                method: 'post',
                body: JSON.stringify(userData),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(handleResponse)
            .then(data => dispatch(addAdmin(data.admin)))
        }
    }
}

export function adminUpdated(admin) {
    return {
        type: ADMIN_UPDATED,
        admin
    }
}

export function updateAdmin(userData) {
    if(userData.profileImage) {
        const data = new FormData();
        data.append('file', userData.profileImage);
        data.append('userData', JSON.stringify(userData));
    
        return dispatch => {
            return fetch(`/api/admins/${userData._id}`, {
                method: 'put',
                body: data
            })
            .then(handleResponse)
            .then(data => dispatch(adminUpdated(data.admin)))
        }
    } else {

        return dispatch => {
            return fetch(`/api/admins/${userData._id}`, {
                method: 'put',
                body: JSON.stringify(userData),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(handleResponse)
            .then(data => dispatch(adminUpdated(data.admin)))
        }
    }
}

export function adminDeleted(adminId) {
    return {
        type: ADMIN_DELETED,
        adminId
    }
}

export function deleteAdmin(id) {
    return dispatch => {
        return fetch(`/api/admins/${id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleResponse)
        .then(data => dispatch(adminDeleted(id)))
    }
}