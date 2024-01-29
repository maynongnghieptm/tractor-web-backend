'use strict';

const { Schema, model } = require('mongoose');

// Declare the Schema of the Mongo model
const FieldSchema = new Schema(
    {
        coordinate: [
            {
                lat: { type: Number, required: true },
                lng: { type: Number, required: true },
            },
        ],
        strokeColor: {
            type: String,
        },
        strokeWidth: {
            type: Number,
        },
        fillColor: {
            type: String,
        },
        fillOpacity: {
            type: Number,
        },
    },
    {
        collection: 'Field',
        timestamps: true,
    },
);

// Export the model
module.exports = model('Field', FieldSchema);
