'use strict';

const fs = require('fs');

let routes = [];

fs.readdirSync(__dirname)
    .forEach( file => {
        if (file !== 'routes.js') {
            routes = [...routes, require(`./${file}`)];
        };
    });

module.exports = routes;