const Joi = require('joi')

const name = Joi.string().alphanum();
const age = Joi.number();
const weigth = Joi.number();
const movies = Joi.array();
const image = Joi.binary();
const info = Joi.string().max(300);


const  createCharacterSchema = Joi.object({
    name: name.required(),
    image: image.required(),
    age: age.required(),
    weigth: weigth.required(),
    movies: movies.required(),
    info: info.required(),
});

module.exports = createCharacterSchema