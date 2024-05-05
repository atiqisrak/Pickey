const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Routes
// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description, completed = false } = req.body;
    // description and completed are the columns in the todo table
    const newTodo = await pool.query(
      "INSERT INTO todo (description, completed) VALUES($1, $2) RETURNING *",
      [description, completed]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3",
      [description, completed, id]
    );
    res.json("Todo was updated!");
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(4001, () => {
  console.log("Server is running on port 4001");
});
