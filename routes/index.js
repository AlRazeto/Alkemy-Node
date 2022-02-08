const express= require('express')
const characterRouter= require('./characters.router');
const moviesRouter= require('./movies.router');

function routerAPI(app){
    app.use('/characters', characterRouter);
    app.use('/movies', moviesRouter);

}

module.exports=routerAPI