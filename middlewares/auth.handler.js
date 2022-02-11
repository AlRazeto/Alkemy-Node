const boom = require('@hapi/boom');

function checkApikey(req,res,next) {
    const apiKey = req.headers['api'];
    if(apiKey=='123'){
        next()
    }else{
        throw boom.unauthorized()
    }
}