/*jshint esversion: 6, node: true*/
'use strict';

const Lab = require('lab');
const Code = require('code');

const lab = exports.lab = Lab.script();

const Logger = require('../logger').Logger;

lab.experiment('Logger', () => {

    lab.beforeEach(() => {

        // Run before every single test
        Logger.removeAllListeners();
    });

    lab.test('emits notification on log', { plan: 1 }, () => {

        const msg = 'hello - this is me - log';
        Logger.on('msg-logged', (data) => {

            Code.expect(data.data[0]).to.equal(msg);
        });
        Logger.log(msg);
    });

    lab.test('emits notification on logObj', { plan: 1 }, () => {

        const obj = { env: 'prod', msg: 'hello - this is me - log', requestId: '123-456' };
        const expected = { env: 'prod', msg: 'hello - this is me - log', requestId: '123-456', data: undefined, type: 'INFO' };
        Logger.on('msg-logged', (data) => {

            Code.expect(data).to.equal(expected);
        });
        Logger.logObj(obj);
    });

    lab.test('emits notification on logObj when no data provided', { plan: 1 }, () => {

        const obj = { msg: 'hello - this is me - log' };
        const expected = { env: 'all', msg: 'hello - this is me - log', requestId: '', data: undefined, type: 'INFO' };
        Logger.on('msg-logged', (data) => {

            Code.expect(data).to.equal(expected);
        });
        Logger.logObj(obj);
    });

    lab.test('emits notification on error', { plan: 1 }, () => {

        const msg = 'hello - this is me - error';
        Logger.on('msg-logged', (data) => {

            Code.expect(data.data[0]).to.equal(msg);
        });
        Logger.error(msg);
    });

    lab.test('emits notification on warn', { plan: 1 }, () => {

        const msg = 'hello - this is me - warning';
        Logger.on('msg-logged', (data) => {

            Code.expect(data.data[0]).to.equal(msg);
        });
        Logger.warn(msg);
    });

    lab.test('emits notification on error when no subscribers', { plan: 0 }, () => {

        const msg = 'hello - this is me - error2';
        Logger.error(msg);
    });

});
