'use strict';

const removeNull = {

    apply: function (obj) {

        if (!obj) {
            return obj;
        }

        const cleaned = traverse(obj);

        return cleaned === null ? {} : cleaned;
    }
};

const traverse = function (obj) {

    let props = Object.getOwnPropertyNames(obj);

    if (props.length === 0) {
        return null;
    }

    props.forEach((p) => {

        if (obj[p] === null || obj[p] === undefined) {
            delete obj[p];
            return;
        }

        if (typeof obj[p] === 'object') {
            const cleaned = traverse(obj[p]);

            if (cleaned !== null) {
                obj[p] = cleaned;
            }
            else {
                delete obj[p];
            }
            return;
        }
    });

    // check if there are any properties left
    props = Object.getOwnPropertyNames(obj);

    if (props.length === 0) {
        return null;
    }

    return obj;
};

module.exports = removeNull;
