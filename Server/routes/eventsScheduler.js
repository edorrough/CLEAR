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
    app.get('/api/events', (req, res) => {
        db.collection('events').find({}).toArray((err, events) => {
            if(err) {
                return res.status(500).json({ errors: { global: 'Something went wrong. Contact Administrator' }});
            } else {
                res.status(200).json({ events })
            }
        })
    });

    app.get('/api/events/:_id', (req, res) => {
        db.collection('events').findOne({ _id: new mongoose.Types.ObjectId(req.params._id)}, (err, event) => {
            if(err) throw err;

            return res.status(200).json({ event })
        })
    });

    app.put('/api/events/:_id', (req, res) => {
        const { errors, isValid } = validate(req.body);
        if(isValid) {
            let { title, note, eventDone } = req.body;
            if(eventDone === 'true') {
                eventDone = true
            } else {
                eventDone = false
            }

            db.collection('events').findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(req.params._id) },
                { $set: {
                    title,
                    note,
                    eventDone
                    },
                },
                { returnOriginal: false }, // This is important
                ( err, newEventResult ) => {
                    // console.log("result in db.collection: ", result)
                    if(err) {
                        return res.status(500).json({ errors: { global: err } });
                    } else {
                        res.status(200).json({
                            event: newEventResult.value
                        })
                    }
                }
            )

        } else {
            return res.status(400).json({ errors })
        }
    });

    app.post('/api/events', (req, res) => {
        console.log(req.body)

        const { errors, isValid } = validate(req.body);            
        if(isValid) {
            let {
                title,
                note,
                eventDone,
                startDate,
                endDate
            } = req.body;
            if(eventDone === 'true') {
                eventDone = true
            } else {
                eventDone = false
            }

            const today = new Date();
        //     const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        //     const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        //     const dateTime = date+' '+time;

            const compareDate = today.setDate(today.getDate());

            db.collection('events').insertOne({
                title,
                desc: note,
                eventDone,
                // createDate: dateTime,
                start: startDate,
                end: endDate,
                comparedDate: compareDate
            }, (err, result) => {
                if(err) {
                    return res.status(500).json({ errors: { global: 'Something went wrong in database' }});
                } else {
                    res.status(200).json({ event: result.ops[0] });
                }
            })

        } else {
            return res.status(400).json({ errors })
        }

    });

    app.delete('/api/events/:_id', (req, res) => {
        db.collection('events').findOneAndDelete(
            { _id: new mongoose.Types.ObjectId(req.params._id) },
            (err, event) => {
                
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