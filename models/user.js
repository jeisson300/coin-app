const { Schema, model } = require("mongoose");

const UserSchema = Schema({

    name: {
        type:String,
        require: [true, 'El nombre es obligatorio']
    },

    email: {
        type: String,
        require: [true, 'El correo es obligatorio']
    },

    password: {
        type: String,
        require: [true, 'El password es obligatorio']
    },

    state: {
        type: Boolean,
        default: true
    },
    wallet: {
        type:Schema.Types.ObjectId,
        ref:'Wallet',
        require: true
    }
});



module.exports = model('User', UserSchema);