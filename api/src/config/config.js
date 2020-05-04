'use strict';

module.exports = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'localhost',
    MONGO_CONNECTION: process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/tBox',
    TOKEN_SECRET: process.env.TOKEN_SECRET || Math.random().toString(16).substring(2)
};