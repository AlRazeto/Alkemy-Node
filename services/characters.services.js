const express = require('express')
const {models} = require('./../libs/sequelize')
const  {Op} = require('sequelize')

class CharacterService{
    constructor(){

    }
    create(data){
        models.Characters.create(data)    
    };
    async getAll(){
        const response = await models.Characters.findAll()
        return response
    };
    async getGroup(id){
        const response = await models.Characters.findAll({
            where:{
                [Op.or]:[
                    {movie: id},
                    {age :id},
                ]
            }
        })
        return response
    };
    async getOne(id){
        const response = await models.Characters.findOne({
            where:{
                name: id
            }
        })
        return response
    };
    async update(id, data){
        const char = await this.getOne(id)
        await modles.Characters.update(data, {
            where:{name: id}
        })
    };
    async delete(id){
        await models.Characters.destroy({
            where:{
                name: id
            }
        });
    };
};