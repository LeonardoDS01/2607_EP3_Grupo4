const mongoose = require("mongoose");

const conectarDB = async () => {


  mongoose
    .connect('mongodb://localhost:27017/usuario', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Conexión a MongoDB establecida"))
    .catch((err) => console.error("Error al conectar a MongoDB:", err));
};

module.exports = conectarDB;
