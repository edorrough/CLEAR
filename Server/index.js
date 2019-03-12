const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./classModels/Users');


mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

if (process.env.NODE_ENV === 'production') {
    // Express will server up production assets like main.css or main.js
    app.use(express.static('client/build'));
    
    const path = require('path');
    // Express serves up index.html if it doesn't recognize the route
    app.get('*', (req, res) => { // Catch the rest
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    });
}

const PORT = process.env.PORT || 5000
app.listen(PORT);