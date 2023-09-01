'use strict';
const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose'); // Erase if already required
const { USER_ROLE } = require('../constants');

// Declare the Schema of the Mongo model
var UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
        },
        fullname: {
            type: String,
        },
        address: {
            type: String,
        },
        isConfirmed: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: [USER_ROLE.ADMIN, USER_ROLE.USER],
            default: USER_ROLE.USER,
        },
        tractorList: [{
            type: Schema.Types.ObjectId,
            ref: 'Tractor'
        }],
        secretKey: {
            type: String,
        }
    },
    {
        collection: 'Users',
        timestamps: true,
    },
);

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

//Export the model
module.exports = model('User', UserSchema);
