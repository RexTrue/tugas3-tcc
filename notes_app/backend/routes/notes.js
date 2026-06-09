const express = require("express");
const router = express.Router();

const db = require("../db");


// ======================
// GET ALL NOTES
// ======================

router.get("/", (req, res) => {

  const sql = `
    SELECT *
    FROM notes
    ORDER BY tanggal_dibuat DESC
  `;

  db.query(sql, (err, results) => {

    if (err) {

      console.error("GET NOTES ERROR:", err);

      return res.status(500).json({
        message: "Failed to fetch notes",
      });
    }

    res.status(200).json(results);
  });
});


// ======================
// GET NOTE BY ID
// ======================

router.get("/:id", (req, res) => {

  const { id } = req.params;

  const sql =
    "SELECT * FROM notes WHERE id = ?";

  db.query(sql, [id], (err, results) => {

    if (err) {

      console.error("GET NOTE ERROR:", err);

      return res.status(500).json({
        message: "Failed to fetch note",
      });
    }

    if (results.length === 0) {

      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json(results[0]);
  });
});


// ======================
// CREATE NOTE
// ======================

router.post("/", (req, res) => {

  const { judul, isi } = req.body;

  if (!judul || !isi) {

    return res.status(400).json({
      message: "Judul dan isi wajib diisi",
    });
  }

  const sql = `
    INSERT INTO notes (judul, isi)
    VALUES (?, ?)
  `;

  db.query(sql, [judul, isi], (err, result) => {

    if (err) {

      console.error("CREATE NOTE ERROR:", err);

      return res.status(500).json({
        message: "Failed to create note",
      });
    }

    res.status(201).json({
      message: "Note created successfully",
      noteId: result.insertId,
    });
  });
});


// ======================
// UPDATE NOTE
// ======================

router.put("/:id", (req, res) => {

  const { id } = req.params;

  const { judul, isi } = req.body;

  if (!judul || !isi) {

    return res.status(400).json({
      message: "Judul dan isi wajib diisi",
    });
  }

  const sql = `
    UPDATE notes
    SET judul = ?, isi = ?
    WHERE id = ?
  `;

  db.query(sql, [judul, isi, id], (err, result) => {

    if (err) {

      console.error("UPDATE NOTE ERROR:", err);

      return res.status(500).json({
        message: "Failed to update note",
      });
    }

    res.status(200).json({
      message: "Note updated successfully",
    });
  });
});


// ======================
// DELETE NOTE
// ======================

router.delete("/:id", (req, res) => {

  const { id } = req.params;

  const sql =
    "DELETE FROM notes WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {

      console.error("DELETE NOTE ERROR:", err);

      return res.status(500).json({
        message: "Failed to delete note",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully",
    });
  });
});

module.exports = router;
