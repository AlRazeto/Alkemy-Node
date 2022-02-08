const { boom, Boom } = require('@hapi/boom');
const express = require('express');
const Service = require('./../services/characters.services');
const {createCharacterSchema, updateCharacterSchema} = require('./../schemas/character.schemas')
const validatorMiddleware = require('./../middlewares/schema.validator')

const router = express.Router();
const service = new Service();

router.get('/',async (req,res,next)=>{
    try{
        if(req.query){
            const {age, movies, name} = req.query
            if(name){
                const rta = await service.getOne(name)
                res.json(rta);
            }
            else if(movies){
                const rta = await service.getByMovie(movies)
                res.json(rta);
            }
            else if(age){
                const rta = await service.getByAge(age)
                res.json(rta);
            }else{
                throw Boom.badRequest('invalid query')
            };
        }
        else{
            const rta= await service.getAll()
            res.json(rta);
        };
    }catch(err){
        next(err)
    }
});

router.post('/',
//validatorMiddleware(createCharacterSchema, 'body'),
async(req,res,next)=>{
    try{
        const body = req.body;
        console.log(req)
        const newCharacter = await service.create(body);
        res.status(201).json(newCharacter)
    }catch(err){
        next(err)
    };
});

router.patch('/:name',
validatorMiddleware(updateCharacterSchema, 'body'),
async(req,res,next)=>{
    try{
        const {name}= req.params;
        const body = req.body;
        const updated = await service.update(name, body);
        res.json(updated)
    }catch(err){
        next(err)
    };
});

router.put('/:name',
validatorMiddleware(updateCharacterSchema, 'body'),
async(req,res,next)=>{
    try{
        const {name}= req.params;
        const body = req.body;
        const updated = await service.update(name, body);
        res.json(updated)
    }catch(err){
        next(err)
    };
});

router.delete('/:name',(req,res,next)=>{
    try{
        const {name} = req.params;
        service.delete(name);
    }catch(err){
        next(err)
    }
});

module.exports = router