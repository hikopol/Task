const mongoose = require('mongoose');
const config = require('../config')

function connectDB() {
    mongoose.connect(config.DB_URL, config.DB_SETINGS);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log('Connectet to cloud mongoDB store!')
    });
    return db;
}
module.exports = connectDB;