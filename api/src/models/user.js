'use strict';

const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    passwordConfirmation: {
        required: true,
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = model('User', UserSchema);