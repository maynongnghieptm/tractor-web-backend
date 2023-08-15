'use strict';
// Luu secretKey dung de sign jwt cho 1 user

const { Schema, model } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var TractorSchema = new Schema(
    {
        tractorId: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'Tractors',
        timestamps: true,
    },
);

//Export the model
module.exports = model('Tractor', TractorSchema);
