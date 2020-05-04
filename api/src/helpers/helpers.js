'use strict';

const isTrue = value => {
    if (value === true || value === 'true' || !value) {
        return true;
    }

    return false;
};

const emailIsUnique = async (email, req, res, Schema) => {
    const isUnique = !(await Schema.findOne({ email }));

    if (!isUnique)
        return res.boom.badRequest(
            req.__('boom.message.badRequest'),
            { errors: [{ param: 'email', message: req.__('user.validation.message.email.alreadyRegistered') }] }
        );
};

Array.prototype.last = function(){
    return this[this.length - 1];
};

module.exports = {
    isTrue,
    emailIsUnique
}