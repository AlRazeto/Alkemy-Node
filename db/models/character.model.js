const {Sequelize, Model, DataTypes} = require('sequelize')

const CHARACTER_TABLE = 'characters'

const CharacterSchema = {
    name : {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true
    },
    image : {
        allowNull: false,
        type: DataTypes.STRING
    },
    age : {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    weigth : {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    movies : {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
        refrence:{
            model: 'movies',
            key: 'title',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    info : {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Character extends Model{
    static associate(models){
        this.hasMany(models.Movie, {
            as: 'in_movie',
            foreignKey: 'title'
        });
    }
    static options(sequelize){
        return{
            sequelize,
            tableName : CHARACTER_TABLE,
            modelName : 'Characters',
            timestamps : false,
            createdAt : false,
            updatedAt : false,
        }
    }
}

module.exports = {CHARACTER_TABLE, CharacterSchema, Character}