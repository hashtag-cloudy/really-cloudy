'use strict';
const Logger = require('../../../logger')
    .Logger;

const getVillage = function (collection, request, reply, query, id) {

    return collection.find(query)
        .toArray()
        .then((docs) => {

            return docs[0];
        })
        .catch((err) => reply(err));
};

const notFound = function (doc) {

    return doc.statusCode === 400;
};

const villageByIdHandler = {
    apply: async function (request, reply) {

        const env = request.params.env;
        const id = request.query.id;
        const collection = request.mongo.db.collection(`${env}.villages`);

        let query = {
            '_id': id
        };
        let doc = {};
        let dedup = 0;

        Logger.logObj({
            env,
            requestId,
            msg: `Requested village with id '${id}'`
        });


        doc = await getVillage(collection, request, reply, query, id);

        return reply({
                query: {
                    id
                },
                village: doc
            });
    }
};

module.exports = villageByIdHandler;
