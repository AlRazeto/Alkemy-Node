const boom = require('@hapi/boom')
const btcypt = require('bcrypt')
const {models}= require('../libs/sequelize')
const sgMail = require('@sendgrid/mail')
const {config} = require('./../config/config')

sgMail.setApiKey(config.senderKey)

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
    async sendmail(userMail){
        const mail = {
            to: userMail,
            from: 'emailparaalkemy@gmail.com',
            subject: 'Hola, Gracias por registrarte <3',
            text: 'ahora podes hacer login',
        };
        sgMail
        .send(mail)
        .then(() => {
            console.log('email sent')
        }, 
        error => {
            console.error(error);

            if (error.response) {
            console.error(error.response.body)
            }
        });
        
    }
    
};

module.exports=UserServices