const mongoose = require('mongoose');

const schema = new mongoose.Schema({
        Title: { type: String, required: true },
        Text: { type: String, required: true },
        Comments: [],        
    },
        {timestamps: true});

module.exports = mongoose.model('News', schema);