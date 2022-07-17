const { Schema, model } = require("mongoose");

const HoldingSchema = Schema({


    name:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    rate: {
        type: Number,
        require: [true, 'La tasa es obligatorio']
    },
    date: {
        type: Date,
        require: [ true, 'la fecha es obligatoria']
    },
    value: {
        type: Number,
        require: [true, 'El valor es obligatorio']
    },
    state: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});


module.exports = model('Holding', HoldingSchema);