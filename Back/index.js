// index.js
const express = require("express");
const cors = require("cors");
const db = require("./db"); // Asegúrate de que esta conexión a la BD esté funcionando
const userRoutes = require("./routes/user");
const feedbackRouter = require("./routes/feedback"); // Nombre más consistente con el router

const app = express();
const port = 3000;

app.use(express.json()); // Middleware para parsear JSON (¡Necesario para POST!)
app.use(cors()); // Middleware para habilitar CORS (importante para el frontend)

// Montar tus routers
app.use("/api/user", userRoutes);
app.use("/api/feedback", feedbackRouter); // Prefijo /api/feedback

// Ruta de prueba base para el servidor
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(
    `API GET de usuarios accesible en http://localhost:${port}/api/user`
  );
  // ¡Aquí está la corrección! Cambia ´ por `
  console.log(
    `API GET de feedback accesible en http://localhost:${port}/api/feedback`
  );
});
