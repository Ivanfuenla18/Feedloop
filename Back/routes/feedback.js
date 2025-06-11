// routes/feedback.js
const express = require("express");
const router = express.Router(); // <--- ¡Asegúrate de que express.Router() se llama correctamente aquí!

const feedbackController = require("../controllers/feedbackController"); // Asegúrate de que la ruta sea correcta

// Ruta GET para obtener todos los feedbacks
router.get("/", feedbackController.getFeedback); // <--- ¡Asegúrate de que 'getFeedback' sea una función exportada por el controlador!

// Asegúrate de EXPORTAR el router al final del archivo
module.exports = router; // <--- ¡ESTO ES CRÍTICO!
