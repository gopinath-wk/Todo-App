import { Router } from "express";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "../controllers/todoController.js";

const router = Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.patch("/:id", toggleTodo);
router.delete("/:id", deleteTodo);

export default router;
