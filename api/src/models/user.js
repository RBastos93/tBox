'use strict';

const { Schema, model } = require('mongoose');
const authenticationSchema = require('./authentication');

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
        bcrypt: true,
        minlength: 6
    },
    confirmPassword: {
        type: String,
        required: true,
        bcrypt: true,
        minlength: 6
    },
    active: {
        type: Boolean,
        default: true
    },
    authentications: [ authenticationSchema ],
}, { timestamps: true });

UserSchema.methods.toJSON = function() {
    let obj = this.toObject();

    delete obj.password;
    delete obj.confirmPassword;
    delete obj.authentications;
    
    return obj;
};

UserSchema.plugin(require('../plugins/mongoose-bcrypt'), { rounds: 8 });

module.exports = model('User', UserSchema);