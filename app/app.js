const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

console.log(process.env.DB_HOST);

const app = express();
app.use(express.json());

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const initDatabase = () => {
  connection.query("SELECT 1", (err) => {
    if (err) {
      console.log("Database belum ready, retry 3 detik lagi ....", err.message);
      setTimeout(initDatabase, 3000);
      return;
    }

    console.log("Database connected");

    connection.query(
      `CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(100) NOT NULL,
        kelas VARCHAR(100) NOT NULL
      )`,
    );
  });
};

initDatabase();

app.get("/", (req, res) => {
  res.send("Backend Docker Running");
});

// Mendapatkan semua pengguna
app.get("/users", (req, res) => {
  connection.query("SELECT id, name, kelas FROM users", (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Menambahkan pengguna baru
app.post("/users", (req, res) => {
  const { name, kelas } = req.body;
  connection.query(
    "INSERT INTO users (name, kelas) VALUES (?, ?)",
    [name, kelas],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, name, kelas });
    },
  );
});

// Memperbarui pengguna berdasarkan ID
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, kelas } = req.body;
  connection.query(
    "UPDATE users SET name = ?, kelas = ? WHERE id = ?",
    [name, kelas, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ id: parseInt(id), name, kelas });
    },
  );
});

// DELETE pengguna berdasarkan ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not foundd" });
    }
    res.status(204).send(); // No Content
  });
});

app.listen(process.env.APP_PORT, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
