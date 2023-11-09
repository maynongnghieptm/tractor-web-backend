'use strict';


const { Schema, model } = require('mongoose'); // Erase if already required

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

module.exports = model('FileConfig', FileConfigSchema);
