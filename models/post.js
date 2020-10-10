const mongoose = require('mongoose');

const schema = new mongoose.Schema({
        Author: { type: String, unique: true, required: true },
        Header: { type: String, required: true },
        Body: { type: String, required: true },
        Comments: [],        
    },
        {timestamps: true});

module.exports = mongoose.model('Post', schema);