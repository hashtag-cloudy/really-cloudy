'use strict';
const Mongodb = require('mongodb');
const Fs = require('fs');
const Path = require('path');
const Co = require('co');

class dataMocker {

    constructor(url) {

        if (!url) {
            // this is here because of docker
            const Config = require('../config');
            this.connectionString = Config.getDS('/localhost/url');
        }
        else {
            this.connectionString = url;
        }

        console.log(`setup data mocker to use ${this.connectionString}`);
    }

    loadData(mongoClt) {

        console.log('Running data mocker');

        let db;

        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*
        return Co(function*(obj) {

            // use provided client or create a new one
            const mongoClient = mongoClt || Mongodb.MongoClient;

            // Connection URL
            console.log(`Connecting to ${obj.connectionString}`);
            // Use connect method to connect to the Server
            db = yield mongoClient.connect(obj.connectionString, {});

            console.log(`inserting to ${obj.connectionString}`);

            const files = yield obj.readDirAsync('./data');

            for (const f of files) {

                const data = yield obj.readFileAsync(f);

                // when collection name is prefixed with '-' it's considered global not for env:test
                const collectionName = data.name[0] === '-' ? data.name.substring(1) : ('test.' + data.name);

                console.log(`Mock data inserting ${collectionName}`);
                // Get the documents collection
                const collection = db.collection(collectionName);

                yield collection.remove({});
                console.log(`Removed all documents from ${collectionName}`);

                // Insert some contacts
                const res = yield collection.insertMany(data.data);

                console.log(`Inserted ${res.result.n} records to ${collectionName} with status ${res.result.ok}`);
            }
        }, this)
            .then(() => db.close())
            .catch((err) => {

                console.error(`Error inserting data: ${err}`);
                if (db) {
                    db.close();
                }
            });
    }

    readDirAsync(path) {

        const fullPath = Path.join(__dirname, path);
        return new Promise((resolve, reject) => {

            Fs.readdir(fullPath, (err, files) => {

                if (err) {
                    return reject(err);
                }

                return resolve(files.filter((f) => f.endsWith('.json') && f !== 'package.json').map((f) => Path.join(fullPath, f)));
            });
        });
    }

    readFileAsync(fullPath) {

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

}

module.exports.dataMocker = dataMocker;
