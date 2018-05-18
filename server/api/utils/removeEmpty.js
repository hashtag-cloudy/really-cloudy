'use strict';

const removeEmpty = {

    apply: function (obj) {

        if (!obj) {
            return obj;
        }

        const cleaned = traverse(obj);

        return cleaned === '' ? {} : cleaned;
    }
};

const traverse = function (obj) {

    let props = Object.getOwnPropertyNames(obj);

    if (props.length === 0) {
        return '';
    }

    props.forEach((p) => {

        if (obj[p] === '') {
            delete obj[p];
            return;
        }

        if (typeof obj[p] === 'object' && obj[p]) {
            const cleaned = traverse(obj[p]);

            if (cleaned !== '') {
                obj[p] = cleaned;
            }
            else {
                delete obj[p];
            }
            return;
        }
    });

    props = Object.getOwnPropertyNames(obj);

    if (props.length === 0) {
        return '';
    }

    return obj;
};

module.exports = removeEmpty;
