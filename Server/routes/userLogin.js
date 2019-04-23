const authenticated = require('../middlewares/authenticated'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const keys = require('../config/keys');
const Admins = require('../classModels/Users');
const rateLimit = require("express-rate-limit");
const request = require('request');

const signinLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 2, // start blocking after 5 requests
    message:
      "Too many threads created from this IP, please try again after an hour"
});

const emailFormatChecking = (value) => {
    return value && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
}

const validation = (data) => {
    let errors = {};

    if(data.email === '') errors.email = "Email address cannot be empty";
    if(data.email) {
        if(!emailFormatChecking(data.email)) errors.email = 'Email format incorrectly';
    }
    if(data.password === '') errors.password = "Password cannot be empty";
    if(data.passwordConfirm === '') errors.passwordConfirm = "Password Confirmation cannot be empty";

    const isValid = Object.keys(errors).length === 0;

    return { errors, isValid };
}

module.exports = (app, db) => {
    app.post('/api/login', signinLimiter, (req, res) => {
        const { errors, isValid } = validation(req.body)

        if(isValid) {
            db.collection('admins').findOne({ email: req.body.email.toLowerCase().trim() }, (err, admin) => {
                if(err) {
                    console.log("err in /api/login: ", err)
                    return res.status(500).json({ errors: { global: "Something went wrong. Please contact administrator! "}})
                }
                if(!admin) {
                    console.log("User not found")
                    return res.status(401).json({
                        errors: { global : 'There is no user attached with this email address'}
                    })
                } else {
                    bcrypt.compare(req.body.password, admin.password, (err, result) => {
                        if(err) {
                            console.log("bcrypt error")
                            return res.status(401).json({
                                errors: { global: 'Incorrect password, please try again' }
                            });
                        }
                        if(result) {
                            if(admin.isAdmin) {
                                const token = jwt.sign({
                                    email: admin.email,
                                    userId: admin._id
                                    }, 
                                    keys.JWT_KEY,
                                    {
                                        expiresIn: "1h"
                                    }
                                );
                                return res.status(200).json({
                                    message: 'Admin Auth Successful',
                                    token: token,
                                    Administrator: admin.isAdmin
                                })
                            }

                        } else {
                            return res.status(401).json({
                                errors: { global: 'Incorrect password, please try again' }
                            });
                        }

                    })
                }
            })

        } else {
            console.log("errors: ", errors )
            return res.status(400).json({ errors })
        }
    });

    // Reset password
    app.post('/api/passwd_reset/:token', authenticated, function(req, res) {
        const { password, passwordConfirm } = req.body;
        const { errors, isValid } = validation(req.body);

        if(isValid) {
            if(password === passwordConfirm) {
                Admins.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() }})
                    .exec()
                    .then(admin => {
                        if(!admin) {
                            return res.status(400).json({ errors: { global: 'No such user with the email' }})
                        } else {
                            bcrypt.compare(password, admin.password, (err, result) => {
                                if(err) {
                                    console.log("err in bcrypt compare in pw reset: ", err)
                                }

                                if(result) {
                                    return res.status(400).json({ errors: { global: 'Your password is too similar with previous one' }})
                                } else {

                                    bcrypt.hash(password, 12, (error, hash) => {
    
                                        if(admin.password === hash) {
                                            return res.status(401).json({ errors: { global: 'Your password is too similar with previous one. Try again!' }})
                                        }
        
                                        admin.password = hash;
                                        admin.resetPasswordToken = undefined;
                                        admin.resetPasswordExpires = undefined;
        
                                        try{
                                            admin.save()
                                        }
                                        catch(error) {
                                            return res.status(400).json({ errors: { global: 'User saving wrong' }})
                                        }
                                        
                                        if(error) {
                                            console.log("error: ", error)
                                            return res.status(500).json({ errors: { global: 'Something went wrong, contact Administrator' }})
                                        } else {
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
                                            var mailOptions = {
                                                to: admin.email,
                                                from: keys.KEVIN_GMAIL,
                                                subject: 'Re: Successfully changed your password',
                                                text: 'Hello, ' + admin.firstname + ' ' + admin.lastname + '\n\n' +
                                                    'This is a confirmation that the password for your account ' + admin.email + ' for the Clear has just been changed.\n' +
                                                    'You can login with your new password by clicking the following link.\n\n' +
                                                    keys.HTTP_NAME + req.headers.host + '/user/login' + '\n\n' +
                                                    'Please do not reply directly this email.\n'
                                            };
                            
                                            smtpTransport.sendMail(mailOptions, (err, info) => {
                                                if (err) {
                                                    console.log('err: ', err)
                                                    return res.status(500).json({ errors: err})
                                                }
                                                else {                
                                                    return res.status(200).json({ message: 'You have successful Changed your password. Click the login bottom to login' })
                                                    done(err, 'done');
                                                }
                                            });
                                        }

                                    })

                                }

                            })
                        }
                    })

            } else {
                return res.status(401).json({
                    // return res.status(401).json({ errors: { global: 'Your password is too similar with previous one' }})
                    error: { global: 'Password Mismatch'},
                })
            }

        } else {
            console.log("errors in inValid: ", errors )
            return res.status(400).json({ errors })
        }

   

    });

    // When user in password forgot page
    app.post('/api/passwd_forgot', (req, res) => {
        const { errors, isValid } = validation(req.body);
        if(isValid) {
            //Kevin
            if(req.body.email === keys.KEVIN_EMAIL) {
                if(req.body.secret_code === keys.ADMIN_SECRET_CODE) {
                    Admins.findOne({ email: req.body.email.toLowerCase().trim() })
                        .exec()
                        .then(admin => {
                            if(!admin) {
                                return res.status(401).json({
                                    errors : { global: 'Mail not found, user does not exist'}
                                });
                            }

                            const token = jwt.sign({
                                email: admin.email,
                                userId: admin._id
                            },
                            keys.JWT_KEY,
                                {
                                    expiresIn: 60 * 30 // 30 minutes
                                }  
                            );
            
                            admin.resetPasswordToken = token;
                            admin.resetPasswordExpires = Date.now() + 1800000; // 30 minutes

                            try {
                                admin.save()
                                    .then(result => {
                                        if(!result) {
                                            return res.status(500).json({ errors: { global: "Something went wrong. Contact the administrator" }})
                                        } else {
    
                                            res.status(200).json({
                                                message: 'Sucessful, please go check your email',
                                                token: token
                                            })
        
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
                                            var mailOptions = {
                                                to: admin.email,
                                                from: keys.KEVIN_GMAIL,
                                                subject: 'Re: The Clear Password Reset',
                                                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                                                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                                                keys.HTTP_NAME + req.headers.host + '/recover/passwd_reset/' + token + '\n\n' +
                                                'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                                            };
                            
                                            smtpTransport.sendMail(mailOptions, (err, info) => {
                                                if (err) {
                                                    return console.log('err: ', err)
                                                }
                                                else {
                                                    // console.log('Message sent: %s', JSON.stringify(info, null, 4));
                                                    // console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
                                                    done(err, 'done');
                                                }
                                            });
                                        }
    
                                    })
                            }
                            catch (err) {
                                console.log("err in admin save in forgot_passwd: ", err)
                                return res.status(422).json({
                                    errors : { global: err }
                                })
                            }

                        })
                        .catch(err => {
                            console.log("err: ", err);
                            res.status(500).json({
                                error: err
                            })
                        })

                } else {
                    return res.status(500).json({
                        errors : { global: 'Incorrectly secret code' }
                    });
                }
            } else {
            // Normal user
                Admins.findOne({ email: req.body.email.toLowerCase().trim() })
                    .exec()
                    .then(admin => {
                        if(!admin) {
                            return res.status(401).json({
                                errors : { global: 'Mail not found, user does not exist'}
                            });
                        }

                        const token = jwt.sign({
                            email: admin.email,
                            userId: admin._id
                        },
                        keys.JWT_KEY,
                            {
                                expiresIn: 60 * 30 // 30 minutes
                            }  
                        );
        
                        admin.resetPasswordToken = token;
                        admin.resetPasswordExpires = Date.now() + 1800000; // 30 minutes

                        try {
                            admin.save()
                                .then(result => {
                                    // console.log("result: " + result);
                                    if(!result) {
                                        return res.status(500).json({ errors: { global: "Something went wrong. Contact the administrator" }})
                                    } else {

                                        res.status(200).json({
                                            message: 'Sucessful, please go check your email',
                                            token: token
                                        })
    
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
                                        var mailOptions = {
                                            to: admin.email,
                                            from: keys.KEVIN_GMAIL,
                                            subject: 'Re: The Clear Password Reset',
                                            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                                            keys.HTTP_NAME + req.headers.host + '/recover/passwd_reset/' + token + '\n\n' +
                                            'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                                        };
                        
                                        smtpTransport.sendMail(mailOptions, (err, info) => {
                                            if (err) {
                                                return console.log('err: ', err)
                                            }
                                            else {
                                                // console.log('Message sent: %s', JSON.stringify(info, null, 4));
                                                // console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
                                                done(err, 'done');
                                            }
                                        });
                                    }

                                })
                        }
                        catch (err) {
                            console.log("err in admin save in forgot_passwd: ", err)
                            return res.status(422).json({
                                errors : { global: err }
                            })
                        }
                    })
                    .catch(err => {
                        console.log("err in 500 in passwd_forgot: ", err);
                        res.status(500).json({
                            errors : { global: err }
                    })
                })

            }

        } else {
            console.log("errors: ", errors )
            return res.status(400).json({ errors })
        }

    });

    app.post('/api/login-firsttime/:token', (req, res) => {
    // app.post('/api/login-firsttime', authenticated, (req, res) => {
        const { password, passwordConfirm, token, recaptcha } = req.body;

        if(password !== passwordConfirm) {
            return res.status(400).json({ errors: { global: 'Password mismatch' }});
        } else {
            const { errors, isValid } = validation(req.body);
            if(isValid) {

                const secreyKey = keys.RECAPTCHA_SECRET_KEY;
                const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=
                    ${secreyKey}&response=${recaptcha}&remoteip=
                    ${req.connection.remoteAddress}`;

                request(verifyURL, (err, response, body) => {
                    body = JSON.parse(body);
                    // console.log("body: ", body)
        
                    if(!body.success) {
                        console.log('reqcapcha not working')
                        return res.status(400).json({ 
                            errors: { global: err }
                        });
                    }
                });
                
                bcrypt.hash(password, 12, (err, hash) => {
                    if(err) {
                        console.log("bcrypt error in /api/login-firsttime/:token")
                        return res.status(500).json({ error: { global: err } });
                    } else {

                        db.collection('admins').findOneAndUpdate(
                            { resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() }},
                            { $set: {
                                password: hash,
                                resetPasswordToken: undefined,
                                resetPasswordExpires: undefined
                                }
                            },
                            { returnOriginal: false },
                            (err, user) => {
                                if(err) {
                                    return res.status(500).json({ error: { global: err } });
                                } else {
    
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
                                    var mailOptions = {
                                        from: keys.KEVIN_GMAIL,
                                        to: user.value.email,
                                        subject: 'Re: Successfully changed your password',
                                        text: 'Hello, ' + user.value.firstname + ' ' + user.value.lastname + '\n\n' +
                                            'This is a confirmation that the password for your account ' + user.value.email + ' for the Clear has just been changed.\n' +
                                            'Please do not reply directly this email.\n'
                                    };
                    
                                    smtpTransport.sendMail(mailOptions, (err, info) => {
                                        if (err) {
                                            console.log('err: ', err)
                                            return res.status(500).json({ errors: err})
                                        }
                                        else {                
                                            // res.status(200).json({ user: user.value })
                                            res.status(200).json({ message: 'Successful changed your password' })
                                            done(err, 'done');
                                        }
                                    });
    
                                }
                            }
                        )
                    }
                });

            } else {
                console.log("errors in inValid: ", errors )
                return res.status(400).json({ errors });
            }
        }
    });
}