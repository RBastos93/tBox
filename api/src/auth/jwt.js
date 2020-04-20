'use strict';

const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/config');

const generateAccessToken = userId => {
    return jwt.sign(userId, TOKEN_SECRET, { expiresIn: '15d' });
};

const authenticateToken = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];

    if (!token) return res.boom.unauthorized(req.__('boom.message.unauthorized'));

    return jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if (error) return res.boom.forbidden(req.__('boom.message.forbidden'));

        req.user = user;

        return next();
    });
};

module.exports = {
    generateAccessToken,
    authenticateToken
};