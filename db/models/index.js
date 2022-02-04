const {User, UserSchema} =require('./character.model');

function setUpModels(sequelize){
    User.init(UserSchema, User.options(sequelize))
}

module.exports= setUpModels
