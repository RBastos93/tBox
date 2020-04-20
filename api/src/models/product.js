'use strict';

const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    price: {
        type: Number,
        required: true,
        minlength: 1
    },
    quantity: {
        type: Number,
        required: true,
        minlength: 1
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = model('Product', ProductSchema);