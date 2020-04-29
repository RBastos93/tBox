'use strict';

const { Schema } = require('mongoose');

const AuthenticationSchema = new Schema({
    strategy: String,
    agent: String,
    ip: String
}, { timestamps: true });

module.exports = AuthenticationSchema;