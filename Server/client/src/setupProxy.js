const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    // app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
    app.use(proxy('/api', { target: 'http://localhost:5000' }));
    // app.use(proxy('/api', { target: 'http://127.0.0.1:5000' }));

    //Worth a try when front-end cannot talk to back-end
    // app.use(proxy('/api/*', { target: 'http://localhost:5005' }));
};