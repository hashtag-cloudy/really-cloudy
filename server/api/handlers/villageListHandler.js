'use strict';

const Logger = require('../../../logger')
    .Logger;

const villageListHandler = {
    apply: async function (request, reply) {

        const env = request.params.env;

        const docs = await request.mongo.db.collection(`${env}.villages`)
            .find({})
            .toArray();

        Logger.logObj({
            env,
            requestId,
            msg: `Requested villages. Found ${docs.length}.`
        });

        const response = {
            count: docs.length
            villages: docs
        };

        reply(response);
    }
};

module.exports = villageListHandler;
