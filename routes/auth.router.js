const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken')
const {config} = require('./../config/config')
const UserServices = require('./../services/user.services')

const router = express.Router();
const service = new UserServices

router.post('/login',
passport.authenticate('local' , {session:false}),
(req,res,next)=>{
    try {
        const user = req.user;
        const payload = {
          sub: user.email,
        }
        const token = jwt.sign(payload, config.jwtSecret);
        res.json({
          user,
          token
        });
    } catch (error) {
        next(error)
    };
})

router.post('/register',async(req,res,next)=>{
    try {
        const body= req.body;
        const newUser=await service.create(body)
        if(newUser){
            console.log(newUser.email);
            service.sendmail(newUser.email)
        }
        res.status(201).json(newUser);
    } catch (error) {
        next(error)
    };
});

module.exports= router