'use strict';
const Path = require('path');
const Logger = require('../../logger')
    .Logger;

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/cloudy-api/{env}/web',
        handler: async function (request, reply) {

            const env = request.params.env;

            try {

                const villages = await request.mongo.db.collection(`${env}.villages`)
                    .find({})
                    .toArray();

                return reply.view('index', {
                    villages
                });
            } catch (err) {

                Logger.errorObj({
                    env,
                    msg: err.toString()
                });
                reply.view('error', {
                        err
                    })
                    .code(500);
            }

        }
    });

    // Serve up all static content in build folder
    server.route({
        method: 'GET',
        path: '/odsapi/{env}/log/{path*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '../../client/build/'),
                listing: false,
                index: true
            }
        }
    });

    next();
};


exports.register.attributes = {
    name: 'web',
    dependencies: ['visionary', 'inert']
};
