const mongoose = require("mongoose")

const db = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Conexion a la bd exitosamente!');

    } catch (err) {
        console.log(err);
        throw new Error ('Erro en la conexion a la bd!');
    }
}

module.exports = db