const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  console.log("GET /api/notes");
  db.query(
    "SELECT * FROM notes ORDER BY tanggal_update DESC",
    (err, result) => {
      if (err) {
        console.error("GET /api/notes error", err);
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    },
  );
});

router.get("/:id", (req, res) => {
  console.log("GET /api/notes/", req.params.id);
  db.query("SELECT * FROM notes WHERE id=?", [req.params.id], (err, result) => {
    if (err) {
      console.error("GET /api/notes/:id error", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result[0]);
  });
});

router.post("/", (req, res) => {
  const { judul, isi } = req.body;
  console.log("POST /api/notes", { judul, isi });

  db.query(
    "INSERT INTO notes (judul, isi) VALUES (?,?)",
    [judul, isi],
    (err, result) => {
      if (err) {
        console.error("POST /api/notes error", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("POST /api/notes created", { insertId: result.insertId });
      res.status(201).json({ message: "created", id: result.insertId });
    },
  );
});

router.put("/:id", (req, res) => {
  const { judul, isi } = req.body;

  db.query(
    "UPDATE notes SET judul=?, isi=? WHERE id=?",
    [judul, isi, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "updated" });
    },
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM notes WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "deleted" });
  });
});

module.exports = router;
