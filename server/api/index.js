'use strict';
// const ContactListHandler = require('./handlers/contactListHandler');
// const ContactListValidator = require('./validators/contactListValidator');
const VillageByIdHandler = require('./handlers/villageByIdHandler');
// const ContactByIdValidator = require('./validators/contactByIdValidator');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            reply({
                message: 'Welcome to Cloudy API'
            });
        }
    });

    // server.route({
    //     method: 'GET',
    //     path: '/{env}/v1/villages',
    //     handler: ContactListHandler.apply,
    //     config: ContactListValidator.config
    // });

    server.route({
        method: 'GET',
        path: '/{env}/v1/village',
        handler: VillageByIdHandler.apply,
        // config: ContactByIdValidator.config
    });

    next();
};


exports.register.attributes = {
    name: 'api'
};
