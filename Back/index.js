/* -- Declaracion de variables -- */
const express = require("express");
const cors = require("cors");
const router = require("./router/user");

const app = express();
const port = 3000;

/* -- Middleware para usar jsons y cors -- */

app.use(express.json());
app.use(cors());

/* -- Hacemos la llamada a la bdd de los usuarios -- */

app.use("/api/user", router);

/* -- EJecutamos el server --*/

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
