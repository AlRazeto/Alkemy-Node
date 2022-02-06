const Joi = require('joi')

const title = Joi.string().alphanum();
const realeaseDate = Joi.number();
const rating = Joi.number();
const characters = Joi.array();
const image = Joi.binary();
const genre = Joi.string();


const  createMovieSchema = Joi.object({
    title: title.required(),
    image: image.required(),
    realeaseDate: realeaseDate.required(),
    rating: rating.required(),
    characters: characters.required(),
    genre: genre.required(),
});

module.exports = createMovieSchema