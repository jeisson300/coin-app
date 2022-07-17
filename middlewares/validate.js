const { validationResult}= require('express-validator');


const validateResult = (req, res, next)=>
{
     const errors = validationResult(req);
     return !errors.isEmpty()?res.json(errors):next();
}


module.exports= {
    validateResult
}