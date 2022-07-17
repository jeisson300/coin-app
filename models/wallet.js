const { Schema, model } = require("mongoose");

const WalletSchema = Schema({

    budget: {
        type: String,
        require: [true, 'el presupuesto es obligatorio']
    },

    state: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Wallet', WalletSchema);