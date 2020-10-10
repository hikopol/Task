const mongoose = require('mongoose');

const schema = new mongoose.Schema({
        Author: { type: String, unique: true, required: true },
        Email: { type: String, required: true },
        Text: { type: String, required: true },
        Parent: { type: String, required: true },        
    },
        {timestamps: true});

module.exports = mongoose.model('Comment', schema);