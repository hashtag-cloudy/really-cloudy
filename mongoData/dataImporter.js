'use strict';
const Mocker = require('./mockData');

// provide connection string, otherwise config/datasource.localhost will be used
const connectionString = process.argv.length > 1 && process.argv[2];
const dataMocker = new Mocker.dataMocker(connectionString);

dataMocker.loadData()
    .then((res) => {

        console.log('Process done: ' + res);
        process.exit();
    })
    .catch(console.error);
