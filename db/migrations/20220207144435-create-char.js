'use strict';

const {CHARACTER_TABLE, CharacterSchema} = require('./../models/character.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CHARACTER_TABLE, CharacterSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CHARACTER_TABLE)
  }
}