const {config} = require('./../config/config');

const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`

module.exports = {
    development: {
      url: URI,
      dialect: 'postgres',
    },
    production: {
      url: URI,
      dialect: 'postgres',
    }
  }