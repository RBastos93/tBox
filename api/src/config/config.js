'use strict';

module.exports = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'localhost',
    MONGO_CONNECTION: process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/tBox'
};