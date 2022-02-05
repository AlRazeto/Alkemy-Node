const {Sequelize, Model, DataTypes} = require('sequelize')

const GENRE_TABLE = 'genres'

const GenreSchema = {
    name : {
        allowNull: false,
        type: DataTypes.STRING,
    },
    image : {
        allowNull: false,
        type: DataTypes.BLOB
    },
    movies : {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.JSON)
    },
}

class Genre extends Model{
    static options(sequelize){
        return{
            sequelize,
            tableName : GENRE_TABLE,
            modelName : 'Genre'
        }
    }
}

module.exports = {GENRE_TABLE, GenreSchema, Genre}