//Importing MySql and dontenv Modules
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

//Creating Connection Pool using Enviroment Variables in .env
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

//Async Functions to Handle Routes in app.js

async function createTask(id, task, created) {
    await pool.execute('INSERT INTO todo_tasks (Id, Task, Created) VALUES (?, ?, ?)', [id, task, created]);
}

async function getAllTasks() {
    const [comprows] = await pool.query('SELECT * FROM todo_tasks WHERE Completed = 1');
    const [notcomprows] = await pool.query('SELECT * FROM todo_tasks WHERE Completed = 0');
    rows = { "completed": comprows, "not_completed": notcomprows };
    return rows;
}

async function updateTask(id, completed) {
    await pool.execute('UPDATE todo_tasks SET Completed=? WHERE Id=?', [completed, id]);
}

async function deleteTask(id) {
    await pool.execute('DELETE FROM todo_tasks WHERE Id=?', [id]);
}

module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask
};
