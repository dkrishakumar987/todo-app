# ToDo App Node.js API with Express and MySQL

This repository contains a simple Node.js API for a ToDo App built with Express and MySQL.
The API manages tasks with a MySQL database 'todo_app', with table 'todo_tasks' using the following schema:

## Database Schema

| Column    | Type         | Constraints           |
| --------- | ------------ | --------------------- |
| Id        | INT          | PRIMARY KEY, NOT NULL |
| Task      | VARCHAR(255) | NOT NULL              |
| Created   | DATE         | NOT NULL              |
| Completed | BOOLEAN      | DEFAULT 0, NOT NULL   |

## Prerequisites

Before you begin, make sure you have MySQL Server installed on your machine.

### Installing MySQL Server

1. Download and install MySQL Server from [MySQL Downloads](https://dev.mysql.com/downloads/).

### Database Setup

1. Open a terminal and log in to MySQL:

    ```bash
    mysql -u your_username -p
    ```

2. Run the SQL script to set up the schema:

    ```sql
    source path/to/dbsetup.sql;
    ```

    Replace `path/to/dbsetup.sql` with the actual path to the `dbsetup.sql` file.

### .env Environment Variables Configuration

1. Create a new file named `.env` in the root of the project.

2. Open the `.env` file and set the following variables:

    ```env
    DB_HOST='localhost'
    DB_USER='your_database_username'
    DB_PASSWORD='your_database_password'
    DB_DATABASE='todo_app'
    ```

    Replace `your_database_username` and `your_database_password` with your MySQL username and password.

## Running the API

1. Install dependencies:

    ```bash
    npm install express mysql2 dotenv express-validator ejs helmet
    ```

2. Start the server:

    ```bash
    node app.js
    ```

    The API will be running at `http://localhost:8080`.

## API Endpoints

-   `GET /tasks`: Retrieve all tasks in the format of {"completed" : [], "not_completed" : []}.
-   `POST /tasks`: Create a new task in the format of {"id" : 20919, "task" : "Test", "created" : "2024-01-06"}.
-   `PUT /tasks`: Update a task by ID in the format of {"id" : 20919, "completed" : 1}.
-   `DELETE /tasks/:id`: Delete a task by ID.

## EJS View Render

1. Go to `http://localhost:8080/todo`

2. The Tasks from `GET` Route will be displayed Separated into Completed and Not Completed
