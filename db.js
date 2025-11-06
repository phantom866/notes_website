import pg from "pg";
const { Pool } = pg;

// Use your Render database connection string here 👇
const pool = new Pool({
  connectionString: "postgresql://notes_db_hxyd_user:IE0WlVOcxOcUfuMcPK2mLErx5oA8Zcmp@dpg-d46d28uuk2gs738rtef0-a.singapore-postgres.render.com/notes_db_hxyd",
  ssl: { rejectUnauthorized: false }
});

export default pool;
