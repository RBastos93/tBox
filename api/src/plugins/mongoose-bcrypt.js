'use strict';

var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

module.exports = (schema, options) => {
    const { fields = [] } = options;

    if (typeof fields === 'string')
        fields = [fields];

    schema.eachPath((pathname, schemaType) => {
        const { bcrypt } = schemaType.options;

        if (bcrypt && fields.indexOf(pathname) < 0) {
            fields.push(pathname);
        }
    });

    if (fields.length === 0)
        fields.push('password');

    const { rounds = 0 } = options;

    fields.forEach(field => {
        const path = field.split('.');

        const fieldName = path.map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join('');

        schema.statics[`encrypt${fieldName}`] = function(value, cb) {
            return encrypt(field, value, cb);
        };

        schema.methods[`verify${fieldName}`] = function(value, cb) {
            return bcrypt.compare(value, this.get(field), cb);
        };
        
        schema.methods[`verify${fieldName}Sync`] = function(value) {
            return bcrypt.compareSync(value, this.get(field));
        };
    });

    schema.pre('save', function(next) {
        const changed = [];
        let count;

        fields.forEach(field => {
            if (this.isModified(field))
                changed.push(field);
        });

        count = changed.length;

        changed.forEach(field => {
            encrypt(field, this.get(field), (error, hash) => {
                if (error)
                    return next(error);

                this.set(field, hash);

                if (--count === 0)
                   return next();
            });
        });

        if (count === 0)
            return next();
    });

    function preUpdate(next) {
        const changed = [];
        let update = this.getUpdate(), count;
     
        fields.forEach(field => {
            if (update[field] || update.$set[field])
                changed.push(field);
        });

        count = changed.length;

        changed.forEach(field => {
            encrypt(field, update[field] || update.$set[field], (error, hash) => {
                if (error)
                    return next(error);
                
                if (update.$set[field])
                    update.$set[field] = hash;

                update[field] = hash;

                if (--count === 0)
                    return next();
            });
        });
        
        if (count === 0)
            return next();
     };

    schema.pre('updateOne', preUpdate);

    const encrypt = (field, value, cb) => {
        bcrypt.genSalt(schema.path(field).options.rounds || rounds, (error, salt) => {
            if (error)
                return cb(error);
    
            bcrypt.hash(value, salt, cb);
        });
    };
};