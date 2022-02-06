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
        type: DataTypes.BLOB
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
        type: DataTypes.ARRAY(DataTypes.JSON)
    },
    info : {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Character extends Model{
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