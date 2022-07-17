const { response } = require("express");
const User = require("../models/user");
const { saveUser } = require("../services/user");
const bcryptjs = require('bcryptjs');



const userPost = async (req, res = response) => {
    const { ...data } = req.body;
    const user = new User(data);
    const resp = await saveUser(user);
    resp ? res.status(201).json({
        msg: 'registro creado con exito',
        user,
        state: true
    }) :
        res.status(400).json({
            msg: 'ha ocurrido un error',
            state: false
        });
}

const userPut = async (req, res = response) => {
    const { id } = req.params;
    const { state, _id, password, ...data } = req.body;

    if (password) {

        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }

    const resp = await User.findByIdAndUpdate(id, data, { new: true });


    res.status(200).json({
        resp,
        msg: 'registro actualizado con exito',
        state: true
    });
}

const userDelete = async (req, res = response) => {
    const { id } = req.params;
    const resp = await User.findByIdAndUpdate(id, { state: false }, { new: true });
    res.status(200).json({
        resp,
        msg: 'registro eliminado con exito',
        state: true
    });
}



module.exports = {
    userPost,
    userPut,
    userDelete
}