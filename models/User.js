const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const userSchema = Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.encryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password);
};

// Exportación del modelo User para poder utilizarlo en otros archivos.
module.exports = model("User", userSchema);
