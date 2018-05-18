'use strict';

const Confidence = require('confidence');
const JsonFile = require('jsonfile');
const Path = require('path');
const Fs = require('fs');
const Logger = require('./logger').Logger;

const criteria = {
    env: process.env.NODE_ENV
};


const loadConfigSync = (configPath, configFile) => {

    Logger.log(`Running configuration for ${criteria.env} environment`);

    configFile = Path.join(__dirname, configPath, configFile);

    try {
        Logger.log(`Loading configuration from ${configFile}`);
        const data = JsonFile.readFileSync(configFile, 'utf8');
        const store = new Confidence.Store(data);
        Logger.log(`${configFile} configuration loaded`);
        return store;
    }
    catch (err) {
        Logger.error(`Error loading configuration from "${configFile}".`);
        throw err;
    }
};

const configPath = 'config';
const configFiles = Fs.readdirSync(Path.join(__dirname, configPath)).sort();
const datasourceConfig = loadConfigSync(configPath, configFiles[0]);
const serverConfig = loadConfigSync(configPath, configFiles[1]);


exports.get = function (key) {

    return serverConfig.get(key, criteria);
};


exports.meta = function (key) {

    return serverConfig.meta(key, criteria);
};


exports.getDS = function (key) {

    return datasourceConfig.get(key, criteria);
};

exports.test = function () {

    return loadConfigSync(configPath, configFiles[2]);
};
