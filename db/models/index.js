const {Character, CharacterSchema} =require('./character.model');

function setUpModels(sequelize){
    User.init(CharacterSchema, Character.options(sequelize))
}

module.exports= setUpModels
