const boom  = require('@hapi/boom')
const express = require('express')
const {models} = require('./../libs/sequelize')

class CharacterService {
    constructor(){

    }
    async create(data){
        const newChar= await models.Characters.create(data)
        return newChar   
    };
    async getAll(){
        const response = await models.Characters.findAll()
        return response
    };
    async getByMovie(id){
        const response = await models.Characters.findAll({
            where:{ movie: id }
        })
        if(!response){
            throw boom.notFound('no one in that movie or movie does not exist')
        }
        else{
        return response
        };
    };
    async getByAge(id){
        const response = await models.Characters.findAll({
            where:{ age: id },
        });
        if(!response){
            throw boom.notFound('no one with that age was found')
        }
        else{
        return response
        };
    };
    async getOne(id){
        const response = await models.Characters.findByPk(id);
        if(!response){
            throw boom.notFound('character not found')
        };
        return response
    };
    update(id, data){
        models.Characters.update(data, {
            where:{name: id}
        })
        .then(async()=>{
            const updated = await models.Characters.findByPk(id);
            return updated
        })
        .catch(err=>{throw boom.notFound('update failed: no character with that name')});
    };
    delete(id){
        models.Characters.destroy({
            where:{ name: id }
        })
        .then()
        .catch(err=>{throw boom.notFound('update failed: no character with that name')});
    };
};

module.exports = CharacterService