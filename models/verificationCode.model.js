const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerificationCodeSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    expirationTime: {
        type: Date,
        required: true,
    },
    user: {
        type:String,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
    isActive: {
        type: Boolean,
        default: true,
    },
   
});

const VerificationCode = mongoose.model('VerificationCode', VerificationCodeSchema);

module.exports = VerificationCode;
