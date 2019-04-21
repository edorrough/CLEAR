const nodeMailer = require('nodemailer');
const keys = require('../config/keys');
const contactTemplate = require('../services/contactTemplate');

const emailFormatChecking = (value) => {
    return value && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
}

const validation = (data) => {
    let errors = {}

    if(data.firstname === '') errors.firstname = 'Firstname cannot be empty';
    if(data.lastname === '') errors.lastname = 'Lastname cannot be empty';
    if(data.email === '') {
        errors.email = 'Email cannot be empty';
    } else {
        if(!emailFormatChecking(data.email)) errors.email = 'Email format incorrectly';
    }
    if(data.message === '') {
        errors.message = 'Message cannot be empty';
    }
    const isValid = Object.keys(errors).length === 0;

    return { errors, isValid };
}

module.exports = (app) => {
    app.post('/api/contact-us', (req, res) => {
        const { errors, isValid } = validation(req.body);

        if(isValid) {
            const {
                firstname,
                lastname,
                message,
                email,
                phoneNum
            } = req.body;

            const smtpTransport = nodeMailer.createTransport({
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
            var mailOptions = {
                to: keys.KEVIN_GMAIL,
                from: email,
                subject: 'Re: Query from ' + firstname + ' ' + lastname,
                html: contactTemplate(firstname, lastname, email, message, phoneNum)
            };

            smtpTransport.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log('error in sendMail in contactEmaily.js: ', err)
                    return res.status(500).json({ errors: { global: err }})
                }
                else {
                    done(err, 'done');
                }
            });

            return res.status(200).json({ message: 'Successful' })

        } else {
            console.log("errors: ", errors )
            return res.status(400).json({ 
                errors
            });
        }
    });

    
}