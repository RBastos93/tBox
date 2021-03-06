'use strict';

const express = require('express');
const router = express.Router();
const { validRequest } = require('../plugins/express-validator');
const { validations, authenticateUser } = require('../controllers/auth');

router.route('/:language/auth')
    .post(validRequest(validations), authenticateUser);

module.exports = router;