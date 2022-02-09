const {Sequelize, Model, DataTypes} = require('sequelize');

const MOVIE_GENRE_TABLE = 'movies-genres';

const MovieGenreSchema = {
    movies : {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
        refrence: {
            model: 'movies',
            key: 'title'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    genres : {
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

class MovieGenre extends Model{
    static associate(models){};
    
    static options(sequelize){
        return{
            sequelize,
            tableName : MOVIE_GENRE_TABLE,
            modelName : 'MovieGenre',
            timestamps : false,
            createdAt : false,
            updatedAt : false,
        };
    };
};

module.exports= {MOVIE_GENRE_TABLE, MovieGenre, MovieGenreSchema}