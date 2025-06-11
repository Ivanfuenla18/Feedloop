// models/userModel.js
const db = require("../db"); // Importa tu conexión de base de datos

const User = {}; // Este es tu objeto "Modelo"

// Método para obtener todos los usuarios (GET)
// Nota: convertimos el callback de db.query a una Promesa para poder usar async/await en el controlador
User.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users"; // Asumo que tu tabla se llama 'users', no 'user'
    db.query(sql, (err, results) => {
      if (err) {
        return reject(err); // Rechaza la promesa si hay un error
      }
      resolve(results); // Resuelve la promesa con los resultados
    });
  });
};

User.createUser = (userData) => {
  return new Promise((resolve, reject) => {
    // 1. Primero, verifica si el correo ya existe
    const checkEmailSql = "SELECT * FROM users WHERE correo = ?";
    db.query(checkEmailSql, [userData.correo], (err, results) => {
      if (err) {
        // Error en la consulta de verificación
        console.error("Error al verificar el correo:", err);
        return reject(err);
      }

      if (results.length > 0) {
        // El correo ya está en uso, no podemos crear el usuario
        console.log("Correo ya en uso:", userData.correo);
        // Rechaza con un error específico para el cliente
        return reject(new Error("El correo electrónico ya está registrado."));
      }

      // 2. Si el correo no existe, procede con la inserción
      const insertUserSql =
        "INSERT INTO `feedloop`.`users` (`nombre`, `correo`, `contraseña`) VALUES (?, ?, ?);";
      db.query(
        insertUserSql,
        [userData.nombre, userData.correo, userData.contraseña],
        (err, insertResults) => {
          if (err) {
            // Error al insertar el usuario
            console.error("Error al crear usuario:", err);
            return reject(err);
          }
          // Éxito: el usuario fue creado
          resolve(insertResults);
        }
      );
    });
  });
};

User.findByEmail = (correo) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT id, nombre, correo, contraseña FROM users WHERE correo = ?"; // Asegúrate de seleccionar la contraseña hasheada
    db.query(sql, [correo], (err, results) => {
      if (err) {
        console.error("Error al buscar usuario por correo:", err);
        return reject(err);
      }
      // Si encuentra un usuario, devuelve el primero (debería ser único)
      // Si no encuentra ninguno, results estará vacío, y devolverá undefined
      resolve(results[0]);
    });
  });
};

module.exports = User; // Exporta tu objeto modelo de usuario
