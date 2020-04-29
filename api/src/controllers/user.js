'use strict';

const User = require('../models/user');
const { body, param } = require('express-validator');
const { isTrue, emailIsUnique } = require('../helpers/helpers');
const { SKIP, LIMIT } = require('../constants/mongoDB');

const validations = [
    param('language').exists().trim().escape().isLength({ min: 2 }),
    body('name').exists().trim().escape()
        .bail().isLength({ min: 4 }).withMessage((value, { req }) => {
            return req.__('user.validation.message.name.minimumCharacters');
        }),
    body('lastName').exists().trim().escape()
        .bail().isLength({ min: 4 }).withMessage((value, { req }) => {
            return req.__('user.validation.message.lastName.minimumCharacters');
        }),
    body('email').isEmail(),
    body('password').exists().trim()
        .bail().isLength({ min: 6 }).withMessage((value, { req }) => {
            return req.__('user.validation.message.password.minimumCharacters');
        }),
    body('confirmPassword').exists().trim()
        .bail().isLength({ min: 6 }).withMessage((value, { req }) => {
            return req.__('user.validation.message.confirmPassword.minimumCharacters');
        })
        .bail().custom((value, { req }) => {
            if (value !== req.body.password)
                throw new Error(req.__('user.validation.message.confirmPassword.passwordsDoNotMatch'));
        })
];

const createUser = async (req, res) => {
    const { name, lastName, email, password, confirmPassword } = req.body;

    await emailIsUnique(email, req, res, User);

    const user = await User.create({
        name,
        lastName,
        email,
        password,
        confirmPassword
    });

    if (!user)
        return res.boom.badImplementation(req.__('boom.message.badImplementation'));

    return res.send(req.__('request.message.created')).status(201);
};

const updateUser = async (req, res) => {
    const { name, lastName, email, currentPassword, password, confirmPassword } = req.body;
    const { userId } = req.params;

    const data = await User.findById(userId);
    
    const update = {
        name,
        lastName,
        email,
        password,
        confirmPassword
    };

    await emailIsUnique(email, req, res, User);

    if (!data.verifyPasswordSync(password))
        return res.boom.badImplementation(req.__('boom.message.badImplementation'))

    const user = await User.updateOne({ _id: userId }, update);

    if (!user)
        return res.boom.badImplementation(req.__('boom.message.badImplementation'));

    return res.send(req.__('request.message.updated')).status(200);
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;

    const user = await User.updateOne({ _id: userId }, { active: false });

    if (!user)
        return res.boom.badImplementation(req.__('boom.message.badImplementation'));

    return res.send(req.__('request.message.deleted')).status(200);
};

const findAllUser = async (req, res) => {
    const { query } = req;
    const { q } = query;
    const skip = isNaN(query.skip) ? SKIP : parseInt(encodeURIComponent(query.skip), 10);
    const limit = isNaN(query.limit) ? LIMIT : parseInt(encodeURIComponent(query.limit), 10);

    const filter = {};

    if (q) {
        filter.$or = [
            { name: { $regex: `.*${q}.*`, $options: 'i' } },
            { lastName: { $regex: `.*${q}.*`, $options: 'i' } }
        ]
    }

    filter.active = { $eq: isTrue(query.active) };
 
    const data = await User.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await User.countDocuments(filter);

    return res.send({
        data,
        total,
        skip,
        limit
    }).status(200);
};

const findOneUser = async (req, res) => {
    const { userId } = req.params;

    const data = await User.findById(userId);
    
    res.send({ data }).status(200);
};

const checkEmail = async (req, res) => {
    const { email } = req.body;

    const isUnique = !(await User.findOne({ email }));

    res.send({ isUnique }).status(200);
};

module.exports = {
    validations,
    createUser,
    updateUser,
    deleteUser,
    findAllUser,
    findOneUser,
    checkEmail
}