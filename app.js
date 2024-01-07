//Importing Express and database.js
const express = require('express');
const db = require('./database');

const app = express();
const port = 8080;

//Middleware to parse JSON requests
app.use(express.json());

//Route for CREATE Operation
app.post('/tasks', async (req, res) => {
    try {
        const { id, task, created } = req.body;
        await db.createTask(id, task, created);
        res.json({ message: "Task Created Succesfully" });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error - Unable to Add Task' });
    }
});

//Route for READ Operation
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await db.getAllTasks();
        res.json(tasks);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error - Unable to Fetch Tasks' });
    }
});

//Route for UPDATE Operation
app.put('/tasks', async (req, res) => {
    try {
        const { id, completed } = req.body;
        await db.updateTask(id, completed);
        res.json({ message: "Updated Task Successfully" });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error - Unable to Update Tasks' });
    }
});

//Route for DELETE Operation
app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        await db.deleteTask(taskId);
        res.json({ message: 'Deleted Task Successfully' });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error - Unable to Delete Task' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/tasks`);
});
