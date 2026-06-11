const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/notes", (req, res) => {

  const sql = `
    SELECT *
    FROM notes
    ORDER BY tanggal_dibuat DESC
  `;

  db.query(
    {
      sql,
      timeout: 10000,
    },

    (err, results) => {

      if (err) {

        console.error(err);

        return res.status(500).json({
          message: "Failed to fetch notes",
        });
      }

      res.status(200).json(results);
    }
  );
});

router.get("/notes/:id", (req, res) => {

  const { id } = req.params;

  const sql = `
    SELECT *
    FROM notes
    WHERE id = ?
  `;

  db.query(
    {
      sql,
      values: [id],
      timeout: 10000,
    },

    (err, results) => {

      if (err) {

        console.error(err);

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
    }
  );
});

router.post("/notes", (req, res) => {

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

  db.query(
    {
      sql,
      values: [judul, isi],
      timeout: 10000,
    },

    (err, result) => {

      if (err) {

        console.error(err);

        return res.status(500).json({
          message: "Failed to create note",
        });
      }

      res.status(201).json({
        message: "Note created successfully",
        noteId: result.insertId,
      });
    }
  );
});

router.put("/notes/:id", (req, res) => {

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

  db.query(
    {
      sql,
      values: [judul, isi, id],
      timeout: 10000,
    },

    (err, result) => {

      if (err) {

        console.error(err);

        return res.status(500).json({
          message: "Failed to update note",
        });
      }

      res.status(200).json({
        message: "Note updated successfully",
      });
    }
  );
});

router.delete("/notes/:id", (req, res) => {

  const { id } = req.params;

  const sql =
    "DELETE FROM notes WHERE id = ?";

  db.query(
    {
      sql,
      values: [id],
      timeout: 10000,
    },

    (err, result) => {

      if (err) {

        console.error(err);

        return res.status(500).json({
          message: "Failed to delete note",
        });
      }

      res.status(200).json({
        message: "Note deleted successfully",
      });
    }
  );
});

module.exports = router;
