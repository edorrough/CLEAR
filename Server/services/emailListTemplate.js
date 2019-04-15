
module.exports = ( users, events ) => {
    
    return `
        <html>
            <body>
                <h1>This is a test email for reminder</h1>
                <h3>The next 7 days events</h3>
                <ul>
                    ${events.map(event => {
                        let startDateParse = new Date(event.start);
                        let theStart = new Date(startDateParse.getFullYear(), startDateParse.getMonth(), startDateParse.getDate() ,
                            startDateParse.getHours() +6, startDateParse.getMinutes(), startDateParse.getSeconds() )

                        let endDateParse = new Date(event.end);
                        let theEnd = new Date(endDateParse.getFullYear(), endDateParse.getMonth(), endDateParse.getDate() ,
                            endDateParse.getHours() + 6, endDateParse.getMinutes(), endDateParse.getSeconds() )
        

                        return (`<h3>Event Title and Time</h3>`+
                                `<li><h3>Title: ` + event.title + `</h3></li>`+
                                `<li> Start time: ` + theStart.toLocaleString('en-US', {
                                    year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
                                }) + `</li>` +
                                `<li> End time: ` + theEnd.toLocaleString('en-US', { 
                                    year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
                                }) + `</li>` +
                                `<h4> Event description </h4>`+
                                `<li>` + event.desc + `</li>` +
                                `<hr>`
                    )})}
                </ul>
                <h4>Please do not reply to this email</h4>
            </body>
        </html>
    `
}