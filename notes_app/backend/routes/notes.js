const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM notes ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("GET NOTES ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch notes",
      });
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM notes WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("GET NOTE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch note",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: results[0],
    });
  });
});

router.post("/", (req, res) => {
  const { judul, isi } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    });
  }

  const sql =
    "INSERT INTO notes (title, content) VALUES (?, ?)";

  db.query(sql, [title, content], (err, result) => {
    if (err) {
      console.error("CREATE NOTE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to create note",
      });
    }

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      noteId: result.insertId,
    });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    });
  }

  const sql =
    "UPDATE notes SET title = ?, content = ? WHERE id = ?";

  db.query(sql, [title, content, id], (err, result) => {
    if (err) {
      console.error("UPDATE NOTE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to update note",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
    });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM notes WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("DELETE NOTE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete note",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  });
});

module.exports = router;
