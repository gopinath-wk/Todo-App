import { Request, Response } from "express";
import { Todo } from "../models/Todo";

import fs from "fs";
import path from "path";
// Path to JSON file
const dataPath = path.resolve("data/todo.json");

// Helper to read todos
const readTodos = (): Todo[] => {
  try {
    const raw = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(raw) as Todo[];
  } catch (error) {
    console.error("Error reading todos:", error);
    return [];
  }
};

// Helper to write todos
const writeTodos = (todos: Todo[]): void => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error("Error writing todos:", error);
    throw new Error("Failed to save todos");
  }
};

// Get all todos
export const getTodos = (req: Request, res: Response) => {
  try {
    const todos = readTodos();
    res.json(todos);
  } catch (error) {
    console.error("Error getting todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new todo
export const addTodo = (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Todo text is required" });
    }
    
    const todos = readTodos();
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false
    };
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Toggle completed
export const toggleTodo = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }
    
    const todos = readTodos();
    const todo = todos.find(t => t.id === id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    
    todo.completed = !todo.completed;
    writeTodos(todos);
    res.json(todo);
  } catch (error) {
    console.error("Error toggling todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete todo
export const deleteTodo = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }
    
    let todos = readTodos();
    const initialLength = todos.length;
    todos = todos.filter(t => t.id !== id);
    
    if (todos.length === initialLength) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
    writeTodos(todos);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
