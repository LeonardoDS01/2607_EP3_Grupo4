const jwt = require('jsonwebtoken')

const User = require('../models/User')
const config = require('../config/global')

//Funcion para Crear un usuario
exports.crearUsuario = async (req, res) => {
    try {

        const {names, email, password} = req.body
        const user = new User({
            names,
            email,
            password
        })

        //validar campos vacios
        if(!names || !email || !password) return res.status(400).json({auth:false, statusCode: 400, message:"Todos los campos son obligatorios"})
        //validar formato email
        if(!config.emailRegex.test(email)) return res.status(400).json({auth:false, statusCode: 400, message:"Formato de email no válido"})


        //encriptar password
        user.password = await user.encryptPassword(user.password)
        await user.save()
        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: config.time24h
        })

        res.json({auth: true, statusCode: 200, message:config.messageCode200, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({auth:false, statusCode: 500, message:config.messageCode500})
    }
}

//Funcion - Validación de usuario por contraseña

exports.obtenerUsurio = async (req,res)=>{
    try {
        const{ email, password} = req.body
        const user = await User.findOne({email:email})

        //Validar usuario
        if(!user) return res.status(404).json({auth:false, statusCode: 404, message:"usuario no existe o incorrecto"})
        //Validar password
        const validatePassword = await user.validatePassword(password)
        if(!validatePassword) return res.status(401).json({auth:false, statusCode: 401, message:"password incorrecta"})

        const token = jwt.sign({id:user._id},config.secret,{
            expiresIn: config.time24h
        })

        res.json({auth:true, statusCode: 200, message:config.messageCode200,token})
    } catch (error) {
        console.log(error)
        res.status(500).json({auth:false, statusCode: 500, message:config.messageCode500})
    }
}