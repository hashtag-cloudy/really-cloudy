'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../config');
const TestSetup = require('./testsSetup');

const lab = exports.lab = Lab.script();

lab.before(TestSetup.setupConfig);

lab.after(TestSetup.breakdownConfig);

lab.experiment('Config', () => {

    lab.test('it gets config data', () => {

        Code.expect(Config.get('/')).to.be.an.object();
    });


    lab.test('it gets config meta data', () => {

        Code.expect(Config.meta('/')).to.match(/this file configures the Cloudy API/i);
    });

    lab.test('it cannot read a JSON file', () => {

        Code.expect(() => Config.test()).to.throw();
    });

});
