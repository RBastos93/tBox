'use strict';

const mongoose = require('mongoose');
const { MONGO_CONNECTION } = require('./config/config');

mongoose.connect(
    MONGO_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const db = mongoose.connection;

db.on('error', error => {
    throw error;
});

db.once('open', () => {
    console.log('Connection with database succeeded');
});

exports.db = db;