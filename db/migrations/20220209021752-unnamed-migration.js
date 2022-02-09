'use strict';

const {MOVIE_GENRE_TABLE, MovieGenreSchema} = require('./../models/movie-genre')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(MOVIE_GENRE_TABLE, MovieGenreSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(MOVIE_GENRE_TABLE)
  }
};