const User = require("../models/userModel"); // Importa tu modelo de usuario
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Para generar tokens (¡Necesitarás instalarlo!)
const JWT_SECRET = "tu_super_clave_secreta_jwt"; // <-- CÁMBIALA por una cadena larga y aleatoria

// Controlador para obtener todos los usuarios (GET)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers(); // Llama al método del modelo (devuelve una promesa)
    res.status(200).json(users); // Envía los resultados como JSON con status 200 OK
  } catch (error) {
    console.error("Error en el controlador (getUsers):", error);
    res.status(500).json({ message: "Error al obtener usuarios." });
  }
};

exports.createUser = async (req, res) => {
  // 'req' es la petición, 'res' es la respuesta
  try {
    // 1. Obtener los datos del cuerpo de la petición (JSON, form-data, etc.)
    //    Por ejemplo, si esperas nombre, correo y contraseña:
    const { nombre, correo, contraseña } = req.body;

    // 2. Realizar validaciones básicas de los datos (¡IMPORTANTE!)
    //    Si faltan campos esenciales, detén la operación y envía un error al cliente.
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({
        message:
          "Faltan campos obligatorios: nombre, correo y contraseña son necesarios.",
      });
    }

    // 3. Opcional pero ALTAMENTE RECOMENDADO: Hashear la contraseña aquí (si es un usuario)
    //    Si ya lo haces en el modelo, omite esto, pero es mejor hacerlo en el controlador.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
    const dataToInsert = { nombre, correo, contraseña: hashedPassword };

    // 4. Llamar a la función de tu Modelo para insertar los datos
    //    El 'await' es crucial porque la función del modelo devuelve una Promesa.
    const result = await User.createUser(dataToInsert);

    // 5. Enviar una respuesta de éxito al cliente
    //    Un código 201 Created es estándar para inserciones exitosas.
    res.status(201).json({
      message: "Elemento creado exitosamente",
      id: result.insertId, // 'insertId' es común para el ID del nuevo registro en MySQL
    });
  } catch (error) {
    // 6. Manejar los errores
    //    Aquí puedes capturar errores específicos que tu modelo pueda lanzar (ej. correo duplicado)
    if (error.message === "El correo electrónico ya está registrado.") {
      return res.status(409).json({ message: error.message }); // 409 Conflict: el recurso ya existe
    }

    //    Para cualquier otro error inesperado, loguéalo y envía un error genérico 500
    console.error("Error en el controlador al crear el elemento:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // 1. Validar los datos de entrada
    if (!correo || !contraseña) {
      return res
        .status(400)
        .json({ message: "Correo y contraseña son obligatorios." });
    }

    // 2. Buscar al usuario por correo en la base de datos
    const user = await User.findByEmail(correo); // <-- NECESITARÁS AÑADIR ESTA FUNCIÓN A userModel.js

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas." }); // Usuario no encontrado
    }

    // 3. Comparar la contraseña proporcionada con la contraseña hasheada en la BD
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);

    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas." }); // Contraseña incorrecta
    }

    // 4. Si las credenciales son válidas, generar un token JWT
    const token = jwt.sign(
      { id: user.id, correo: user.correo }, // Payload del token: qué información quieres guardar
      JWT_SECRET,
      { expiresIn: "1h" } // El token expira en 1 hora
    );

    // 5. Enviar respuesta de éxito con el token y, opcionalmente, datos del usuario
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token, // El token JWT
      user: {
        // Información del usuario (sin la contraseña hasheada)
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
      },
    });
  } catch (error) {
    console.error("Error en el controlador de login:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor al iniciar sesión." });
  }
};
