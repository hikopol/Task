const mongoose = require('mongoose');

const schema = new mongoose.Schema({
        Login: { type: String, unique: true, required: true },
        Password: { type: String, required: true },
        IsConfirmed: { type: Boolean, default: false },
        IsAdmin: { type: Boolean, default: false },        
    });

module.exports = mongoose.model('Editor', schema);