// routes/user.js
const express = require("express");
const router = express.Router(); // Correcto: usa express.Router()

const userController = require("../controllers/userController"); // Importa tu controlador

// Ruta GET para obtener todos los usuarios
router.get("/", userController.getUsers); // Llama a la función del controlador

// Ruta POST para crear un nuevo usuario
router.post("/", userController.createUser); // Llama a la función del controlador para crear

router.post("/login", userController.login);

module.exports = router; // Exporta el router para que app.js (o tu archivo principal) lo use
