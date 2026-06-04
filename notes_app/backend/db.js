const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "34.172.113.167",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "mypassword",
  database: process.env.DB_NAME || "notes_app"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;