'use strict';
const {UsersSchema, USER_TABLE} = require('./../models/user.model')


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UsersSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE)
  }
};
