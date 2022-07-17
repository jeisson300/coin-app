const Income = require("../models/income");

const incomeSaveService = async(data)=>
{   
    const income = new income(data);
     return await income.save();
}
const incomeUpdateService = async(id, name, value)=>
{   
     return await Income.findByIdAndUpdate(id, {name, value} , {new:true});
}


module.exports = {
    incomeSaveService,
    incomeUpdateService
}