const { response } = require("express");
const Bill = require("../models/bill");
const { billSaveService, billUpdateService } = require("../services/bill");

const billSave =  async(req, res = response)=>
{
    const {...data} = req.body;
    const resp = await billSaveService(data)
    res.status(201).json({
        resp,
        status: true
        });
}
const billUpdate = async(req, res = response)=>
{
    const {id} = req.params;
    const {name, value} = req.body;
    const resp = await billUpdateService(id, name, value)
    res.status(201).json({
        resp,
        status: true
        });
}
const billDelete = async(req, res = response)=>
{
    const {id} = req.params;
    const bill = await Bill.findById(id);
    if(!bill || bill.state ===false)
    {
        res.status(400).json({
            state: false,
            msg:'Error, registro con id incorrecto o inexistente',
            status: false
        });
    }
    const resp = await Bill.findByIdAndUpdate(id, {state:false}, {new:true});
    res.status(200).json({
        resp,
        status: true
    })
}
const billSearch = async(req, res = response)=>
{
    const {id} = req.params;
    const resp = await Bill.findById(id).populate('user');
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
const billAll = async(req, res = response)=>
{
    const query = {state : true}
    const resp = await Bill.find(query).populate('user');
    

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
    billSave,
    billUpdate,
    billDelete,
    billSearch,
    billAll
}