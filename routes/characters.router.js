const express = require('express');
const Service = require('./../services/characters.services');

const router = express.Router();
const service = new Service();

router.get('/',async (req,res)=>{
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
    }
    else{
        const rta= await service.getAll()
        res.json(rta);
    };
});

router.post('/',(req,res)=>{
    const body = req.body;
    service.create(body)
    //codigo
});

router.patch('/:name',(req,res)=>{
    const {name}= req.params;
    const body = req.body;
    service.update(name, body);
    //codigo
});

router.put('/:name',(req,res)=>{
    const {name}= req.params;
    const body = req.body;
    service.update(name, body);
    //codigo
});

router.delete('/:name',(req,res)=>{
    const {name} = req.params;
    service.delete(name);
    //codigo
});

module.exports = router