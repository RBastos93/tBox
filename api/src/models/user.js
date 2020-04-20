'use strict';

const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    lastName: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    passwordConfirmation: {
        type: String,
        required: true,
        minlength: 6
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = model('User', UserSchema);