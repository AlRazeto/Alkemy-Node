const  boom  = require('@hapi/boom');
const express = require('express');
const passport = require('passport');
const Service = require('./../services/characters.services');
const {createCharacterSchema, updateCharacterSchema} = require('./../schemas/character.schemas')
const validatorMiddleware = require('./../middlewares/schema.validator')

const router = express.Router();
const service = new Service();


router.get('/',async (req,res,next)=>{
    try{
        if(/\?.+/.test(req.url)){
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
                throw boom.badRequest('invalid query')
            };
        }
        else{
            const rta= await service.getAll()
            res.json(rta);
        };
    }catch(err){
        next(err)
    };
});

router.post('/',
passport.authenticate('jwt' , {session:false}),
validatorMiddleware(createCharacterSchema),
async(req,res,next)=>{
    try{
        const body = req.body;
        const newCharacter = await service.create(body);
        res.status(201).json(newCharacter)
    }catch(err){
        next(err)
    };
});

router.patch('/:name',
passport.authenticate('jwt' , {session:false}),
validatorMiddleware(updateCharacterSchema),
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
passport.authenticate('jwt' , {session:false}),
validatorMiddleware(updateCharacterSchema),
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

router.delete('/:name',
passport.authenticate('jwt' , {session:false}),
(req,res,next)=>{
    try{
        const {name} = req.params;
        service.delete(name);
        res.json({name})
    }catch(err){
        next(err)
    }
});

module.exports = router