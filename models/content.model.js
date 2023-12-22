const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Content = new Schema({
    url: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    designJSON: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const About_us = mongoose.model('Content', Content);

module.exports = About_us;
