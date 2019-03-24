export const SEND_MESSAGE = 'send_message';

function handleResponse(response) {
    if(response.ok) {
        return response.json()

    } else {
        let error = new Error(response.statusText);

        error.response = response;
        throw error;
    }
}

export function sendMessage(resMsg) {
    return {
        type: SEND_MESSAGE,
        resMsg
    }
}

export function userSendMessage(msg) {
    return dispatch => {
        return fetch('/api/contact-us', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify(msg)
        })
        .then(handleResponse)
        .then(data => dispatch(sendMessage(data)))
    }
}