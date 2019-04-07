
module.exports = ( users, events ) => {
    return `
        <html>
            <body>
                <h1>This is a test email for reminder</h1>
                <h3>The next 7 days events</h3>
                <ul>
                    <li><h3>Event Title:</h3>${events.map(event => event.title)}</li>
                    <li><h4>Description: ${events.map(event => event.note)}</li>
                </ul>
                <h4>Please do not reply to this email</h4>
            </body>
        </html>
    `
}