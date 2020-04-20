'use strict';

require('./mongoose');
const { PORT } = require('./config/config');
const routes = require('./routes/routes');
const express = require('express');
const boom = require('express-boom');
const i18n = require('i18n');
const cors = require('cors');
const { authenticateToken } = require('./auth/jwt');
const app = express();

i18n.configure({
    locales: ['pt-BR', 'en-US'],
    directory: `${__dirname}/locales`,
    defaultLocale: 'en-US',
    objectNotation: true,
});

app.use(i18n.init);

app.use(boom());

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    const { url } = req;

    if (url.indexOf('auth') <= -1) {
        return authenticateToken(req, res, next);
    }

    return next();
});

app.use(routes);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));