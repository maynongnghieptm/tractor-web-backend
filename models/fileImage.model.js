'use strict';


const { Schema, model } = require('mongoose'); // Erase if already required

var FileImageSchema = new Schema(
    {
        fileImage: {
            type: String,
            required: true,
        },

    },
    {
        collection: 'FileImages',
        timestamps: true,
    },
);

module.exports = model('FileImage', FileImageSchema);
