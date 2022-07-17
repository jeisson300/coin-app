const { response } = require("express");
const { validateLogin } = require("../services/auth");

const login = async(req, res = response)=>
{
    const {email, password} = req.body;
    const user = await validateLogin(email, password);
    if(!user){
        res.status(401).json({
            msg:'Credenciales incorrectas',
            state: false
        });
    }

    res.json({
        msg: 'logueado',
        user,
        state: true
    });
}


module.exports = {
    login
}