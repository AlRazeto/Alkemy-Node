const {Sequelize, Model, DataTypes} = require('sequelize');

const CHARACTER_MOVIE_TABLE = 'character_movies';

const CharacterMovieSchema = {
    movies : {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.ARRAY(DataTypes.STRING),
        refrence: {
            model: 'movies',
            key: 'title'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    actors : {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
        refrence: {
            model: 'characters',
            key: 'name'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
};

class CharacterMovie extends Model{
    static associate(models){};
    
    static options(sequelize){
        return{
            sequelize,
            tableName : CHARACTER_MOVIE_TABLE,
            modelName : 'CharacterMovie',
            timestamps : false,
            createdAt : false,
            updatedAt : false,
        };
    };
};

module.exports= {CHARACTER_MOVIE_TABLE, CharacterMovie, CharacterMovieSchema}