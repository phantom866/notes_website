import pool from "./db.js";

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Table created (if not exists)");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  } finally {
    process.exit();
  }
};

createTable();
