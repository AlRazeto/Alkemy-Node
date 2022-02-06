const boom = require('@hapi/boom')

function validatorMiddleware(schema){
    return (req,res, next)=>{
        const error = schema.validate(req.body);
        if (error){
            next(boom.badRequest(error));
        };
        next();
    };
};

module.exports= validatorMiddleware