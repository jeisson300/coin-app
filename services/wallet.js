const Wallet = require("../models/wallet");

const walletSaveService = async(data)=>
{   
    const wallet = new Wallet(data);
     return await wallet.save();
}
const walletUpdateService = async(id, budget)=>
{   
     return await Wallet.findByIdAndUpdate(id, {budget} , {new:true});
}


module.exports = {
    walletSaveService,
    walletUpdateService
}