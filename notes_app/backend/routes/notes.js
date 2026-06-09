const express = require("express");
const router = express.Router();

const db = require("../db");


// ======================
// GET ALL NOTES
// ======================

router.get("/", (req, res) => {

  console.log("GET NOTES HIT");

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

        console.error(
          "GET NOTES ERROR:",
          err
        );

        return res.status(500).json({
          message:
            "Failed to fetch notes",
        });
      }

      res.status(200).json(results);
    }
  );
});


// ======================
// CREATE NOTE
// ======================

router.post("/", (req, res) => {

  console.log("POST NOTE HIT");

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

        console.error(
          "CREATE NOTE ERROR:",
          err
        );

        return res.status(500).json({
          message:
            "Failed to create note",
        });
      }

      res.status(201).json({
        message:
          "Note created successfully",
        noteId: result.insertId,
      });
    }
  );
});


// ======================
// DELETE NOTE
// ======================

router.delete("/:id", (req, res) => {

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

        console.error(
          "DELETE NOTE ERROR:",
          err
        );

        return res.status(500).json({
          message:
            "Failed to delete note",
        });
      }

      res.status(200).json({
        message:
          "Note deleted successfully",
      });
    }
  );
});

module.exports = router;
