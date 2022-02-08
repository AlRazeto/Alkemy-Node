const {Sequelize, Model, DataTypes} = require('sequelize')

const GENRE_TABLE = 'genres'

const GenreSchema = {
    name : {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true
    },
    image : {
        allowNull: false,
        type: DataTypes.BLOB
    },
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
}

class Genre extends Model{
    static associate(models){
        this.hasMany(models.Movie, {
            as: 'movie_genre',
            foreignKey: 'title'
        });
    }

    static options(sequelize){
        return{
            sequelize,
            tableName : GENRE_TABLE,
            modelName : 'Genre',
            timestamps : false,
            createdAt : false,
            updatedAt : false,
        }
    }
}

module.exports = {GENRE_TABLE, GenreSchema, Genre}