const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.registrar = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log("Registro de usuario:", fullName, email, password);
  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};
exports.acceder = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos por su correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña proporcionada con la encriptada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Confirmar login exitoso sin tokenización (según lo solicitado)
    res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error en el login", error });
  }
};
