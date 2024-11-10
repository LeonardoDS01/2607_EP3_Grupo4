const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/registrar", userController.registrar);

router.post("/acceder", userController.acceder);

module.exports = router;
