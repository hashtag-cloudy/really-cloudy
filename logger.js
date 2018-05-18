/*jshint esversion: 6, node: true*/
'use strict';

const Events = require('events');
const Config = require('./config');

// use 'inherits' rather than extends?
// var EventEmitter = require('events').EventEmitter;
// util.inherits(Master, EventEmitter);
class Logger extends Events.EventEmitter {

    hideIfBeat(data, type) {

        const showBeats = Config.get('/logger/showBeats');
        if (type === 'BEAT' && showBeats === false) {
            return undefined;
        }
        return data;
    }

    log() {

        console.log.call(this, new Date(), ...arguments);
        this.emit('msg-logged', { data: arguments });
    }

    logObj({ env = 'all', requestId = '', msg = '', data = undefined , type = 'INFO' } = {}) {

        console.log.call(this, new Date(), ...[env, requestId, msg, this.hideIfBeat(data, type)].filter((d) => d));
        this.emit('msg-logged', { env, requestId, msg, data, type });
    }

    error() {

        console.error.call(this, new Date(), ...arguments);
        this.emit('msg-logged', { data: arguments });
    }

    errorObj({ env = 'all', requestId = '', msg = '', data = undefined, type = 'ERROR' } = {}) {

        console.error.call(this, new Date(), ...[env, requestId, msg, data].filter((d) => d));
        this.emit('msg-logged', { env, requestId, msg, data, type });
    }

    warn() {

        console.warn.call(this, new Date(), ...arguments);
        this.emit('msg-logged', { data: arguments });
    }

    warnObj({ env = 'all', requestId = '', msg = '', data = undefined, type = 'WARNING' } = {}) {

        console.warn.call(this, new Date(), ...[env, requestId, msg, data].filter((d) => d));
        this.emit('msg-logged', { env, requestId, msg, data, type });
    }

    data() {

        console.log.call(this, new Date(), ...arguments);
        this.emit('msg-logged', { data: arguments });
    }

    dataObj({ env = 'all', requestId = '', msg = '', data = undefined, type = undefined } = {}) {

        console.log.call(this, new Date(), ...[env, requestId, msg, JSON.stringify(this.hideIfBeat(data, type))].filter((d) => d));
        this.emit('msg-logged', { env, requestId, msg, data, type: 'EXTRA' });
    }
}

const logger = new Logger();

module.exports.Logger = logger;
