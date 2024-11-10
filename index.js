const express = require("express");
const conectarDB = require("./config/db");
const PORT = require("./config/global").port;
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/usuario");

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


conectarDB();

app.use(cors());
app.use(express.json());

// Rutas de servicio usuarios
app.use("/api/v1/usuario", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
