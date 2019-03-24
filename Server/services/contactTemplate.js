
module.exports = (
    firstname,
    lastname,
    email,
    message,
    phoneNum
) => {
    return `
        <html>
            <body>
                <h3>Query details from ${firstname + ' ' +lastname}</h3>
                <ul>
                    <li>Name: ${firstname + ' ' + lastname}</li>
                    <li>Email: ${email}</li>
                    <li>Phone number: ${phoneNum === '' ? 'N/A' : phoneNum}</li>
                </ul>
                <h4>${message}</h4>
            </body>
        </html>
    `
};