'use strict';

const User = require('../models/user');
const { body, param } = require('express-validator');
const { generateAccessToken } = require('../auth/jwt');

const validations = [
    param('language').exists().trim().escape().isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').exists().trim()
        .bail().isLength({ min: 6 })
];

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.boom.notFound(req.__('boom.message.notFound'));

    if (!user.verifyPasswordSync(password)) {
        return res.boom.badImplementation(req.__('boom.message.badImplementation'));
    }

    user.authentications.push({
        strategy: 'jwt',
        agent: req.headers['user-agent'],
        ip: req.connection.remoteAddress
    });
    
    const tokenOptions = {
        jwtid: user.authentications.last()._id.toString(),
        expiresIn: '15d',
    };

    const token = await generateAccessToken({ user: user.toJSON }, tokenOptions);
    
    await user.save();
    
    return res.send({
        token
    });
};

module.exports = {
    validations,
    authenticateUser,
}