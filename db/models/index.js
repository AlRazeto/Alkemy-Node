const {Character, CharacterSchema} =require('./character.model');

function setUpModels(sequelize){
    Character.init(CharacterSchema, Character.options(sequelize))
}

module.exports= setUpModels
