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
        type: DataTypes.ARRAY(DataTypes.STRING),
        refrence: {
            model: 'characters',
            key: 'name',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    genre : {
        allowNull: false,
        type: DataTypes.STRING,
        refrence: {
            model: 'genres',
            key: 'name',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
}

class Movie extends Model{
    static associate(models){
        this.belongsTo(models.Genre, {as: 'genre_movie'});
        this.belongsToMany(models.Characters,{
            as: 'movies',
            through: models.CharacterMovie,
            foreignKey: 'title',
            otherKey: 'actor',
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