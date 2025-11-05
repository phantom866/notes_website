//npm run init.jb
const db = require('./db');
db.exec(`CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`);
const insert = db.prepare(`INSERT INTO NOTES(title,content) VALUES(?,?)`);
insert.run('Welcome', 'This is your first notes in the app.');
insert.run('Second Note', 'You can add or edit notes in the app.');

console.log( 'Database Initialized Succesfully.' );