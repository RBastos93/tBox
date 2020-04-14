'use strict';

const isTrue = value => {
    if (value === true || value === 'true') {
        return true;
    }

    return false;
};

module.exports = {
    isTrue
}