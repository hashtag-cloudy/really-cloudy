'use strict';
const _ = require('lodash');

const objectHelper = {

    findInObject: function (contact, filter) {

        const traverse = (obj, path = '', result = []) => {

            _.forOwn(obj, (value, key) => {

                const p = (path && (path + '.')) + key;
                if (filter(value, key, p)) {
                    result.push(p);
                }
                // traverse objects but not arrays
                // arrays are replaced entirely
                else if (_.isObject(value) && !_.isArray(value)) {
                    return traverse(value, p, result);
                }
            });

            return result;
        };

        return traverse(contact);
    },

    findArrays: function (obj) {

        return this.findInObject(obj, _.isArray);
    },

    findNulls: function (obj) {

        return this.findInObject(obj, _.isNull);
    },

    findDiff: function (obj1, obj2) {

        return this.findInObject(obj1, (value, key, path) => !_.has(obj2, path));
    }
};

module.exports = objectHelper;
