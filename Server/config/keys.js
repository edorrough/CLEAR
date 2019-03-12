
if(process.env.NODE_ENV === 'production') {
    // In production, return production set keys
    module.exports = require('./prod');
} else {
    // In development, return development set keys
    module.exports = require('./dev');
}