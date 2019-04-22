const cron = require('node-cron');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const emailsListTemplate = require('../services/emailListTemplate');

function validate(data) {
    let errors = {};
   
    if(data.firstname === '') errors.firstname = 'Cannot be empty';
    if(data.lastname === '') errors.lastname = 'Cannot be empty';
    if(data.email === '') errors.email = "Email address cannot be empty";

    const isValid = Object.keys(errors).length === 0;

    return { errors, isValid };
}

module.exports = (app, db) => {
    // second(optional), minute, hour, day of month, month, day of week
    // Every second
    // cron.schedule("* * * * * *", () => {
    // Every Minute
    // cron.schedule('0 */1 * * * *', () => {
    // Every 3 seconds
    // cron.schedule('*/3 * * * * *', () => {
    // Every 1 PM on Sunday, Note: I coded as 1PM but it send emails at 7 AM but I think it's fine
    cron.schedule("0 13 * * Sunday", () => {
        // console.log("Every 1 minutes");
        let today = new Date();

        db.collection('events').find({ comparedDate: { $gt: today.getSeconds() + 7 }}).toArray((err, events) => {
            console.log(events)
            if(err) {
                console.log("err in emailyScheduler of event collection: ", users)
            } else {

                db.collection('users').find({}).toArray((err, users) => {
                    if(err) {
                        console.log("err in emailyScheduler of users collention")
                    } else {
                        // No user in collection
                        if(users.length === 0) {
                            const smtpTransport = nodemailer.createTransport({
                                service: 'Gmail', 
                                auth: {
                                    type: 'OAuth2',
                                    user: keys.KEVIN_GMAIL, // This should be the email addr with the enable API
                                    clientId: keys.GOOGLE_EMAIL_CLIENT_ID,
                                    clientSecret: keys.GOOGLE_EMAIL_CLIENT_SECRET,
                                    refreshToken: keys.GOOGLE_EMAIL_REFRESH_TOKEN,
                                    accessToken: keys.GOOGLE_EMAIL_ACCESS_TOKEN,
                                },
                            });

                            const mailOptions = {
                                from: keys.KEVIN_GMAIL,
                                to: keys.KEVIN_GMAIL,
                                subject: 'The Clear: you have no users in the collection to send events',
                                text: 'This email is to inform you that there is no user to inform events for next 7 days.'
                            };

                            smtpTransport.sendMail(mailOptions, (err, success) => {
                                if (err) {
                                    console.log("err: ", err)
                                    return res.status(500).json({ errors: { global: 'Something went wrong' }});
                                } else {
                                    res.json({ success })
                                    console.log("send email to Kevin")
                                    done('done');
                                }
                            })

                        } else {
                            const emailsList = users.map(user => user.email)
                            // console.log(emailsList)

                            // There are users in collectino
                            const smtpTransport = nodemailer.createTransport({
                                service: 'Gmail', 
                                auth: {
                                    type: 'OAuth2',
                                    user: keys.KEVIN_GMAIL, // This should be the email addr with the enable API
                                    clientId: keys.GOOGLE_EMAIL_CLIENT_ID,
                                    clientSecret: keys.GOOGLE_EMAIL_CLIENT_SECRET,
                                    refreshToken: keys.GOOGLE_EMAIL_REFRESH_TOKEN,
                                    accessToken: keys.GOOGLE_EMAIL_ACCESS_TOKEN,
                                },
                            });

                            const mailOptions = {
                                from: keys.KEVIN_GMAIL,
                                to: emailsList,
                                subject: 'The Clear, Re: The next coming up events in next 7 days!',
                                html: emailsListTemplate(users, events)
                            };

                            smtpTransport.sendMail(mailOptions, (err, success) => {
                                if (err) {
                                    console.log("err: ", err)
                                    return res.status(500).json({ errors: { global: 'Something went wrong' }});
                                } else {
                                    res.json({ success })
                                    console.log("send email to Kevin")
                                    done('done');
                                }
                            })
                        }
                    }
                });
            }
        });
    });


    app.get('/api/users/emailsList', (req, res) => {
        db.collection('users').find({}).toArray((err, users) => {
            if(err) {
                res.status(500).json({ errors: { global: 'Something went wrong' }})
            } else {
                res.status(200).json({ users })
            }
        });
    });

    app.get('/api/users/emailsList/:_id', (req, res) => {
        db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(req.params._id)}, (err, user) => {
            if(err) throw err;

            return res.status(200).json({ user })
        })
    });

    app.post('/api/user/emailsList', (req, res) => {
        const { errors, isValid } = validate(req.body);

        if(isValid) {
            const {
                firstname,
                lastname,
                email,
                notes
            } = req.body;

            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date+' '+time;

            db.collection('users').insertOne({
                firstname,
                lastname,
                notes,
                email,
                createDate: dateTime
            }, (err, user) => {
                if(err) {
                    return res.status(500).json({ errors: { global: 'Something went wrong in database' }});
                } else {
                    res.status(200).json({ user: user.ops[0] });
                }
            })

        } else {
            return res.status(500).json({ errors })
        }
    });

    app.put('/api/user/emailsList/:_id', (req, res) => {
        const { errors, isValid } = validate(req.body);
        if(isValid) {
            let { firstname, lastname, email, notes } = req.body;

            db.collection('users').findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(req.params._id) },
                { $set: {
                    firstname,
                    lastname,
                    email,
                    notes
                    },
                },
                { returnOriginal: false }, // This is important
                ( err, newUserResult ) => {
                    // console.log("result in db.collection: ", result)
                    if(err) {
                        return res.status(500).json({ errors: { global: err } });
                    } else {
                        res.status(200).json({
                            user: newUserResult.value
                        })
                    }
                }
            )

        } else {
            return res.status(400).json({ errors })
        }
    });

    app.delete('/api/user/emailsList/:_id', (req, res) => {
        db.collection('users').findOneAndDelete(
            { _id: new mongoose.Types.ObjectId(req.params._id) },
            (err, user) => {
                
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