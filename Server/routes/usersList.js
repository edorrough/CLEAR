const multer = require('multer');
const nodemailer = require('nodemailer');
const keys = require('../config/keys');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//////////////////////////////////////////////////////////////////
const storage = multer.diskStorage({
    destination: (req, files, cb) => {
        // cb(null, __dirname+'/routes/uploads/');
        cb(null, __dirname+'/');
        // cb(null, `./routes/uploads/${req.body.givenName}`);
    },
    filename: (req, file, cb) => {
        var datetimestamp = new Date().toISOString();
        // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        cb(null, file.fieldname + '-' + datetimestamp + '-' + file.originalname)
        // cb(null, file.filename);
    }
});
const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
}

const upload = multer({ 
    storage: storage, 
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
//////////////////////////////////////////////////////////////////
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: keys.CLOUDINARY_KEY_NAME,
    api_key: keys.CLOUDINARY_API_KEY,
    api_secret: keys.CLOUDINARY_API_SECRET_KEY
});
//////////////////////////////////////////////////////////////////

function validate(data) {
    let errors = {};
   
    if(data.firstname === '') errors.firstname = 'Cannot be empty';
    if(data.lastname === '') errors.lastname = 'Cannot be empty';
    if(data.email === '') errors.email = "Email address cannot be empty";

    const isValid = Object.keys(errors).length === 0;

    return { errors, isValid };
}

module.exports = (app, db) => {
    app.get('/api/admins', (req, res) => {
        db.collection('admins').find({}).toArray((err, admins) => {
            if(err) {
                return res.json({ errors: { global: err }})
            } else {
                res.json({ admins })
            }
        })
    });

    app.post('/api/admins', upload.single('file'), async(req, res) => {
        
        // With picture
        if(req.file) {
            const userData = JSON.parse(req.body.userData);
            const { errors, isValid } = validate(userData);
            
            if(isValid) {
                const {
                    firstname,
                    lastname,
                    email,
                    notes
                } = userData;

                db.collection('admins').find({ email: email.trim().toLowerCase()}).toArray((err, admin) => {
                    if(err) throw err

                    if(admin.length >= 1) {
                        return res.status(500).json({ errors: { global: 'This email address has been registered!' }});
                    } else {
                        const token = jwt.sign({
                            email: admin.email,
                        },
                        keys.JWT_KEY,
                            {
                                expiresIn: 60 * 300 // 300 minutes
                            }
                        );

                        let upload_image = () => {
                            new Promise((resolve, reject) => { 

                                cloudinary.uploader.upload(__dirname + '/' + req.file.filename, (result, error) => {
                                    if (error) reject(error)
                                    else resolve(result);
                                },
                                {
                                    folder: `/admins/${firstname}_${lastname}`
                                })
                            })
                            .then(result => {
                                const today = new Date();
                                const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                const dateTime = date+' '+time;

                                db.collection('admins').insertOne({
                                    public_id: result.public_id,
                                    filePathNode: req.file.path,
                                    firstname: firstname.trim().toLowerCase(),
                                    lastname: lastname.trim().toLowerCase(),
                                    email: email.trim().toLowerCase(),
                                    adminImagePath: result.secure_url,
                                    adminImagePathAlt: firstname + ' ' + lastname,
                                    notes: notes,
                                    password: null,
                                    resetPasswordToken: token,
                                    resetPasswordExpires: Date.now() + 18000000, // 300 minutes
                                    createdDate: dateTime
        
                                }, (err, adminResult) => {
                                    if(err) {
                                        console.log("err in insertOne() of post in /api/admins: ", err)
                                        return res.status(500).json({ errors: { global: err }});
                                    } else {
                                        
                                        const smtpTransport = nodemailer.createTransport({
                                            service: 'Gmail', 
                                            auth: {
                                                type: 'OAuth2',
                                                user: 'chch6597@colorado.edu', // This should be the email addr with the enable API
                                                clientId: keys.GOOGLE_EMAIL_CLIENT_ID,
                                                clientSecret: keys.GOOGLE_EMAIL_CLIENT_SECRET,
                                                refreshToken: keys.GOOGLE_EMAIL_REFRESH_TOKEN,
                                                accessToken: keys.GOOGLE_EMAIL_ACCESS_TOKEN,
                                            },
                                        });
        
                                        const mailOptions = {
                                            from: keys.KEVIN_EMAIL,
                                            to: 'chch6597@colorado.edu',
                                            subject: 'Re: Finish up setting password',
                                            text: 'Dear ' + firstname + ' ' + lastname + ',\n\n' +
                                                'Thank you for joining The Clear,\n\n' +
                                            'You account: \n\n' + email + '\n\n' +
                                            'Please click on the follwoing link, or paste this into your browser to complete the process: \n\n' +
        
                                            // keys.HTTP_NAME + req.headers.host + '/admins/firsttime-login/' + token + '\n\n',
                                            keys.HTTP_NAME + req.headers.host + '/user/first-login/' + token + '\n\n',
                                        };
        
                                        smtpTransport.sendMail(mailOptions, (err, info) => {
                                            if (err) {
                                                console.log('err: ', err)
                                                return res.status(500).json({ errors: { global: 'something wrong' }});
                                            }
                                            else {
                                                // console.log('Message sent: %s', JSON.stringify(info, null, 4));
                                                // console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        
                                                res.status(200).json({ admin: adminResult.ops[0] });
                                                try{
                                                    fs.unlinkSync(req.file.path)
                                                }
                                                catch(err) {
                                                    console.log("error in delete picture: ", err)
                                                }
                                                done(err, 'done');
                                            }
                                        });

                                    }
                                })
                            })
                            .catch(error => { 
                                console.log("error in Promise in cloudinary in post of /api/admins: ", error)
                                return res.status(500).json({ errors: { global: { error }}})
                            })
                        };
                        upload_image()

                    }
                })

            } else {
                return res.status(400).json({ errors })
            }
        // Without picture
        } else {
            const { errors, isValid } = validate(req.body);            

            if(isValid) {
                const { 
                    firstname,
                    lastname,
                    email,
                    notes
                } = req.body;

                db.collection('admins').find({ email: email.trim().toLowerCase()}).toArray((err, admin) => {
                    if(err) throw err;

                    if(admin.length >= 1) {
                        return res.status(500).json({ errors: { global: 'This email address has been registered' }});
                    } else {

                        const token = jwt.sign({
                            email: admin.email
                        },
                        keys.JWT_KEY,
                            {
                                expiresIn: 60 * 300 // 300 minutes
                            }
                        );

                        const today = new Date();
                        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        const dateTime = date+' '+time;

                        db.collection('admins').insertOne({
                            public_id: null,
                            firstname: firstname.trim().toLowerCase(),
                            lastname: lastname.trim().toLowerCase(),
                            email: email.trim().toLowerCase(),
                            filePathNode: null,
                            adminImagePath: null,
                            adminImagePathAlt: firstname + ' ' + lastname,
                            notes: notes,
                            password: null,
                            resetPasswordToken: token,
                            resetPasswordExpires: Date.now() + 18000000, // 300 minutes
                            createdDate: dateTime

                        }, (err, adminResult) => {
                            if(err) {
                                console.log("err in post of /api/admins (without picture case)")
                                return res.status(500).json({ errors: { global: err }})
                            } else {
                                const smtpTransport = nodemailer.createTransport({
                                    service: 'Gmail', 
                                    auth: {
                                        type: 'OAuth2',
                                        user: 'chch6597@colorado.edu', // This should be the email addr with the enable API
                                        clientId: keys.GOOGLE_EMAIL_CLIENT_ID,
                                        clientSecret: keys.GOOGLE_EMAIL_CLIENT_SECRET,
                                        refreshToken: keys.GOOGLE_EMAIL_REFRESH_TOKEN,
                                        accessToken: keys.GOOGLE_EMAIL_ACCESS_TOKEN,
                                    },
                                });

                                const mailOptions = {
                                    from: keys.KEVIN_EMAIL,
                                    to: 'chch6597@colorado.edu',
                                    subject: 'Re: Finish up setting password',
                                    text: 'Dear ' + firstname + ' ' + lastname + ',\n\n' +
                                        'Thank you for joining The Clear,\n\n' +
                                    'You account: \n\n' + email + '\n\n' +
                                    'Please click on the follwoing link, or paste this into your browser to complete the process: \n\n' +

                                    keys.HTTP_NAME + req.headers.host + '/user/first-login/' + token + '\n\n',
                                };

                                smtpTransport.sendMail(mailOptions, (err, info) => {
                                    if (err) {
                                        console.log('err: ', err)
                                        return res.status(500).json({ errors: { global: 'something wrong' }});
                                    }
                                    else {
                                        // console.log('Message sent: %s', JSON.stringify(info, null, 4));
                                        // console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))

                                        // console.log("adminResult: ", adminResult.ops[0]);
                                        res.status(200).json({ admin: adminResult.ops[0] });
                                        
                                        done(err, 'done');
                                    }
                                });

                            }
                        });
                    }
                });
                
            } else {
                return res.status(400).json({ errors })
            }
        }

    }); // end post /api/admins

    app.put('/api/admins/:_id', upload.single('file'), async(req, res) => {
        // With picture
        if(req.file) {
            const userData = JSON.parse(req.body.userData);
            const { errors, isValid } = validate(userData);

            if(isValid) {

            } else {
                return res.status(400).json({ errors })
            }

        // Without picture
        } else {
            const { errors, isValid } = validate(req.body);  
            if(isValid) {
                const { 
                    firstname,
                    lastname,
                    email,
                    notes
                } = req.body;

                db.collection('admins').findOneAndUpdate(
                    { _id: new mongoose.Types.ObjectId(req.params._id) },
                    { $set: {
                        firstname,
                        lastname,
                        email,
                        notes
                        },
                    },
                    { returnOriginal: false }, // This is important
                    ( err, newAdminResult ) => {
                        // console.log("result in db.collection: ", result)
                        if(err) {
                            return res.status(500).json({ errors: { global: err } });
                        } else {
                            res.status(200).json({
                                admin: newAdminResult.value
                            })
                        }
                    }
                )

            } else {
                return res.status(400).json({ errors })
            }
        }
    })

    app.get('/api/admins/:_id', (req, res) => {
        db.collection('admins').findOne({ _id: new mongoose.Types.ObjectId(req.params._id)}, (err, admin) => {
            if(err) throw err;

            return res.status(200).json({ admin })
        })
    }); // end fetchAdmin

    app.delete('/api/admins/:_id', (req, res) => {

        db.collection('admins').findOneAndDelete(
            { _id: new mongoose.Types.ObjectId(req.params._id) },
            (err, admin) => {

                if(admin.value.public_id) {
                    cloudinary.uploader.destroy(admin.value.public_id, (result, err) => {
                        console.log("result in delete /api/admins/:_id of cloudinary destroy: ", result)
                        if(err) {
                            console.log("err in cloudinary delete: ", err)
                            return res.status(500).json({ errors: { global: err } });
                        }
                    });
                }

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