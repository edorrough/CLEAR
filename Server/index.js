const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

require('./classModels/Users');



mongoose.connect(keys.mongoURI, { 
    useNewUrlParser: true 
})
.then(() => {
    // console.log(result)
    // server.start()
},
(err) => {
    console.log("err in connecting Mongo: ", err)
})
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to Mongo');
})



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)



require('./routes/contactEmaily')(app);
require('./routes/userLogin')(app, db)



if (process.env.NODE_ENV === 'production') {
    // Express will server up production assets like main.css or main.js
    app.use(express.static('client/build'));

    // mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
    
    const path = require('path');
    // Express serves up index.html if it doesn't recognize the route
    app.get('*', (req, res) => { // Catch the rest
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    });
}

const PORT = process.env.PORT || 5000
app.listen(PORT);

// Sign up page and add user page
// # department
// # firstnma
// # lastname
// # emailadrre

// # optional : phone