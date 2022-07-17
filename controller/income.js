const { response } = require("express");
const Income = require("../models/income");
const { incomeSaveService, incomeUpdateService } = require("../services/income");

const incomeSave =  async(req, res = response)=>
{
    const {...data} = req.body;
    const resp = await incomeSaveService(data)
    res.status(201).json({
        resp,
        status: true
        });
}
const incomeUpdate = async(req, res = response)=>
{
    const {id} = req.params;
    const {name, value} = req.body;
    const resp = await incomeUpdateService(id, name, value)
    res.status(201).json({
        resp,
        status: true
        });
}
const incomeDelete = async(req, res = response)=>
{
    const {id} = req.params;
    const income = await Income.findById(id);
    if(!income || income.state ===false)
    {
        res.status(400).json({
            state: false,
            msg:'Error, registro con id incorrecto o inexistente',
            status: false
        });
    }
    const resp = await Income.findByIdAndUpdate(id, {state:false}, {new:true});
    res.status(200).json({
        resp,
        status: true
    })
}
const incomeSearch = async(req, res = response)=>
{
    const {id} = req.params;
    const resp = await Income.findById(id).populate('user');
    if(!resp || resp.state ===false)
    {
        res.status(400).json({
            msg:'Error, el registro con id incorrecto o inexistente',
            status: false
        });
    }
    res.json({
        resp,
        status:true
    });
    
}
const incomeAll = async(req, res = response)=>
{
    const query = {state : true}
    const resp = await Income.find(query).populate('user');
    

    if(!resp)
    {
        res.status(400).json({
            msg:'No existen registros',
            status: false
        });
    }

    res.json({
        resp,
        status:true
    });
}


module.exports = {
    incomeSave,
    incomeUpdate,
    incomeDelete,
    incomeSearch,
    incomeAll
}