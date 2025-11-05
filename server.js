const  express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

db.prepare(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

const getAll = db.prepare('SELECT * FROM notes ORDER BY created_at DESC');
const getById = db.prepare('SELECT * FROM notes WHERE id = ?');
const insert = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
const update = db.prepare('UPDATE notes SET title = ?, content = ? WHERE id = ?');
const remove = db.prepare('DELETE FROM notes WHERE id = ?');

//routes
app.get('/api/notes', (req, res) =>res.json(getAll.all()));

app.get('/api/notes/:id',(req, res) => {
    const note = getById.get(req.params.id);
    if (!note) return  res.status(404).json({error: 'Not Found '});
    res.json(note);

});

app.post('/api/notes',(req, res) => {
    const {title, content} = req.body;
    if(!title || !content) return res.status(400).json({error:'Missing Fields'});
    const info = insert.run(title, content);
    res.status(201).json(getById.get(info.lastInsertRowid));

});

app.put('/api/notes/:id',(req, res) => {
    const {title, content} = req.body;
    const id = req.params.id;
    if(!title || !content)return res.status(400).json({error:'Missing Field'});
    const note = getById.get(id);
    if(!note)return res .status(404).json({error:'Not Found'});
    update.run(title, content, id);
    res.json(getById.get(id));
});

app.delete('/api/notes/:id',(req, res) => {
    const id = req.params.id;
    const note = getById.get(id);
    if(!note)return res.status(404).json({error:'Not Found'});
    remove.run(id);
    res.json({success: true});

});

app.listen(PORT,() => console.log(`Server running on http://localhost:${PORT}`));