'use strict';

const Product = require('../models/product');
const { body, param } = require('express-validator');
const { isTrue } = require('../helpers/helpers');
const { SKIP, LIMIT } = require('../constants/mongoDB');

const validations = [
    param('language').exists().trim().escape().isLength({ min: 2 }),
    body('name').exists().trim().escape()
        .bail().isLength({ min: 3 }),
    body('price').isFloat({ min: 0.01 })
        .bail().isLength({ min: 1 }),
    body('quantity').isInt({ min: 1 })
        .bail().isLength({ min: 1 }),
];

const createProduct = async (req, res) => {
    const { name, price, quantity } = req.body;

    const product = await Product.create({
        name,
        price,
        quantity
    });

    if (!product) return res.boom.badImplementation(req.__('boom.message.badImplementation'));

    return res.send(req.__('request.message.created')).status(201);
};

const updateProduct = async (req, res) => {
    const { name, price, quantity } = req.body;
    const { productId } = req.params;
    
    const update = {
        name,
        price,
        quantity
    };

    const product = await Product.updateOne({ _id: productId }, update);

    if (!product) return res.boom.badImplementation(req.__('boom.message.badImplementation'));

    return res.send(req.__('request.message.updated')).status(200);
};

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    const product = await Product.updateOne({ _id: productId }, { active: false });

    if (!product) return res.boom.badImplementation(req.__('boom.message.badImplementation'));

    return res.send(req.__('request.message.deleted')).status(200);
};

const findAllProduct = async (req, res) => {
    const { query } = req;
    const { q } = query;
    const skip = Number.isNaN(query.skip) ? SKIP : parseInt(encodeURIComponent(query.skip), 10);
    const limit = Number.isNaN(query.limit) ? LIMIT : parseInt(encodeURIComponent(query.limit), 10);

    const filter = {};

    if (q) {
        filter.name = { $regex: `.*${q}.*`, $options: 'i' };
    }

    filter.active = { $eq: isTrue(query.active) };
    
    const data = await Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Product.countDocuments(filter);

    return res.send({
        data,
        total,
        skip,
        limit
    }).status(200);
};

const findOneProduct = async (req, res) => {
    const { productId } = req.params;

    const data = await Product.findById(productId);

    res.send({ data }).status(200);
};

module.exports = {
    validations,
    createProduct,
    updateProduct,
    deleteProduct,
    findAllProduct,
    findOneProduct
}