const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const saveUser = async({password, email, name, state, _id})=>
{   
   
    const resp = await User.findOne({email});
    if(resp){
        return false;
    }
    
    const user = new User( {password, email, name, state, _id} );
    
   
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    return true;
}



module.exports = {
    saveUser
}