const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

//Modelo de la BD de la tabla User
const userSchema = new Schema({
    names: String,
    email: String,
    password: String,
})

//Metodo para encriptar la contraseña
userSchema.methods.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hash(password, salt)
}

module.exports = model('User', userSchema)
