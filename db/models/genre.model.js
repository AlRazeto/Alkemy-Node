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
        type: DataTypes.ARRAY(DataTypes.STRING),
        unique: true
    },
};


class Genre extends Model{
    static associate(models){
        this.belongsToMany(models.Movie,{
            as: 'genreMovies',
            through: models.MovieGenre,
            foreignKey: 'genres',
            otherKey:'movies'
        })
       
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