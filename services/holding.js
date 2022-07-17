const Holding = require("../models/holding");

const holdingSaveService = async(data)=>
{   
    const holding = new Holding(data);
     return await holding.save();
}
const holdingUpdateService = async({id, ...data})=>
{   
     return await Holding.findByIdAndUpdate(id, data , {new:true});
}


module.exports = {
    holdingSaveService,
    holdingUpdateService
}