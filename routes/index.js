const express= require('express')
const characterRouter= require('./characters.router');
const moviesRouter= require('./movies.router');
const authRouter = require('./auth.router')

function routerAPI(app){
    app.use('/characters', characterRouter);
    app.use('/movies', moviesRouter);
    app.use('/auth', authRouter)

}

module.exports=routerAPI