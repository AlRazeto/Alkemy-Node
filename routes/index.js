const characterRouter= require('./characters.router');

function routerAPI(app){
    app.use('/characters', characterRouter);
}