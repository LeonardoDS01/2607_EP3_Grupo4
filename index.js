const express = require('express')
const conectarDB = require('./config/db')
const config = require('./config/global')
const cors = require('cors')

const app = express()

conectarDB()

app.use(cors())
app.use(express.json())

/************************************************************/
//Definiendo el endpoint donde se invocará el crearUsuario
app.use('/api/create-user',require('./routes/usuario'))





/************************************************************/
app.listen(config.port,()=>{
    console.log('El servidor corriendo en el servidor 3000')
})
