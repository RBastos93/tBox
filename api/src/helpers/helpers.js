'use strict';

const isTrue = value => {
    if (value === true || value === 'true' || !value) {
        return true;
    }

    return false;
};

module.exports = {
    isTrue
}