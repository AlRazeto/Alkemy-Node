const {Sequelize, Model, DataTypes} = require('sequelize')

const MOVIE_TABLE = 'movies'

const MovieSchema = {
    title : {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true
    },
    image : {
        allowNull: false,
        type: DataTypes.STRING,
    },
    releaseDate : {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    rating : {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    characters : {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
}

class Movie extends Model{
    static associate(models){
        this.belongsToMany(models.Genre, {
            as: 'genre',
            through: models.MovieGenre,
            foreignKey: 'movies',
            otherKey:'genres',
        });
        this.belongsToMany(models.Characters,{
            as: 'actors',
            through: models.CharacterMovie,
            foreignKey: 'movies',
            otherKey: 'actors',
        });
    }
    static options(sequelize){
        return{
            sequelize,
            tableName : MOVIE_TABLE,
            modelName : 'Movie',
            timestamps : false,
            createdAt : false,
            updatedAt : false,
        }
    }
}

module.exports = {MOVIE_TABLE, MovieSchema, Movie}