const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (like index.html)
app.use(express.static("public"));

// MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/api/totals", (req, res) => {
  const query = `
    SELECT name, SUM(price) AS total 
    FROM GS_Reg 
    GROUP BY name 
    ORDER BY total DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
