//Importing Express and database.js
const express = require("express");
const db = require("./database");
const helmet = require("helmet");

const app = express();
const port = 8080;

//Middleware for Security using Helmet
app.use(helmet());

//Middleware for Input Validation
const { CreateTaskValid, UpdateTaskValid } = require("./validation");

//Middleware to parse JSON requests
app.use(express.json());

//Middleware to parse urlencoded requests
app.use(express.urlencoded({ extended: true }));

//Setting View Engine to ejs
app.set("view engine", "ejs");

//Error Handler for Catch Blocks of the Routes
const ErrorHandler = (error, text = "") => {
    console.error(error);
    res.status(500).json({
        error: "Internal Server Error" + text,
    });
};

//Route for CREATE Operation
app.post("/tasks", CreateTaskValid, async (req, res) => {
    try {
        const { id, task, created } = req.body;
        await db.createTask(id, task, created);
        res.json({ message: "Task Created Succesfully" });
    } catch (error) {
        ErrorHandler(error, " - Unable to Create Task");
    }
});

//Route for READ Operation
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await db.getAllTasks();
        res.json(tasks);
    } catch (error) {
        ErrorHandler(error, " - Unable to Read Tasks");
    }
});

//Route for rendering ejs view at/todo
app.get("/todo", async (req, res) => {
    try {
        const tasks = await db.getAllTasks();
        const comptasks = tasks.completed;
        const noncomptasks = tasks.not_completed;
        res.render("todo", { comptasks, noncomptasks });
    } catch (error) {
        ErrorHandler(error, " - Unable to Render View");
    }
});

//Route for UPDATE Operation
app.put("/tasks", UpdateTaskValid, async (req, res) => {
    try {
        const { id, completed } = req.body;
        await db.updateTask(id, completed);
        res.json({ message: "Updated Task Successfully" });
    } catch (error) {
        ErrorHandler(error, " - Unable to Update Task");
    }
});

//Route for DELETE Operation
app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        await db.deleteTask(taskId);
        res.json({ message: "Deleted Task Successfully" });
    } catch (error) {
        ErrorHandler(error, " - Unable to Delete Task");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/tasks`);
});
