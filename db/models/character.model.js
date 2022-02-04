const {Sequelize, Model, DataTypes} = require('sequelize')

const CHARACTER_TABLE = 'characters'

const UserSchema = {
    name : {
        allowNull: false,
        type: DataTypes.STRING,
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

class User extends Model{
    static options(sequelize){
        return{
            sequelize,
            tableName : CHARACTER_TABLE,
            modelName : 'User'
        }
    }
}

module.exports = {CHARACTER_TABLE, UserSchema, User}