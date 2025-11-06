import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Add a note
app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  try {
    await pool.query("INSERT INTO notes (title, content) VALUES ($1, $2)", [title, content]);
    res.status(201).json({ message: "Note added" });
  } catch (err) {
    console.error("Error adding note:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM notes WHERE id = $1", [id]);
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
