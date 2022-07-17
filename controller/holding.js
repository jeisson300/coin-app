const { response } = require("express");
const Holding = require("../models/holding");
const { holdingSaveService, holdingUpdateService } = require("../services/holding");

const holdingSave =  async(req, res = response)=>
{
    const {...data} = req.body;
    const resp = await holdingSaveService(data)
    res.status(201).json({
        resp,
        status: true
        });
}
const holdingUpdate = async(req, res = response)=>
{
    const {id} = req.params;
    const {user, state, ...data} = req.body;
    const resp = await holdingUpdateService(id, data)
    res.status(201).json({
        resp,
        status: true
        });
}
const holdingDelete = async(req, res = response)=>
{
    const {id} = req.params;
    const holding = await Holding.findById(id);
    if(!holding || holding.state ===false)
    {
        res.status(400).json({
            state: false,
            msg:'Error, registro con id incorrecto o inexistente',
            status: false
        });
    }
    const resp = await holding.findByIdAndUpdate(id, {state:false}, {new:true});
    res.status(200).json({
        resp,
        status: true
    })
}
const holdingSearch = async(req, res = response)=>
{
    const {id} = req.params;
    const resp = await Holding.findById(id).populate('user');
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
const holdingAll = async(req, res = response)=>
{
    const query = {state : true}
    const resp = await Holding.find(query).populate('user');
    

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
    holdingSave,
    holdingUpdate,
    holdingDelete,
    holdingSearch,
    holdingAll
}