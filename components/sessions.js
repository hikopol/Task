const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../config');
const db = require('./db')();


module.exports = session({
    store: new MongoStore({ 
        mongooseConnection: db,
        ttl: 7 * 24 * 60 * 60}), // 7 days max age of storing cookies
    secret: config.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    name: 'SessionUID',
    cookie: {
        secure: config.IS_PRODUCTION, // https only whan in PROD
        httpOnly: true, 
        maxAge: 1000 * 60 * 60 // 1 Hour lifetime of cookies
    }
})