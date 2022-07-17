const { Schema, model } = require("mongoose");

const BillSchema  = Schema({


    name: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
    },
    value: {
        type:Number,
        require: [true, 'El valor es obligatorio']
    },
    state:{
        type:Boolean,
        default: true
    },
    user: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        require: true 
    }
});

module.exports = model('Bill', BillSchema);