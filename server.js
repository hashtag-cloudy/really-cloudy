'use strict';

const Composer = require('./index');
const Logger = require('./logger')
    .Logger;
const Mongodb = require('mongodb');
const SocketIO = require('socket.io');

const socket = {
    info: 'This is for sharing socket with API'
};
let io;

Composer((err, server) => {

    if (err) {
        throw err;
    }

    server.start(async (error) => {

        if (error) {
            throw error;
        }

        // listener - the http/hapi server object.
        io = SocketIO.listen(server.listener);

        io.on('connection', (sck) => {

            const envRegex = /\/odsapi\/(.+)\/log/i;
            const match = envRegex.exec(sck.handshake.headers.referer);
            const env = match && match.length > 1 ? match[1] : 'all';

            Logger.logObj({
                env,
                msg: `Someone connected using ${sck.handshake.headers['user-agent']}`,
                type: 'EXTRA'
            });

            sck.on('disconnect', () => {

                Logger.logObj({
                    msg: 'someone disconnected',
                    type: 'EXTRA'
                });
            });
        });

        socket.io = io;

        Logger.on('msg-logged', (msg) => {

            const key = 'msg-logged-on-' + (msg.env || 'all');
            io.emit(key, msg);
        });

        const db = server.mongo.db;

        Logger.log(`Started the Cloudy API on port ${server.info.port} using environment: ${process.env.NODE_ENV} with db: ${db.serverConfig.s.host}`);

        try {
            const funResult = await db.collection('system.js')
                .save({
                    _id: 'getNextSequence',
                    value: new Mongodb.Code(`function getNextSequence(name) {

                        const ret = db.counters.findAndModify(
                            {
                                query: { _id: name },
                                update: { $inc: { seq: 1 } },
                                new: true,
                                upsert: true
                            }
                       );
                        return ret.seq;
                    }`)
                }, {
                    upsert: true
                });
            Logger.log(`inserted getNextSequence function ${JSON.stringify(funResult)}`);
        } catch (err) {
            Logger.error(`Failed to setup mongo (counters, getNextSequence) ${err}`);
        }
    });

    server.on('response', (request) => {

        const requestId = request.headers['x-request-id'];
        const logMsg = {
            requestId,
            msg: `${request.info.remoteAddress} : ${request.method.toUpperCase()} ${request.url.path} --> ${request.response.statusCode}`
        };

        if (request.response.statusCode >= 200 && request.response.statusCode < 399) {
            Logger.logObj(logMsg);
        } else {
            Logger.errorObj(logMsg);
        }
    });
});

module.exports.socket = socket;
