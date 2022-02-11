const boom = require('@hapi/boom')
const btcypt = require('bcrypt')
const {models}= require('../libs/sequelize')

class UserServices{
    constructor(){
    };
    async create(data){
        const newUser = await models.Users.create({
            email: data.email,
            password: await btcypt.hash(data.password,10)
        });
        delete newUser.dataValues.password;
        return newUser;
    };
    async findOne(data){
        console.log(data)
        const user = await models.Users.findByPk(data);
        if(!user){
            throw boom.notFound('user not found')
        }else{
            return user
        }
    }
};

module.exports=UserServices