'use strict';
const Logger = require('../../../logger')
    .Logger;

const odsIdGenerator = {

    generate: async function (db, env) {

        try {
            Logger.log(`Generating Id for environment '${env}'`);
            const id = await db.eval(`getNextSequence("${env}_odsId")`);
            return id;
        } catch (err) {
            Logger.error(err);
            return await findFreeOdsId(db, env);
        }
    }
};

const findFreeOdsId = async (db, env, salt, counter) => {

    counter = counter || 1;
    if (counter === 10) {
        throw 'Could not find free OdsId in 10 attempts';
    }

    try {
        const candidate = Math.floor(Math.random(salt) * 1000000000);

        const docs = await db.collection(`${env}.contacts`)
            .find({
                odsPhysicalPrimaryKey: candidate
            })
            .toArray();

        if (docs.length === 0) {
            return candidate;
        }
        return findFreeOdsId(db, env, candidate, ++counter);
    } catch (err) {
        Logger.error(`Could not find free OdsId: ${err}`);
        throw err;
    }
};

module.exports = odsIdGenerator;
