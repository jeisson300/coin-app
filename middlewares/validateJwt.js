const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJwt = async (req, res = response, next) => {
    try {
        const token = req.header('x-token');
        if (!token) {
            res.status(401).json({
                msg: 'No autorizado, token incorrecto'
            });
        }
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        req.userAuth = user;
        req.uid = uid;
        next();
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    validateJwt
}