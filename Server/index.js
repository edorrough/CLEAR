const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

require('./classModels/Users');


// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(keys.mongoURI, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("clear").collection("admin");
//   // perform actions on the collection object
// //   client.close();
// });


// mongoose.connect(keys.mongoURI, { useNewUrlParser: true });






const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)



require('./routes/contactEmaily')(app);



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