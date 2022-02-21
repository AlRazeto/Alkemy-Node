'use strict';

const {GENRE_TABLE} = require('./../models/genre.model')

let genreList = [
  {name: "terror", image: "https://litreactor.com/sites/default/files/images/column/headers/000.png"},
  {name: "comedia", image: "https://www.adgully.com/img/800/201706/n-comedian-large570.jpg"},
  {name: "accion", image: "https://www.myabandonware.com/media/img/genre/action.png"},
  {name: "drama", image: "https://literatelai.files.wordpress.com/2012/05/666px-p_culture_violet.png"},
  {name: "fantasía", image: "https://nofilmschool.com/sites/default/files/styles/twitter/public/genre_header.png?itok=2-OkId3s"},
  {name: "no-ficcion", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8BvvX8hw_M61yComB1ifePJu3A3sPqfN4rJkmatZx_8qRBmiPo3qwBHsuNJNGqFL5_5c&usqp=CAU"},
];

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert(GENRE_TABLE, genreList, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(GENRE_TABLE, null, {});
  }
};
