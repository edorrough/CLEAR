const mongoose = require('mongoose');

const validate = (data) => {
    let errors = {};

    if(data.title === '') errors.title = 'Title cannot be empty';
    if(data.note === '') errors.note = 'Note cannot be empty';
    if(data.startDate === '') errors.startDate = "Start date cannot be empty";
    if(data.endDate === '') errors.endDate = "End date cannot be empty";

    const isValid = Object.keys(errors).length === 0;
    return { errors, isValid};
}

module.exports = (app, db) => {
    app.get('/api/visitor-events', (req, res) => {
        db.collection('visitorSchedule').find({}).toArray((err, schedules) => {
            if(err) {
                return res.status(500).json({ errors: { global: 'Something went wrong. Contact Administrator' }});
            } else {
                res.status(200).json({ schedules })
            }
        })
    });

    app.get('/api/visitor-events/:_id', (req, res) => {
        db.collection('visitorSchedule').findOne({ _id: new mongoose.Types.ObjectId(req.params._id)}, (err, schedule) => {
            if(err) throw err;

            return res.status(200).json({ schedule })
        })
    });

    app.put('/api/visitor-events/:_id', (req, res) => {
        const { errors, isValid } = validate(req.body);
        if(isValid) {
            let { 
                title,
                desc,
                eventDone,
                startDate,
                endDate,
                allDay,
                location
            } = req.body;
            if(eventDone === 'true') {
                eventDone = true
            } else {
                eventDone = false
            }
            if(allDay === 'false') {
                allDay = false
            } else {
                allDay = true
            }

            let startDateParse = new Date(startDate)
            let theStartDate = startDateParse.getFullYear() + '-' + (startDateParse.getMonth()+1) +'-'+ startDateParse.getDate();
            let theStartTime = startDateParse.getHours() + ':' + (startDateParse.getMinutes() < 10 ? '0': '') + startDateParse.getMinutes();
            let ampm = startDateParse.getHours() >= 12 ? 'PM' : 'AM';
            let theStartDateTime = theStartDate + ' / ' + theStartTime + ' ' + ampm;

            let endDateParse = new Date(endDate)
            let theEndDate = endDateParse.getFullYear() + '-' + (endDateParse.getMonth() + 1) + '-' + endDateParse.getDate();
            let theEndTime = endDateParse.getHours() + ':' + (endDateParse.getMinutes() < 10 ? '0' : '' ) + endDateParse.getMinutes();
            let AMPM = endDateParse.getHours() >= 12 ? 'PM' : 'AM';
            let theEndDateTime = theEndDate + ' / ' + theEndTime + ' ' + AMPM;
        
            const today = new Date();
            const compareDate = today.setDate(today.getDate());

            db.collection('visitorSchedule').findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(req.params._id) },
                { $set: {
                    title,
                    desc,
                    eventDone,
                    showStartTime: theStartDateTime,
                    showEndTime: theEndDateTime,
                    start: startDate,
                    end: endDate,
                    allDay,
                    location,
                    comparedDate: compareDate, // This compares emaily to send emails weekly
                    eventsShowDateCompared: new Date(theEndDate) // This compares and displays in public page
                    },
                },
                { returnOriginal: false }, // This is important
                ( err, newScheduler ) => {
                    // console.log("result in db.collection: ", result)
                    if(err) {
                        return res.status(500).json({ errors: { global: err } });
                    } else {
                        res.status(200).json({
                            schedule: newScheduler.value
                        })
                    }
                }
            )

        } else {
            return res.status(400).json({ errors })
        }
    });

    app.post('/api/visitor-events', (req, res) => {
        const { errors, isValid } = validate(req.body);            
        if(isValid) {
            let {
                title,
                note,
                eventDone,
                startDate,
                endDate,
                allDay,
                location
            } = req.body;
            if(eventDone === 'true') {
                eventDone = true
            } else {
                eventDone = false
            }
            if(allDay === 'false') {
                allDay = false
            } else {
                allDay = true
            }

            let startDateParse = new Date(startDate)
            let theStartDate = startDateParse.getFullYear() + '-' + (startDateParse.getMonth()+1) +'-'+ startDateParse.getDate();
            let theStartTime = startDateParse.getHours() + ':' + (startDateParse.getMinutes() < 10 ? '0': '') + startDateParse.getMinutes();
            let ampm = startDateParse.getHours() >= 12 ? 'PM' : 'AM';
            let theStartDateTime = theStartDate + ' / ' + theStartTime + ' ' + ampm;

            let endDateParse = new Date(endDate)
            let theEndDate = endDateParse.getFullYear() + '-' + (endDateParse.getMonth() + 1) + '-' + endDateParse.getDate();
            let theEndTime = endDateParse.getHours() + ':' + (endDateParse.getMinutes() < 10 ? '0' : '' ) + endDateParse.getMinutes();
            let AMPM = endDateParse.getHours() >= 12 ? 'PM' : 'AM';
            let theEndDateTime = theEndDate + ' / ' + theEndTime + ' ' + AMPM;
        
            const today = new Date();
            const compareDate = today.setDate(today.getDate());

            db.collection('visitorSchedule').insertOne({
                title,
                desc: note,
                eventDone,
                showStartTime: theStartDateTime,
                showEndTime: theEndDateTime,
                start: startDate,
                end: endDate,
                allDay,
                location,
                comparedDate: compareDate, // This compares emaily to send emails weekly
                eventsShowDateCompared: new Date(theEndDate) // This compares and displays in public page
            }, (err, result) => {
                if(err) {
                    return res.status(500).json({ errors: { global: 'Something went wrong in database' }});
                } else {
                    res.status(200).json({ schedule: result.ops[0] });
                }
            })

        } else {
            return res.status(400).json({ errors })
        }
    });

    app.delete('/api/visitor-events/:_id', (req, res) => {
        console.log(req.params._id)
        db.collection('visitorSchedule').findOneAndDelete(
            { _id: new mongoose.Types.ObjectId(req.params._id) },
            (err, schedule) => {
                
                if(err) {
                    console.log("err in findOneAndDelete: ", err)
                    return res.status(500).json({ errors: { global: err } });
                } else {
                    res.status(200).json({ message: 'successful' });
                }
            }
        )
    });
}