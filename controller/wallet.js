const { response } = require("express");
const Wallet = require("../models/income");
const { walletSaveService, walletUpdateService } = require("../services/wallet");

const walletSave =  async(req, res = response)=>
{
    const {...data} = req.body;
    const resp = await walletSaveService(data)
    res.status(201).json({
        resp,
        status: true
        });
}
const walletUpdate = async(req, res = response)=>
{
    const {id} = req.params;
    const {budget} = req.body;
    const resp = await walletUpdateService(id, budget)
    res.status(201).json({
        resp,
        status: true
        });
}
const walletDelete = async(req, res = response)=>
{
    const {id} = req.params;
    const wallet = await Wallet.findById(id);
    if(!wallet || wallet.state ===false)
    {
        res.status(400).json({
            state: false,
            msg:'Error, registro con id incorrecto o inexistente',
            status: false
        });
    }
    const resp = await Wallet.findByIdAndUpdate(id, {state:false}, {new:true});
    res.status(200).json({
        resp,
        status: true
    })
}
const walletSearch = async(req, res = response)=>
{
    const {id} = req.params;
    const resp = await Wallet.findById(id);
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
const walletAll = async(req, res = response)=>
{
    const query = {state : true}
    const resp = await Wallet.find(query);
    

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
    walletSave,
    walletUpdate,
    walletDelete,
    walletSearch,
    walletAll
}