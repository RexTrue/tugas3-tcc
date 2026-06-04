const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM notes ORDER BY tanggal_update DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    },
  );
});

router.get("/:id", (req, res) => {
  db.query("SELECT * FROM notes WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

router.post("/", (req, res) => {
  const { judul, isi } = req.body;

  db.query(
    "INSERT INTO notes (judul, isi) VALUES (?,?)",
    [judul, isi],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "created" });
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
