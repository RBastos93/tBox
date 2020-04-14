'use strict';

const { validationResult } = require('express-validator');

const errorFormatter = (req, { param }) => {
    return ({
        param: param,
        message: req.__(`user.validation.message.${param}`)
    });
};

const validRequest = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        
        const errors = validationResult(req).formatWith(errorFormatter.bind(null, req));
        
        await req.setLocale(req.params.language);

        if (errors.isEmpty()) return next();
        
        return res.boom.badRequest(
            req.__('boom.message.badRequest'),
            { errors: errors.array() }
        );
    };
};

module.exports = {
    validRequest
}