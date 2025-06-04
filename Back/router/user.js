const express = require("express"); // Necesitas importar express aquí también
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Error fetching users." });
    }
    res.json(results);
  });
});

module.exports = router;
