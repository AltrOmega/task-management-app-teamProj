// In a real app, this data would live in a database,
// rather than in memory. But for now, we cheat.
import Todo from '$lib/stores/task.svelte.js';
const db = new Map();

export function getTodos(userid) {

	// creates a sample if id does not exist
	if (!db.get(userid)) {
		sample_init(userid);
	}
	let todos = db.get(userid);
	let out = [];
	for (let i=0; i<todos.length; i++) {
		out.push(Todo.deserialise(todos[i]))
	}
	return out;
}

export function sample_init(userid) {
	db.set(userid, [{
		id: crypto.randomUUID(),
		title: "Title",
		date: "Date",
		content: "Content",
		isCompleted: false,
	}]);
}

export function setup_user(userid) {
	db.set(userid, []);
}

export function createTodo(userid, title, date, content, isCompleted) {
	if (!db.get(userid)) {
		setup_user(userid)
	}
	const todos = db.get(userid);

	todos.push({
		id: crypto.randomUUID(),
		title,
		date,
		content,
		isCompleted
	});
}

export function deleteTodo(userid, todoid) {
	const todos = db.get(userid);
	const index = todos.findIndex((todo) => todo.id === todoid);

	if (index !== -1) {
		todos.splice(index, 1);
	}
}
