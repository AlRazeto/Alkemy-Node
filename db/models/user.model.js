const {Sequelize, Model, DataTypes} = require('sequelize');

const USER_TABLE = 'users';

const UsersSchema = {
    email : {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
    },
    password : {
        allowNull: false,
        type: DataTypes.STRING,
    },
};

class Users extends Model{
    static associate(models){};
    
    static options(sequelize){
        return{
            sequelize,
            tableName : USER_TABLE,
            modelName : 'Users',
            timestamps : false,
            createdAt : false,
            updatedAt : false,
        };
    };
};

module.exports= {USER_TABLE, Users, UsersSchema}