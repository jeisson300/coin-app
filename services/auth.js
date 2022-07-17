const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const validateLogin = async (email, password) => {
    const user = await User.findOne({ email });
  
    if (!user || !user.state) {
      
        return false;
    }
    
    const passwordVerify = bcryptjs.compareSync(password, user.password);
    if (!passwordVerify) {
        return false;
    }

    return await crearToken(user);
}

const crearToken = async ({ _id: uid }) => {

    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, { expiresIn: '1h' }, (error, token) => {
            if (error) {
                console.log(error)
                reject('No se pudo generar token');
            }
            resolve(token);
        });
    });
}

module.exports = {
    validateLogin
}