'use strict';

const {GENRE_TABLE} = require('./../models/genre.model')

let genreList = [
  {name: "terror", image: "la imagen"},
  {name: "comedia", image: "la imagen"},
  {name: "accion", image: "la imagen"},
  {name: "drama", image: "la imagen"},
  {name: "ficcion", image: "la imagen"},
  {name: "no-ficcion", image: "la imagen"},

];

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert(GENRE_TABLE, genreList, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(GENRE_TABLE, null, {});
  }
};
