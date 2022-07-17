const User = require("../models/user")


const isExistsEmailUser = async(email = '') =>
{
    const user = await User.findOne({email});
    if(user){
        throw new Error(`el correo ${email} se encuentra en uso`);
    }
}



module.exports = {
    isExistsEmailUser
}