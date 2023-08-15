'use strict';
// Luu secretKey dung de sign jwt cho 1 user

const { Schema, model } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var FileConfigSchema = new Schema(
    {
        tractorIds: [{
            type: Schema.Types.ObjectId,
            ref: 'Tractor',
        }],
        fileConfig: {
            type: String,
            required: true,
        }
    },
    {
        collection: 'FileConfigs',
        timestamps: true,
    },
);

//Export the model
module.exports = model('FileConfig', FileConfigSchema);
