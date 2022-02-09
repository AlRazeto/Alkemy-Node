const express = require('express');
const MovieService = require('./../services/movies.services')
const boom = require('@hapi/boom')

const router = express.Router();
const service= new MovieService()

router.get('/', async(req, res, next)=>{
    try{
        if(/\?.+/.test(req.url)){
            const {order, genre, name} = req.query
            if(name){
                const rta = await service.getOne(name)
                res.json(rta);
            }
            else if(genre){
                const rta = await service.getbyGenre(genre)
                res.json(rta);
            }
            else if(age){
                const rta = await service.getAllOrd(order)
                res.json(rta);
            }
            else{
                throw boom.badRequest('invalid query')
            }
        }
        else{
            const rta= await service.getAll()
            res.json(rta);
        };
    }catch(err){
        next(err)
    }
})

router.post('/', async(req, res, next)=>{
    try{
        const body = req.body;
        console.log(req.body)
        const newMovie = await service.create(body);
        res.status(201).json(newMovie)
    }catch(err){
        next(err)
    };
})

router.put('/', async(req, res, next)=>{
    try{
        const {name} = req.query;
        const body = req.body;
        const updated = await service.update(name, body)
        res.json(updated)
    }catch(err){
        next(err)
    };
});

router.patch('/', async(req, res, next)=>{
    try{
        const {name} = req.query;
        const body = req.body;
        const updated = await service.update(name, body)
        res.json(updated)
    }catch(err){
        next(err)
    }
});

router.delete('/', (req, res, next)=>{
    try{
        const {name} = req.query;
        service.delete(name)
    }catch(err){
        next(err)
    };
});

module.exports= router