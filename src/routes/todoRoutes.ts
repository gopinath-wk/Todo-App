import {Router} from "express";
import {getTodos,addTodo,toggleTodo,deleteTodo} from "../controllers/todoController.js";
import authMiddleware from "../middleware/auth.js";
const router = Router();


router.get("/", authMiddleware, getTodos);
router.post("/",  authMiddleware,addTodo);
router.put("/:id", authMiddleware,toggleTodo);
router.delete("/:id", authMiddleware,deleteTodo);


export default router;
