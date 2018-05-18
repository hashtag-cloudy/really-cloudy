'use strict';

const Lab = require('lab');
const Code = require('code');
const Vision = require('vision');
const Nock = require('nock');
const HomePlugin = require('../../../server/web/index');
const TestSetup = require('../../testsSetup');
const Inert = require('inert');

const lab = exports.lab = Lab.script();
let request;
let server;

lab.before(TestSetup.setupData);

lab.beforeEach(() => {

    return TestSetup.setupPlugins(
        (plugins) => {

            plugins.push(Vision, Inert, HomePlugin);
        },
        (srv) => {

            srv.views({
                engines: {
                    pug: require('pug')
                },
                path: './server/web'
            });
        }).then((res) => {

        server = res;
    });
});

lab.experiment('Web View', () => {

    lab.test('villages render properly', async () => {

        request = {
            method: 'GET',
            url: '/cloudy-api/test/web'
        };

        const response = await server.inject(request);

        Code.expect(response.result).to.match(/World Blockchain Development Fund/i);
        Code.expect(response.statusCode).to.equal(200);
    });

});
