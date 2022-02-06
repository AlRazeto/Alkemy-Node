'use strict';

const {GENRE_TABLE, GenreSchema} = require('./../models/genre.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(GENRE_TABLE, GenreSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(GENRE_TABLE)
  }
};

