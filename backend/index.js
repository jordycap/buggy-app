import express from 'express';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TODOS_FILE = path.join(__dirname, 'todos.json');

function readTodos() {
	const data = fs.readFileSync(TODOS_FILE, 'utf8');
	return JSON.parse(data);
}
function writeTodos(todos) {
	fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}
// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = readTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read todos' });
  }
});

// Add a new todo
app.post('/api/todos', async(req, res) => {
	try{
		if(!req.body.title || typeof req.body.title !== 'string'){
			res.status(400).json({ error: 'Invalid title' });
			return;
		}
		const todos = await readTodos();
		const newTodo = {
			id: todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1,
			title: req.body.title,
			completed: false
		};
		todos.push(newTodo);
		writeTodos(todos);
		res.status(201).json(newTodo);
	} catch(err){
		res.status(500).json({ error: 'Failed to read todos' });
		return;
	}
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
	try{
		const todos = await readTodos();
		const id = parseInt(req.params.id);
		const idx = todos.findIndex(t => t.id === id);
		if (idx === -1) return res.status(404).json({ error: 'Todo not found' });
		todos[idx] = { ...todos[idx], ...req.body };
		writeTodos(todos);
		res.json(todos[idx]);
	} 
	catch(err){
		res.status(500).json({ error: 'Failed to update todo' });
		return;
	}
});
// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
	try{
		if(!req.params.id){
			res.status(400).json({ error: 'Invalid id' });
			return;
		}
		let todos = await readTodos();
		const id = parseInt(req.params.id);
		const idx = todos.findIndex(t => t.id === id);
		if (idx === -1) return res.status(400).json({ error: 'Invalid ID, todo not found' });
		const removed = todos.splice(idx, 1);
		writeTodos(todos);
		res.json(removed[0]);
	}
	catch(err){
		res.status(500).json({ error: 'Failed to delete todo' });
		return;
	}
});
app.listen(PORT, () => {
	console.log(`Mock backend running on http://localhost:${PORT}`);
});
