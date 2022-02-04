const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    const {age, movies, name}= req.query
})

router.put('/',(req,res)=>{
    //codigo
})

router.patch('/',(req,res)=>{
    //codigo
})

router.post('/',(req,res)=>{
    //codigo
})

router.delete('/',(req,res)=>{
    //codigo
})

module.exports = router