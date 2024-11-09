const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

//Invocando al metodo crear usuario
router.post('/', userController.crearUsuario)

module.exports = router