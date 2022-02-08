const Joi = require('joi')

const name = Joi.string().alphanum();
const age = Joi.number();
const weigth = Joi.number();
const movies = Joi.array().items(Joi.string().alphanum());
const image = Joi.string();
const info = Joi.string().max(300);


const  createCharacterSchema = Joi.object({
    name: name.required(),
    image: image.required(),
    age: age.required(),
    weigth: weigth.required(),
    movies: movies.required(),
    info: info.required(),
});
const  updateCharacterSchema = Joi.object({
    image: image,
    age: age,
    weigth: weigth,
    movies: movies,
    info: info,
});

module.exports = {createCharacterSchema, updateCharacterSchema}