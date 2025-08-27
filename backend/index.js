const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
const TODOS_FILE = path.join(__dirname, 'todos.json');

function readTodos() {
	const data = fs.readFileSync(TODOS_FILE, 'utf8');
	return JSON.parse(data);
}
function writeTodos(todos) {
	fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}
// Get all todos
app.get('/api/todos', (req, res) => {
	res.json(readTodos())
});
// Add a new todo
app.post('/api/todos', (req, res) => {
	const todos = readTodos();
	const newTodo = {
		id: todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1,
		title: req.body.title,
		completed: false
	};
	todos.push(newTodo);
	writeTodos(todos);
	res.status(201).json(newTodo);
});
// Update a todo
app.put('/api/todos/:id', (req, res) => {
	const todos = readTodos();
	const id = parseInt(req.params.id);
	const idx = todos.findIndex(t => t.id === id);
	if (idx === -1) return res.status(404).json({ error: 'Todo not found' });
	todos[idx] = { ...todos[idx], ...req.body };
	writeTodos(todos);
	res.json(todos[idx]);
});
// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
	let todos = readTodos();
	const id = parseInt(req.params.id);
	const idx = todos.findIndex(t => t.id === id);
	if (idx === -1) return res.status(404).json({ error: 'Todo not found' });
	const removed = todos.splice(idx, 1);
	writeTodos(todos);
	res.json(removed[0]);
});
app.listen(PORT, () => {
	console.log(`Mock backend running on http://localhost:${PORT}`);
});
