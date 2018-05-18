'use strict';

const Confidence = require('confidence');
const Config = require('./config');


const criteria = {
    env: process.env.NODE_ENV
};


const manifest = {
    $meta: 'This file defines the Cloudy API.',
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                security: true
            }
        }
    },
    connections: [{
        port: Config.get('/port/web'),
        labels: ['web']
    }],
    registrations: [
        {
            plugin: 'vision'
        },
        {
            plugin: 'inert'
        },
        {
            plugin: {
                register: 'lout',
                options: {
                    endpoint: 'cloudy/docs',
                    apiVersion: '1.2.0'
                }
            }
        },
        {
            plugin: {
                register: 'visionary',
                options: {
                    engines: { pug: 'pug' },
                    path: './server/web'
                }
            }
        },
        {
            plugin: {
                register: './server/api/index'
            },
            options: {
                routes: { prefix: '/cloudy-api' }
            }
        },
        {
            plugin: './server/web/index'
        },
        {
            plugin: {
                register: 'hapi-mongodb',
                options: Config.getDS('/localhost')
            }
        }
    ]
};


const store = new Confidence.Store(manifest);


exports.get = (key) => {

    return store.get(key, criteria);
};


exports.meta = (key) => {

    return store.meta(key, criteria);
};
