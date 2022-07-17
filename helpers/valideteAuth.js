const User = require("../models/user")


const isExistsEmail = async(email = '') =>
{
    const user = await User.findOne({email});
    if(!user){
        throw new Error(`el correo ${email} no se encuentra en uso`);
    }
}



module.exports = {
    isExistsEmail
}