const db = require("../db/db"); // Importa tu conexión de base de datos

const Feedback = {};

Feedback.getAllFeedback = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from feedbacks";

    db.query(sql, (err, results) => {
      if (err) {
        return reject(err); // Rechaza la promesa si hay un error
      }
      resolve(results); // Resuelve la promesa con los resultados
    });
  });
};

module.exports = Feedback;
