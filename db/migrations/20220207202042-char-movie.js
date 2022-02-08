'use strict';

const {CHARACTER_MOVIE_TABLE, CharacterMovieSchema} = require('./../models/character-movie')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CHARACTER_MOVIE_TABLE, CharacterMovieSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CHARACTER_MOVIE_TABLE)
  }
};