const mysql = require("mysql2");

// Creamos la conexión con la bbdd
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "feedloop",
});

// Comprobamos la conexión
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    // Es crucial que el proceso salga si la conexión falla en un entorno real
    // process.exit(1);
    return; // Para desarrollo, un return puede ser suficiente
  }
  console.log("Connected to database as id " + db.threadId);
});

// Exportamos el objeto de conexión 'db' para que pueda ser usado en otros archivos
module.exports = db;
