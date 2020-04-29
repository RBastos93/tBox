'use strict';

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validRequest } = require('../plugins/express-validator');
const { validations, createUser, updateUser, deleteUser, findAllUser, findOneUser, checkEmail } = require('../controllers/user');

router.route('/:language/email/check')
    .post(validRequest([ body('email').isEmail() ]), checkEmail);

router.route('/:language/user')
    .post(validRequest(validations), createUser)
    .get(findAllUser);

router.route('/:language/user/:userId')
    .put(validRequest(validations), updateUser)
    .delete(deleteUser)
    .get(findOneUser);

module.exports = router;