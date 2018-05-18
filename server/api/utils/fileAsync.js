'use strict';
const Fs = require('fs');
const Path = require('path');

const fileAsync = {

    readFileAsync: function (fullPath) {

        return new Promise((resolve, reject) => {

            Fs.readFile(fullPath, 'utf8', (err, data) => {

                if (err) {
                    return reject(err);
                }

                return resolve({
                    name: Path.basename(fullPath, '.json'),
                    data: JSON.parse(data)
                });
            });
        });
    }
};

module.exports = fileAsync;
