'use strict';

const express = require('express');
const router = express.Router();
const { validRequest } = require('../helpers/validator');
const { validations, createUser, updateUser, deleteUser, findAllUser, findOneUser } = require('../controllers/user');

router.route('/:language/user')
    .post(validRequest(validations), createUser)
    .get(findAllUser);

router.route('/:language/user/:userId')
    .put(validRequest(validations), updateUser)
    .delete(deleteUser)
    .get(findOneUser);

module.exports = router;