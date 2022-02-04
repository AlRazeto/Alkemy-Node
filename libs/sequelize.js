const {Sequelize} = require ('sequelize');
const {config} = require('./../config/config');

const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true
});

module.exports = sequelize