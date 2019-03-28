const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if(authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    // console.log(token)
    if(token) {
        jwt.verify(token, keys.JWT_KEY, (err, decoded) => {
            if(err) {
                res.status(401).json({ errors: { global: 'Failed to authenticate' }})
            } else {
                console.log("decode in authenticated.js: ", decoded)
                req.currentUser = decoded;
                req.userId = decoded.id
                next();
            }

        });
    } else {
        res.status(403).json({
            errors: {
                global: 'No token or token expired'
            }
        });
    }
}