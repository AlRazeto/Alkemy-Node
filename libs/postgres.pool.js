const {Pool} = require('pg');
const {config} = require('./../config/config');

    const pool = new Pool({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbName,
        port: config.dbPort
    });

module.exports= pool