import axios from 'axios';

export default function setAuthorizationToken(token) {
    if(token) {
        // const BearerToken = `Bearer ${token}`
        // return BearerToken;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}