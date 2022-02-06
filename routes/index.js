const express= require('express')
const characterRouter= require('./characters.router');

function routerAPI(app){
    app.use('/characters', characterRouter);
}

module.exports=routerAPI