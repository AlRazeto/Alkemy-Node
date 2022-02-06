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
        type: DataTypes.BLOB
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
        type: DataTypes.ARRAY(DataTypes.JSON)
    },
    genre : {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Movie extends Model{
    static options(sequelize){
        return{
            sequelize,
            tableName : MOVIE_TABLE,
            modelName : 'Movie'
        }
    }
}

module.exports = {MOVIE_TABLE, MovieSchema, Movie}