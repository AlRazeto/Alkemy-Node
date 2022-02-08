const {Character, CharacterSchema} =require('./character.model');
const {Movie, MovieSchema} =require('./movie.model');
const {Genre, GenreSchema} =require('./genre.model');
const {CharacterMovie, CharacterMovieSchema} =require('./character-movie');


function setUpModels(sequelize){
    Character.init(CharacterSchema, Character.options(sequelize));
    Movie.init(MovieSchema, Movie.options(sequelize));
    Genre.init(GenreSchema, Genre.options(sequelize));
    CharacterMovie.init(CharacterMovieSchema, CharacterMovie.options(sequelize));

    Character.associate(sequelize.models);
    Movie.associate(sequelize.models);
    Genre.associate(sequelize.models);
};

module.exports= setUpModels
