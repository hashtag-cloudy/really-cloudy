'use strict';

const Config = require('../config');
const Fs = require('fs');
const Hapi = require('hapi');
const MongodbMock = require('mongo-mock');
const Proxyquire = require('proxyquire');
const Path = require('path');
const MongoPlugin = Proxyquire('hapi-mongodb', {
    'mongodb': MongodbMock
});
const IndexPlugin = require('../server/api/index');
const MockData = require('../mongoData/mockData');

const testsSetup = {

    setupData: function () {

        const mockData = new MockData.dataMocker();
        // persist the data to disk
        // MongodbMock.MongoClient.persist = Path.join(__dirname, '../test/artifacts', 'mongodata.js');

        const start = new Date();
        console.log('Inserting mock data to mock mongo for tests');
        MongodbMock.max_delay = 0;
        return mockData.loadData(MongodbMock.MongoClient)
            .then((res) => {

                console.log(`Inserted mock data to mongo mock in ${(new Date() - start) / 100} s`);
                MongodbMock.max_delay = 200;
            })
            .catch((err) => {

                console.error('!!!!!!!!!! ERROR INSERTING - ' + err);
                throw err;
            });
    },

    setupPlugins: function (addPlugins, addViews) {

        return new Promise((resolve, reject) => {

            const plugins = [IndexPlugin, {
                register: MongoPlugin,
                options: {
                    url: 'mongodb://localhost:27017/ods',
                    decorate: true
                }
            }];

            if (addPlugins) {
                addPlugins(plugins);
            }

            const server = new Hapi.Server();
            server.connection({
                port: Config.get('/port/web')
            });
            server.register(plugins, (err) => {

                if (err) {
                    return reject(err);
                }

                if (addViews) {
                    addViews(server);
                }

                resolve(server);
            });

            server.on('response', (request) => {

                const logMsg = `${request.info.remoteAddress} : ${request.method.toUpperCase()} ${request.url.path} --> ${request.response.statusCode}`;

                if (request.response.statusCode >= 200 && request.response.statusCode < 399) {
                    console.log(logMsg);
                }
                else {
                    console.error(logMsg);
                }
            });
        });
    },

    setupConfig: function () {

        return new Promise((resolve) => {

            const configPath = Path.join(__dirname, '..', 'config', 'test.json');
            Fs.writeFileSync(configPath, 'NOT JSON');

            return resolve();
        });
    },

    breakdownConfig: function () {

        return new Promise((resolve) => {

            const configPath = Path.join(__dirname, '..', 'config', 'test.json');
            Fs.unlinkSync(configPath);

            return resolve();
        });
    }


};

module.exports = testsSetup;
