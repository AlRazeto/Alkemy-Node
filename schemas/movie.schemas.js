const Joi = require('joi')

const title = Joi.string().alphanum();
const releaseDate = Joi.number();
const rating = Joi.number().max(5).min(1)
const characters = Joi.array();
const image = Joi.any();
const genre = Joi.array();


const  createMovieSchema = Joi.object({
    title: title.required(),
    image: image.required(),
    releaseDate: releaseDate.required(),
    rating: rating.required(),
    characters: characters.required(),
});

const  updateMovieSchema = Joi.object({
    image: image,
    releaseDate: releaseDate,
    rating: rating,
    characters: characters,
    genre: genre,
});

module.exports ={ createMovieSchema, updateMovieSchema}