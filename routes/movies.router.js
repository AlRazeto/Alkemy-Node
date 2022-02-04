const express = require('express');

const router = express.Router();

router.get('/', (req, res)=>{
    const {order} = req.query
    //code
})

router.get('/', (req, res)=>{
    const {name, genre}= req.query
    //code
})

router.post('/', (req, res)=>{
    const {order} = req.query
    //code
})

router.put('/', (req, res)=>{
    const {order} = req.query
    //code
})

router.patch('/', (req, res)=>{
    const {order} = req.query
    //code
})

router.delete('/', (req, res)=>{
    const {order} = req.query
    //code
})