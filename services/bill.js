const Bill = require("../models/bill");

const billSaveService = async(data)=>
{   
    const bill = new Bill(data);
     return await bill.save();
}
const billUpdateService = async(id, name, value)=>
{   
     return await Bill.findByIdAndUpdate(id, {name, value} , {new:true});
}


module.exports = {
    billSaveService,
    billUpdateService
}