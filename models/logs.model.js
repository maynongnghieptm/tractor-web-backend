'use strict';

const { Schema, model } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var LogSchema = new Schema(
    {
        tractorId: {
            type: String,
            required: true,
        },
        log: {
            type: String,
            required: true,
        },
        missionId: {
            type: String,
            required: true,
        }
    },
    {
        collection: 'Logs',
        timestamps: true,
    },
);

//Export the model
module.exports = model('Log', LogSchema);
