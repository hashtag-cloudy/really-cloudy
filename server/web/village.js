'use strict';
const Path = require('path');
const Logger = require('../../logger')
    .Logger;
const request = require('request-promise-native')

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/cloudy-api/{env}/village/{village}',
        handler: async function (request, reply) {

            const env = request.params.env;

            try {
                const allVillagers = await request.mongo.db.collection(`${env}.villages`)
                    .find({})
                    .toArray();

                var villagers = [];

                allVillagers.forEach(function(villager) {
                    if (villager.village === village) {
                        villagers.push(villager);
                    }
                });

                var villageReceivedNano = 0
                villagers.forEach(function(villager) {
                    var result = await request.post({
                        headers: {
                            Content-Type: 'application/json',
                            Authorization: '26539ea1-5aa8-11e8-b130-676d60e3ad6c'
                        },
                        url: 'https://api.nanode.co',
                        body: {
                            "action": "account_history",
                            "account": villager.nanoAddress,
                            "count": 1000
                        }
                    }).then(function(result) {
                        return result;
                    });

                    bodyObj = JSON.parse(result);
                    bodyObj.history.forEach(function(tx) {
                        if (tx.type === "receive") {
                            nanoReceived += tx.amount;
                        }
                    });
                    villager.nanoReceived = nanoReceived;
                    villageReceivedNano += nanoReceived;
                });

                return reply.view('village', {
                    village,
                    villagers,
                    villageReceivedNano
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
};
