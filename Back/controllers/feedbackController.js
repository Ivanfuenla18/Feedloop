const Feedback = require("../models/feedbackModel");

// Controlador para obtener todos los feedbacks (GET)
// Nota: Aquí se añaden los parámetros 'req' y 'res'
exports.getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.getAllFeedback();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error en el controlador (getFeedback):", error);
    res.status(500).json({ message: "Error al obtener feedbacks." });
  }
};
